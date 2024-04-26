import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReadService } from '../read.service';
import { Image } from '../../Models/image';
import { environment } from '../../../environments/environment';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-ssdview',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './ssdview.component.html',
  styleUrl: './ssdview.component.scss'
})
export class SsdviewComponent {


  assetUrl = environment.apiUrl + 'assets/';
  imageDB: Image[] = [];
  imagesSsd:string [] = [];
  i = 0;
  
  
  constructor(@Inject(MAT_DIALOG_DATA) public ssd: any,private dialogRef: MatDialogRef<SsdviewComponent>,private readService: ReadService){

  }
  ngOnInit(){
    this.getAllImageDB();
    this.getAllImage();
}

  next(){
    this.i++;
    if(this.i>=this.imagesSsd.length){
      this.i = 0;
    }
  }
  prev(){
    this.i--;
    if(this.i<0){
      this.i = (this.imagesSsd.length - 1);
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
            if(im.type === 'ssd' && im.pic_name === i && this.ssd.id === im.product_id){
              this.imagesSsd.push(i);
            }
          });
        });
      },
      error => {
        console.error('Error fetching images:', error);
      }
      
    );
    }
  

}
