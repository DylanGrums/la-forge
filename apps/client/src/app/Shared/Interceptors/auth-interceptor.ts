import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthToken } from "@la-forge/models";
import { Store } from "@ngxs/store";
import { BehaviorSubject, Observable, catchError, throwError, switchMap, filter, take, of } from "rxjs";
import { AuthManagerService } from "../../Core/Modules/Auth/Services/auth-manager.service";
import { AuthState } from "../../Core/Modules/Auth/Store/State/auth.state";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private _isRefreshing = false;
    private _refreshTokenSubject: BehaviorSubject<any> =
        new BehaviorSubject<any>(null);

    constructor(
        private _authManager: AuthManagerService,
        private _router: Router,
        private _store: Store
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<any> {
        const token = this._store.selectSnapshot(AuthState.token);
        const isAuth = request.url.indexOf("auth/") !== -1;
        console.log(token);
        console.log(isAuth);
        
        if (!isAuth && token && token.accessToken) {
            request = this.addToken(
                request,
                token.accessToken
            );
        }

        return next.handle(request).pipe(
            catchError((error) => {
                if (
                    error instanceof HttpErrorResponse &&
                    error.status === 401 &&
                    !isAuth
                ) {
                    return this.handle401Error(request, next);
                } else if (
                    error instanceof HttpErrorResponse &&
                    error.status === 403
                ) {
                    this.handle403Error(request, next);
                    return throwError(error);
                } else {
                    return throwError(error);
                }
            })
        );
    }

    private addToken(request: HttpRequest<any>, token: string) {
        console.log(token);
        
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
        return request;
    }

    private handle403Error(request: HttpRequest<any>, next: HttpHandler) {
        // TODO: Add toast message
        console.log("Vous n'êtes pas autorisé à acceder à cette ressource.");
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this._isRefreshing) {
            this._isRefreshing = true;
            this._refreshTokenSubject.next(null);
            const token = this._store.selectSnapshot(AuthState.token);
            if (token && token.refreshToken) {
                return this._authManager
                    .refreshAccessToken(token.refreshToken)
                    .pipe(
                        switchMap((token: AuthToken | null) => {
                            this._isRefreshing = false;
                            if (token !== null) {
                                this._refreshTokenSubject.next(token.accessToken);
                                return next.handle(
                                    this.addToken(request, token.accessToken as string)
                                );
                            } else {
                                return of(null);
                            }
                        })
                    );
            } else {
                this._router.navigate(["/login"]);
                return of(null);
            }
        } else {
            return this._refreshTokenSubject.pipe(
                filter((token) => token != null),
                take(1),
                switchMap((jwt) => {
                    return next.handle(this.addToken(request, jwt));
                })
            );
        }
    }
}