import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaptoplistComponent } from './laptoplist.component';

const routes: Routes = [{path:'',component:LaptoplistComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaptoplistRoutingModule { }
