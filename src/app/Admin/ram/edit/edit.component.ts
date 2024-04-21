import { Component, Inject, OnInit } from '@angular/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpClientModule, HttpEventType, HttpResponse } from '@angular/common/http';
import { MatToolbar } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Observable, every } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatList, MatListModule } from '@angular/material/list';
import { environment } from '../../../../environments/environment';
import { EditService } from './edit.service';
import { Ram } from '../../../Models/ram';
import { Image } from '../../../Models/image';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    MatFormField,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOption,
    MatSelectModule,
    CommonModule,
    HttpClientModule,
    MatToolbar,
    MatProgressBarModule,
    MatCardModule,
    MatListModule,
    MatIcon
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  assetUrl = environment.apiUrl + 'assets/';

  deleteImageProp: Image[] = [];
  imageDB: Image[] = [];
  image: Image[] = [];
  createNewImage = new Image();
  fileNames: string[] = [];
  images: string[] = [];

  //Képfeltöltés-hez kellenek
  options?: {content: FormData;};
  file: string = '';
  myFiles:string [] = [];
  //Képfeltöltés vége

  ramProp: Ram[]=[];
  sendRam: Ram = new Ram();


  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    resolution: new FormControl(''),
    warranty: new FormControl(''),
    discount: new FormControl(''),
    storage: new FormControl('') 
    
  });

  constructor(private editService: EditService, private dialogRef: MatDialogRef<EditComponent>,private snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public ram: any,private formBuilder: FormBuilder,private http: HttpClient){
  }
  ngOnInit(): void {
    this.getAllImages();
    this.getAllImageDB();
    this.form = this.formBuilder.group({
      name: new FormControl(this.ram.name), 
      sku: new FormControl(this.ram.sku), 
      warranty: new FormControl(this.ram.warranty),
      storage: new FormControl(this.ram.storage),
      discount: new FormControl(this.ram.discount) 
 
 
    });
  } 


  //Képfeltöltés
  onFileSelect(event:any) {
    if(event.target.files){
      for(let i = 0; i < (event.target.files.length);i++){
        this.file = event.target.files[i];
        this.myFiles.push(event.target.files[i]);
        const fileName = event.target.files[i].name;
      
        // Fájlnevek hozzáadása a fájlnevek tömbjéhez
        this.fileNames.push(fileName);
      }
    }
      
  }
  upload() {
    const formData = new FormData();
    for(let i = 0; i < this.myFiles.length;i++){
      formData.append('fileUpload[]',this.myFiles[i]);

    }

    this.http.post<any>(environment.apiUrl + 'Upload/upload',formData).subscribe(
      (response) => {
        this.snackBar.open('Kép/Képek sikeresen feltöltve!', 'Értem', {
          duration: 3000, // Megjelenési időtartam millisecondban (3 másodperc)
          verticalPosition: 'bottom', // Elhelyezkedés: alul
          horizontalPosition: 'center', // Elhelyezkedés: középen
        });
      },
      (error) => {
        console.error(error);
      }
    )
    for(let i = 0; i < this.fileNames.length;i++){
      this.createNewImage.pic_name = this.fileNames[i];
      this.createNewImage.product_id = this.ram.id;
      this.createNewImage.type = 'ram'
      this.createImage();

    }
    this.fileNames = [];
    this.getAllImages();
    this.getAllImageDB();

  }
  
  
  //Képfeltöltés vége 

  update() {
    if(this.form.get('name')?.value != '' && this.form.get('sku')?.value != '' && this.form.get('warranty')?.value != '' && this.form.get('discount')?.value != '' && this.form.get('storage')?.value != ''){
      this.sendRam.id  = this.ram.id;
      this.sendRam.name = this.form.get('name')?.value;
      this.sendRam.sku = this.form.get('sku')?.value;
      this.sendRam.warranty = this.form.get('warranty')?.value;
      this.sendRam.storage = this.form.get('storage')?.value;
      this.sendRam.discount = this.form.get('discount')?.value;
      this.dialogRef.close(this.sendRam);
    }else{
      // Ha valamelyik mező nincs kitöltve, megjelenítünk egy értesítést az alján
      this.snackBar.open('Minden mező kitöltése kötelező!', 'Értem', {
        duration: 3000, // Megjelenési időtartam millisecondban (3 másodperc)
        verticalPosition: 'bottom', // Elhelyezkedés: alul
        horizontalPosition: 'center', // Elhelyezkedés: középen
    });
    }
  } 


  close() {
    this.dialogRef.close();
  }


  
   //ImageDB
  
  getAllImageDB(){
    this.editService.getAllImageDB().subscribe(
      (response: Image[]) =>{
        this.deleteImageProp = response;
        this.imageDB = response;
      },
      (error) => {
        console.error('Hiba történt a Képek adatok lekérésekor:', error);
    }
    );
  }


  createImage() {
    this.editService.createImage(this.createNewImage).subscribe(
      (res: Image[]) => {
        this.image = res;
        this.createNewImage.type = '';
        this.createNewImage.product_id = 0;
        this.createNewImage.pic_name = '';
        this.getAllImageDB();
      }
    )
  }



  deleteImageDB(image: Image) {
    this.editService.deleteImageDB(image).subscribe(
        (res: Image[]) => {
          
        }
      )
    }
  //Asset
  getAllImages(): void {
    this.getAllImageDB();
    this.editService.getAllImages().subscribe(
      images => {
        images.forEach((im: string)=>
          {
            this.imageDB.forEach((i: Image)=>{
              if(i.type === 'ram' && i.pic_name === im && this.ram.id === i.product_id){
                this.images.push(im);
              }
            })
          });
      },
      error => {
        console.error('Error fetching images:', error);
      }
    );
  }

  deleteThisImage(image: string) {

  
    if (image.trim() === '') {
      alert('Add meg a törlendő fájl nevét!');
      return;
    }
    
    this.editService.deleteFile(image).subscribe(
      response => {
      
        this.snackBar.open('Kép sikeresen törölve!', 'Értem', {
          duration: 3000, // Megjelenési időtartam millisecondban (3 másodperc)
          verticalPosition: 'bottom', // Elhelyezkedés: alul
          horizontalPosition: 'center', // Elhelyezkedés: középen
      });
      this.deleteImageProp.forEach(element => {
        if (element.pic_name === image && this.ram.id === element.product_id){
        let index = this.images.indexOf(element.pic_name);
        if (index !== -1) {
          this.images.splice(index, 1);
        }
          this.deleteImageDB(element);
          this.getAllImageDB();

        }
      });

      },
      error => {
        console.error('Hiba történt a fájl törlése közben:', error);
        alert('Hiba történt a fájl törlése közben!');
      }
    );
  }
}


