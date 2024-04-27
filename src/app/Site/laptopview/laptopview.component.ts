import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReadService } from '../read.service';
import { Image } from '../../Models/image';
import { environment } from '../../../environments/environment';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Laptop } from '../../Models/laptop';
import { OpSystem } from '../../Models/opsys';
import { LaptopType } from '../../Models/laptop_type';


@Component({
  selector: 'app-laptopview',
  standalone: true,
  imports: [
    MatButton,
    CommonModule
  ],
  templateUrl: './laptopview.component.html',
  styleUrl: './laptopview.component.scss'
})
export class LaptopviewComponent {

  checkPic: boolean = false;
  assetUrl = environment.apiUrl + 'assets/';
  imageDB: Image[] = [];
  imagesLaptop:string [] = [];
  opSystem: OpSystem[] = [];
  laptopType: LaptopType[] = [];

  i = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public laptop: any,private dialogRef: MatDialogRef<LaptopviewComponent>,private readService: ReadService){

  }
  ngOnInit(){
    this.getAllImageDB();
    this.getAllImage();
    this.getAllLaptopType();
    this.getAllOpSystem();
  }

  next(){
    this.i++;
    if(this.i>=this.imagesLaptop.length){
      this.i = 0;
    }
  }
  prev(){
    this.i--;
    if(this.i<0){
      this.i = (this.imagesLaptop.length - 1);
    }
  }
  close() {
    this.dialogRef.close();
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
  getAllLaptopType() {
    this.readService.getAllLaptopType().subscribe(
      (res: LaptopType[]) => {
        this.laptopType = res;
      },
      (error) => {
        console.error('Hiba történt a Role-ok lekérésekor:', error);
    }
    );
  }

  getAllImage(){
    this.readService.getAllImages().subscribe(
      images => {
        this.imageDB.forEach((im: Image)=>{
          images.forEach((i: string)=>{
            if(im.type === 'laptop' && im.pic_name === i && this.laptop.id === im.product_id){
              this.imagesLaptop.push(i);
              this.checkPic = true;
            }
          });
        });
        if(!(this.checkPic)){
          this.imagesLaptop.push('notfound.webp')
      }
      this.checkPic = false;
      },
      error => {
        console.error('Error fetching images:', error);
      }
    );
    }
  getLenght(): boolean {
    if(this.imagesLaptop.length == 1){
      return false;
    }else{
      return true;
    }
  }
  getOpName(opId?: number): string {
    const op = this.opSystem.find(o => o.id === opId);
    return op ? op.name : '';
  }
  getTypeName(typeId?: number): string {
    const type = this.laptopType.find(t => t.id === typeId);
    return type ? type.type : '';
    }
  addToCart(laptop: Laptop) {
    throw new Error('Method not implemented.');
  }

}
