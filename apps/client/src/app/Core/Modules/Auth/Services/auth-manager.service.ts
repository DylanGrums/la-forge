import { ApiHelperService } from '../../../../Shared/Services/Helpers/api-helper.service';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { AuthToken } from '@la-forge/models';

@Injectable({
  providedIn: 'root'
})
export class AuthManagerService {

  constructor(
    private _apiHelper: ApiHelperService
  ) { }

  public login(formatedUser: { email: string, password: string }) {
    return this._apiHelper.post<{ token: AuthToken }>('/auth/login', formatedUser);
  }

  public confirmMail(token: string) {
    return this._apiHelper.post<{ token: AuthToken }>('/auth/confirm-email', { token });
  }

  public register(formatedUser: { username: string, email: string, password: string }) {
    return this._apiHelper.post<{ username: string, email: string }>('/auth/register', formatedUser);
  }

  public refreshAccessToken(token: string) {
    return this._apiHelper.post<AuthToken>('/auth/refreshtoken', {
      refreshToken: token
    });
  }

  public logout(token: AuthToken) {
    // TODO: Dispatch logout
    return of(null)
  }

}
