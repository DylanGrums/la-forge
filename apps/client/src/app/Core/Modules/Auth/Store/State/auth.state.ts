// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { User } from './../../../../../../../../api/src/app/user/entities/user.entity';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Logout, SetToken } from '../Actions/auth.actions';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AuthManagerService } from '../../Services/auth-manager.service';
import { AuthToken } from '@la-forge/models';
import { UserManagerService } from '../../../../../Shared/Services/Managers/user-manager.service';

export interface AuthStateModel {
    username: string | null;
    token: AuthToken
    user: User | null;
}

const authStatusStateDefaults: AuthStateModel = {
    username: null,
    token: {
        accessToken: null,
        refreshToken: null,
    },
    user: null,
};

@State<AuthStateModel>({
    name: 'auth',
    defaults: authStatusStateDefaults,
})
@Injectable()
export class AuthState {

    @Selector()
    static token(state: AuthStateModel): AuthToken {
        return state.token;
    }

    @Selector()
    static isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    @Selector()
    static username(state: AuthStateModel): string | null {
        return state.username;
    }

    @Selector()
    static user(state: AuthStateModel): User | null {
        return state.user;
    }

    constructor(
        private readonly _userManager: UserManagerService,
        private readonly _authManager: AuthManagerService,
    ) { }

    @Action(SetToken)
    setToken(ctx: StateContext<AuthStateModel>, action: SetToken) {
        return this._userManager.getConnectedUser().pipe(
            tap((result) => {
                ctx.patchState({
                    token: action.payload,
                    username: result?.username,
                    user: result
                });
            })
        );
    }

    @Action(Logout)
    logout(ctx: StateContext<AuthStateModel>) {
        const state = ctx.getState();
        return this._authManager.logout(state.token).pipe(
            tap(() => {
                ctx.setState({
                    token: {
                        accessToken: null,
                        refreshToken: null,
                    },
                    username: null,
                    user: null
                });
            })
        );
    }

}
