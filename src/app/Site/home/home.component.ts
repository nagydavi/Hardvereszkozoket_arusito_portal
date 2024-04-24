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
import { SSD } from '../../Models/ssd';
import { Ram } from '../../Models/ram';
import { Pendrive } from '../../Models/pendrive';


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
    ssd: SSD[] = [];
    ram: Ram[] = [];
    pendrive: Pendrive[] = [];




    constructor(private readService: ReadService){}

    ngOnInit(){
        this.getAllOpSystem();
        this.getThreeLaptop();
        this.getAllImageDB();
        this.getMainImageLaptop();
        this.getThreeSSD();
        this.getMainImageSsd();
        this.getThreeRam();
        this.getMainImageRam();
        this.getThreePendrive();
        this.getMainImagePendrive();
    }
    //Laptop
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
    //SSD
    getThreeSSD() {
      let i = 0;
        this.readService.getAllSSD().subscribe(
          (res: SSD[]) => {
            res.forEach(element => {
              if(i < 4){
                this.ssd.push(element);
                i++;
              }
            });
            
          }
        );
      }
      getMainImageSsd() {
        let firstImageChecker = true;
        this.readService.getAllImages().subscribe(
        images => {
        this.ssd.forEach((s: SSD)=>{
          images.forEach((im: string)=>
            {
              this.imageDB.forEach((i: Image)=>{
                if(i.type === 'ssd' && i.pic_name === im && s.id === i.product_id && firstImageChecker){
                 s.main_picture = im;
                 firstImageChecker = false;
                }
              })
            });
            if(firstImageChecker){
              s.main_picture = 'notfound.webp'
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
    //RAM
    getThreeRam() {
      let i = 0;
        this.readService.getAllRam().subscribe(
          (res: Ram[]) => {
            res.forEach(element => {
              if(i < 4){
                this.ram.push(element);
                i++;
              }
            });
            
          }
        );
      }
      getMainImageRam() {
        let firstImageChecker = true;
        this.readService.getAllImages().subscribe(
        images => {
        this.ram.forEach((r: Ram)=>{
          images.forEach((im: string)=>
            {
              this.imageDB.forEach((i: Image)=>{
                if(i.type === 'ram' && i.pic_name === im && r.id === i.product_id && firstImageChecker){
                 r.main_picture = im;
                 firstImageChecker = false;
                }
              })
            });
            if(firstImageChecker){
              r.main_picture = 'notfound.webp'
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
    //Pendrive
    getThreePendrive() {
      let i = 0;
        this.readService.getAllPendrive().subscribe(
          (res: Pendrive[]) => {
            res.forEach(element => {
              if(i < 4){
                this.pendrive.push(element);
                i++;
              }
            });
            
          }
        );
      }
      getMainImagePendrive() {
        let firstImageChecker = true;
        this.readService.getAllImages().subscribe(
        images => {
        this.pendrive.forEach((p: Pendrive)=>{
          images.forEach((im: string)=>
            {
              this.imageDB.forEach((i: Image)=>{
                if(i.type === 'pendrive' && i.pic_name === im && p.id === i.product_id && firstImageChecker){
                 p.main_picture = im;
                 firstImageChecker = false;
                }
              })
            });
            if(firstImageChecker){
              p.main_picture = 'notfound.webp'
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

    
}
