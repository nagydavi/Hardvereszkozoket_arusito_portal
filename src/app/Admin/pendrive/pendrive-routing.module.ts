import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendriveComponent } from './pendrive.component';

const routes: Routes = [{path: '',component:PendriveComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendriveRoutingModule { }
