import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '../../Shared/Components/loader/loader.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    DefaultLayoutComponent,
    HeaderComponent,
    SideBarComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class LayoutModule {}