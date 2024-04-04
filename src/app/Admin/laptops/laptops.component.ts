import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { Laptop } from '../../Models/laptop';
import { LaptopsService } from './laptops.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-laptops',
    standalone: true,
    templateUrl: './laptops.component.html',
    styleUrl: './laptops.component.scss',
    imports: [
      MenuComponent,
      HttpClientModule,
      CommonModule
    ]
})
export class LaptopsComponent implements OnInit {

  laptops: Laptop[]=[];

  constructor(private laptopsService: LaptopsService){}

  ngOnInit(): void {
    this.getAll();
    
  }



  getAll() {
    this.laptopsService.getAll().subscribe(
        (res: Laptop[]) => {
            console.log(res);
        },
        (error) => {
            console.error('Hiba történt a laptopok lekérésekor:', error);
        }
    );
}


}
