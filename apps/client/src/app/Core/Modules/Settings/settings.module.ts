import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsHomeComponent } from './Components/settings-home/settings-home.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { AccountSettingsComponent } from './Components/account-settings/account-settings.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';

@NgModule({
  declarations: [SettingsHomeComponent, AccountSettingsComponent],
  imports: [CommonModule, NzTabsModule, NzButtonModule, NzFormModule],
})
export class SettingsModule { }
