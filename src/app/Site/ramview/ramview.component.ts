import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { environment } from '../../../environments/environment';
import { Image } from '../../Models/image';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReadService } from '../read.service';
import { Ram } from '../../Models/ram';




@Component({
  selector: 'app-ramview',
  standalone: true,
  imports: [
    MatButton,
    CommonModule
  ],
  templateUrl: './ramview.component.html',
  styleUrl: './ramview.component.scss'
})
export class RamviewComponent {

  checkPic: boolean = false;
  assetUrl = environment.apiUrl + 'assets/';
  imageDB: Image[] = [];
  imagesRam:string [] = [];
  i = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public ram: any,private dialogRef: MatDialogRef<RamviewComponent>,private readService: ReadService){

  }
  ngOnInit(){
    this.getAllImageDB();
    this.getAllImage();
  }
  next(){
    this.i++;
    if(this.i>=this.imagesRam.length){
      this.i = 0;
    }
  }
  prev(){
    this.i--;
    if(this.i<0){
      this.i = (this.imagesRam.length - 1);
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
  getAllImage(){
    this.readService.getAllImages().subscribe(
      images => {
        this.imageDB.forEach((im: Image)=>{
          images.forEach((i: string)=>{
            if(im.type === 'ram' && im.pic_name === i && this.ram.id === im.product_id){
              this.imagesRam.push(i);
              this.checkPic = true;
              console.log(this.checkPic);
            }
          });
        });
        if(!(this.checkPic)){
            this.imagesRam.push('notfound.webp')
        }
        this.checkPic = false;
        
      },
      error => {
        console.error('Error fetching images:', error);
      }
    );
  }

    getLenght(): boolean {
      if(this.imagesRam.length == 1){
        return false;
      }else{
        return true;
      }
    }
    addToCart(ram: Ram) {
      throw new Error('Method not implemented.');
    }

}
