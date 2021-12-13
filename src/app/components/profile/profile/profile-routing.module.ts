import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileDetailComponent } from '@app/components/profile/profile/profile-detail/profile-detail.component';
import { ProfileSettingsComponent } from '@app/components/profile/profile/profile-settings/profile-settings.component';


const routes: Routes = [
  { path: '', component:ProfileDetailComponent },
  { path: 'profiledetail', component:ProfileDetailComponent
  //, canActivate: [ProfileGuard] 
},
  { path: 'profilesettings',component:ProfileSettingsComponent
  //,canActivate: [ProfileGuard]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
