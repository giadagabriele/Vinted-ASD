import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileDetailComponent } from '@app/components/profile/profile/profile-detail/profile-detail.component';
import { ProfileSettingsComponent } from '@app/components/profile/profile/profile-settings/profile-settings.component';


@NgModule({
  declarations: [ProfileDetailComponent, ProfileSettingsComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
