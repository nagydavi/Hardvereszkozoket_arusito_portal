import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RamlistComponent } from './ramlist.component';

const routes: Routes = [{path:'',component:RamlistComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RamlistRoutingModule { }
