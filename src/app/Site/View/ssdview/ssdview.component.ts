import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReadService } from '../../read.service';
import { Image } from '../../../Models/image';
import { environment } from '../../../../environments/environment';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SSD } from '../../../Models/ssd';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ssdview',
  standalone: true,
  imports: [
    MatButton,
    CommonModule
  ],
  templateUrl: './ssdview.component.html',
  styleUrl: './ssdview.component.scss'
})
export class SsdviewComponent {

  checkPic: boolean = false;
  assetUrl = environment.apiUrl + 'assets/';
  imageDB: Image[] = [];
  imagesSsd:string [] = [];
  i = 0;
  storedSSD: SSD[] = [];
  
  
  constructor(@Inject(MAT_DIALOG_DATA) public ssd: any,private dialogRef: MatDialogRef<SsdviewComponent>,private readService: ReadService, private snackBar: MatSnackBar){

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
              this.checkPic = true;
            }
          });
        });
        if(!(this.checkPic)){
          this.imagesSsd.push('notfound.webp')
      }
      this.checkPic = false;
      },
      error => {
        console.error('Error fetching images:', error);
      }
    );
    }
  getLenght(): boolean {
    if(this.imagesSsd.length == 1){
      return false;
    }else{
      return true;
    }
  }
  addToCart(ssd: SSD) {
    let storedData = localStorage.getItem("ssd");
      if (storedData) {
        this.storedSSD = JSON.parse(storedData);
        this.storedSSD.push(ssd);          
      } else {
        this.storedSSD = [ssd]; //Azért így helyezem el benne, hogy ha már van több akkor tudjam pusholni
      }
      localStorage.setItem("ssd", JSON.stringify(this.storedSSD));
      this.snackBar.open('Termék kosárba helyezve', 'Értem', {
      duration: 3000, // Megjelenési időtartam millisecondban (3 másodperc)
      verticalPosition: 'bottom', // Elhelyezkedés: alul
      horizontalPosition: 'center', // Elhelyezkedés: középen
      });
  }

}