import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendrivelistComponent } from './pendrivelist.component';

const routes: Routes = [{path:'',component:PendrivelistComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendrivelistRoutingModule { }
