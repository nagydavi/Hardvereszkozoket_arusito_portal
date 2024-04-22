import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './Admin/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule, MatListSubheaderCssMatStyler } from '@angular/material/list';
import { MenuComponent } from "./Admin/menu/menu.component";
import {MatDialogModule} from "@angular/material/dialog";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { authGuard } from './auth.guard';
import { roleGuard } from './role.guard';





//lazy loading
export const routes: Routes = [
    {path: 'admin/login', loadChildren: () => import ('./Admin/login/login.module').then(m=>m.LoginModule) },
    {path: 'admin/laptops', loadChildren: () => import ('./Admin/laptops/laptops.module').then(m=>m.LaptopsModule),canActivate: [authGuard] },
    {path: 'admin/users', loadChildren: () => import ('./Admin/users/users.module').then(m=>m.UsersModule),canActivate: [authGuard,roleGuard] },
    {path: 'admin/ssd', loadChildren: () => import ('./Admin/ssd/ssd.module').then(m=>m.SsdModule),canActivate: [authGuard] },
    {path: 'admin/ram', loadChildren: () => import ('./Admin/ram/ram.module').then(m=>m.RamModule),canActivate: [authGuard] },
    {path: 'admin/pendrive', loadChildren: () => import ('./Admin/pendrive/pendrive.module').then(m=>m.PendriveModule),canActivate: [authGuard] },
    {path: '', loadChildren: () => import ('./Site/home/home.module').then(m=>m.HomeModule)},


];

@NgModule({
   
    imports: [
        RouterModule.forRoot(routes),
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        HttpClientModule,
        LoginComponent,
        MatSidenavModule,
        MatToolbarModule,
        MenuComponent,
        MatListModule,
        MatDialogModule,
        BrowserModule,
        FormsModule
        
    
    ],
    exports: [RouterModule],

  })
  export class AppRoutingModule { }