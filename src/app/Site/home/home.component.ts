import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { FooterComponent } from "../footer/footer.component";
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { Laptop } from '../../Models/laptop';
import { ReadService } from '../read.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Image } from '../../Models/image';
import { map } from 'rxjs';
import { LaptopType } from '../../Models/laptop_type';
import { OpSystem } from '../../Models/opsys';
import { MatButton } from '@angular/material/button';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        MenuComponent,
        FooterComponent,
        MatCard,
        CommonModule,
        MatCardContent,
        MatCardActions,
        MatButton
    ]
})
export class HomeComponent {

    assetUrl = environment.apiUrl + 'assets/';


    laptops: Laptop[] = [];
    images: string[] = [];
    imageDB: Image[] = [];
    opSystem: OpSystem[] = [];


    constructor(private readService: ReadService){}

    ngOnInit(){
        this.getAllOpSystem();
        this.getThreeLaptop();
        this.getAllImageDB();
        this.getMainImageLaptop();
    }

    getThreeLaptop() {
      let i = 0;
        this.readService.getAllLaptop().subscribe(
          (res: Laptop[]) => {
            res.forEach(element => {
              if(i < 4){
                this.laptops.push(element);
                i++;
              }
            });
            
          }
        );
      }

      getMainImageLaptop() {
        let firstImageChecker = true;
        this.readService.getAllImages().subscribe(
        images => {
        this.laptops.forEach((laptop: Laptop)=>{
          images.forEach((im: string)=>
            {
              this.imageDB.forEach((i: Image)=>{
                if(i.type === 'laptop' && i.pic_name === im && laptop.id === i.product_id && firstImageChecker){
                 laptop.main_picture = im;
                 firstImageChecker = false;
                }
              })
            });
            if(firstImageChecker){
              laptop.main_picture = 'notfound.webp'
              console.log('jártam itt');
            }
            firstImageChecker = true;
        })
        
      },
      error => {
        console.error('Error fetching images:', error);
      }
      
    );
    }
      
    getAllImageDB(){
        this.readService.getAllImageDB().subscribe(
        (response: Image[]) =>{
            this.imageDB = response;
        },
        (error) => {
            console.error('Hiba történt a Képek adatok lekérésekor:', error);
        }
        );
    }

    getAllOpSystem() {
      this.readService.getAllOP().subscribe(
        (res: OpSystem[]) => {
          this.opSystem = res;
        },
        (error) => {
          console.error('Hiba történt a Role-ok lekérésekor:', error);
      }
      );
    }
    getOpName(opId?: number): string {
      const op = this.opSystem.find(o => o.id === opId);
      return op ? op.name : '';
    }
}
