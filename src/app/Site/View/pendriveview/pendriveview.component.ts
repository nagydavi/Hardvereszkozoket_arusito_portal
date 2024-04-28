import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReadService } from '../../read.service';
import { Image } from '../../../Models/image';
import { environment } from '../../../../environments/environment';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Pendrive } from '../../../Models/pendrive';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  storedPendrive: Pendrive[] = [];
  i = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public pendrive: any,private dialogRef: MatDialogRef<PendriveviewComponent>,private readService: ReadService, private snackBar: MatSnackBar){

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
      let storedData = localStorage.getItem("pendrive");
      if (storedData) {
        this.storedPendrive = JSON.parse(storedData);
        this.storedPendrive.push(pendrive);          
      } else {
        this.storedPendrive = [pendrive]; //Azért így helyezem el benne, hogy ha már van több akkor tudjam pusholni
      }
      localStorage.setItem("pendrive", JSON.stringify(this.storedPendrive));
      this.snackBar.open('Termék kosárba helyezve', 'Értem', {
      duration: 3000, // Megjelenési időtartam millisecondban (3 másodperc)
      verticalPosition: 'bottom', // Elhelyezkedés: alul
      horizontalPosition: 'center', // Elhelyezkedés: középen
      });
    }

}
