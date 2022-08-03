import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetToken } from './Core/Modules/Auth/Store/Actions/auth.actions';

@Component({
  selector: 'la-forge-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _store: Store,
  ) {
  }

  public ngOnInit(): void {
      const localToken = localStorage.getItem('token');
      if (localToken !== null && localToken !== undefined && typeof localToken === 'string') {
        const token = JSON.parse(localToken);
        this._store.dispatch(new SetToken(token));
      }
  }
}
