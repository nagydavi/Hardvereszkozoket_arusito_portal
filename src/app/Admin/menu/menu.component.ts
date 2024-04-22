import { Component } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavContainer,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    RouterModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {



  constructor(private router: Router){
    
  }
  onClickSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }

  close(sidenav: MatSidenav){
    sidenav.close();
  }
  isUsersVisible(){
    const localData = localStorage.getItem('user');
    if(localData){
      const user = JSON.parse(localData);
      if(user['type_id'] === '1'){
        return false;
      }
    }
    return true;
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/admin/login');
  }
}
