import { Component } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatBadgeModule} from '@angular/material/badge';




@Component({
  selector: 'app-menusite',
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
    RouterModule,
    MatBadgeModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

chatDialog() {
throw new Error('Method not implemented.');
}




  constructor(private router: Router){
    
  }
  onClickSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }

  close(sidenav: MatSidenav){
    sidenav.close();
  }

  getCartNumber(): string{
    let storedDataLaptop = localStorage.getItem("laptop");
    let storedDataSsd = localStorage.getItem("ssd");
    let storedDataRam = localStorage.getItem("ram");
    let storedDataPendrive = localStorage.getItem("pendrive");
    let productNumber = 0;

    if (storedDataLaptop) {
      let laptopData = JSON.parse(storedDataLaptop);
      productNumber += Array.isArray(laptopData) ? laptopData.length : 0;
    }
    if (storedDataSsd) {
      let ssdData = JSON.parse(storedDataSsd);
      productNumber += Array.isArray(ssdData) ? ssdData.length : 0;
    }
    if (storedDataRam) {
      let ramData = JSON.parse(storedDataRam);
      productNumber += Array.isArray(ramData) ? ramData.length : 0;
    }
    if (storedDataPendrive) {
      let pendriveData = JSON.parse(storedDataPendrive);
      productNumber += Array.isArray(pendriveData) ? pendriveData.length : 0;
    }

    if(productNumber != 0){
      return productNumber.toString();
    }
    return "";
    }
}
