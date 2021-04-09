import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionlistComponent } from './missionlist/missionlist.component';
import { MissiondetailsComponent } from './missiondetails/missiondetails.component';
const routes: Routes = [
  {
    path : 'missionlist',
    component: MissionlistComponent,
    pathMatch: 'full'
  },
  {
    path : 'missiondetail/:id',
    component:MissiondetailsComponent,
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
