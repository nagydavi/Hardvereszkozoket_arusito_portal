import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReadService } from '../read.service';
import { Image } from '../../Models/image';
import { environment } from '../../../environments/environment';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Pendrive } from '../../Models/pendrive';

@Component({
  selector: 'app-pendriveview',
  standalone: true,
  imports: [
    MatButton,
    CommonModule
  ],
  templateUrl: './pendriveview.component.html',
  styleUrl: './pendriveview.component.scss'
})
export class PendriveviewComponent {

  checkPic: boolean = false;
  assetUrl = environment.apiUrl + 'assets/';
  imageDB: Image[] = [];
  imagesPendrive:string [] = [];
  i = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public pendrive: any,private dialogRef: MatDialogRef<PendriveviewComponent>,private readService: ReadService){

  }
  ngOnInit(){
    this.getAllImageDB();
    this.getAllImage();
  }

  next(){
    this.i++;
    if(this.i>=this.imagesPendrive.length){
      this.i = 0;
    }
  }
  prev(){
    this.i--;
    if(this.i<0){
      this.i = (this.imagesPendrive.length - 1);
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
            if(im.type === 'pendrive' && im.pic_name === i && this.pendrive.id === im.product_id){
              this.imagesPendrive.push(i);
              this.checkPic = true;
            }
          });
        });
        if(!(this.checkPic)){
          this.imagesPendrive.push('notfound.webp')
      }
      this.checkPic = false;
      },
      error => {
        console.error('Error fetching images:', error);
      }
    );
    }
    getLenght(): boolean {
      if(this.imagesPendrive.length == 1){
        return false;
      }else{
        return true;
      }
    }
    addToCart(pendrive: Pendrive) {
      throw new Error('Method not implemented.');
    }

}
