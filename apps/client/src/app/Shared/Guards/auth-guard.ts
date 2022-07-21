import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from './../../Core/Modules/Auth/Store/State/auth.state';
import { CanActivate } from '@nestjs/common';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly _store: Store,
        private readonly _router: Router,
        ) { }

    canActivate() {
        const isAuthenticated = this._store.selectSnapshot(AuthState.isAuthenticated);
        if (isAuthenticated) {
            return isAuthenticated;
        } else {
            // TODO: Add toast message
            console.log('You need to ne connected to access this ressource');
            
            this._router.navigate(['/login'])
            return false;
        }
    }
}