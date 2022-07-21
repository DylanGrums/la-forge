// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { User } from './../../../../../../api/src/app/user/entities/user.entity';
import { Injectable } from '@angular/core';
import { ApiHelperService } from '../Helpers/api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  constructor(
    private readonly _apiHelper: ApiHelperService
  ) { }

  public getConnectedUser() {
    return this._apiHelper.get<User>('/users/connected');
  }

  public getUserById(id: number) {
    return this._apiHelper.get<User>('/users/profile/', id.toString());
  }

  public findByUsername(username: string) {
    return this._apiHelper.get<User[]>('/users/profile/', username);
  }

}
