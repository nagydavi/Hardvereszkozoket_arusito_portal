import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaptopsComponent } from './laptops.component';

const routes: Routes = [{ path: '', component: LaptopsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaptopsRoutingModule { }
