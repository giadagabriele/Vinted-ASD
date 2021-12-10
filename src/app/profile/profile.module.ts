import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';


@NgModule({
  declarations: [ProfileDetailComponent, ProfileSettingsComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
