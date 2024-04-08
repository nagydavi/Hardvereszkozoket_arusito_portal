import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SsdComponent } from './ssd.component';

const routes: Routes = [{path: '',component: SsdComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SsdRoutingModule { }
