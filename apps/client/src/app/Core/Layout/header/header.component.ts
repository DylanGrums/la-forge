import { Select } from '@ngxs/store';
import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { AuthState } from '../../Modules/Auth/Store/State/auth.state';
import { Observable } from 'rxjs';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { User } from 'apps/api/src/app/user/entities/user.entity';

@Component({
  selector: 'la-forge-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Output() public toggleSidebar: EventEmitter<null> = new EventEmitter();
  @Input() public sidebarOpen = false;

  @Select(AuthState.user) user$!: Observable<User>;

  constructor(
    private readonly _viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    console.log(this._viewContainerRef);
  }

}
