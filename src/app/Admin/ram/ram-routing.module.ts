import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RamComponent } from './ram.component';

const routes: Routes = [{path: '',component:RamComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RamRoutingModule { }
