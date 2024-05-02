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
    {path: 'admin/order', loadChildren: () => import ('./Admin/order/order.module').then(m=>m.OrderModule),canActivate: [authGuard] },
    {path: 'site/cart', loadChildren: () => import ('./Site/cart/cart.module').then(m=>m.CartModule)},
    {path: 'site/laptops', loadChildren: () => import ('./Site/List/laptoplist/laptoplist.module').then(m=>m.LaptoplistModule)},
    {path: 'site/ssd', loadChildren: () => import ('./Site/List/ssdlist/ssdlist.module').then(m=>m.SsdlistModule)},
    {path: 'site/ram', loadChildren: () => import ('./Site/List/ramlist/ramlist.module').then(m=>m.RamlistModule)},
    {path: 'site/pendrive', loadChildren: () => import ('./Site/List/pendrivelist/pendrivelist.module').then(m=>m.PendrivelistModule)},
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