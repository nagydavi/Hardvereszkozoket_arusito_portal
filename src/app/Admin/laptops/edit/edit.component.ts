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
import { SSD } from '../../../Models/ssd';
import { Image } from '../../../Models/image';
import { MatIcon } from '@angular/material/icon';
import { Laptop } from '../../../Models/laptop';
import { LaptopType } from '../../../Models/laptop_type';
import { OpSystem } from '../../../Models/opsys';
import { StickyStyler } from '@angular/cdk/table';



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

  laptopProp: Laptop[] = [];
  sendLaptop: Laptop = new Laptop();
  laptopType: LaptopType[]=[]; 
  opSys: OpSystem[]=[];

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    resolution: new FormControl(''),
    screen: new FormControl(0),
    processor: new FormControl(''),
    grafic_card: new FormControl(''),
    ram: new FormControl(''),
    ssd: new FormControl(''),
    op: new FormControl(0),
    price: new FormControl(0),
    warranty: new FormControl(''),
    battery: new FormControl(''),
    weight: new FormControl(0),
    keyboard: new FormControl(''),
    discount: new FormControl(''), 
    type: new FormControl(0)
  });

  constructor(private editService: EditService, private dialogRef: MatDialogRef<EditComponent>,private snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public laptop: any,private formBuilder: FormBuilder,private http: HttpClient
){}
ngOnInit(): void {
  this.getAllImages();
  this.getAllImageDB();
  this.getAllOP();
  this.getAllType();
  this.form = this.formBuilder.group({
    name: new FormControl(this.laptop.name),
      resolution: new FormControl(this.laptop.resolution),
      screen: new FormControl(this.laptop.screen),
      processor: new FormControl(this.laptop.processor),
      grafic_card: new FormControl(this.laptop.grafic_card),
      ram: new FormControl(this.laptop.ram),
      ssd: new FormControl(this.laptop.ssd),
      op: new FormControl(this.laptop.op_system_id),
      price: new FormControl(this.laptop.price),
      warranty: new FormControl(this.laptop.warranty),
      battery: new FormControl(this.laptop.battery),
      weight: new FormControl(this.laptop.weight),
      keyboard: new FormControl(this.laptop.keyboard),
      type: new FormControl(this.laptop.laptop_type_id),
      discount: new FormControl(this.laptop.discount)


  });
}
getAllType() {
  this.editService.getAllType().subscribe(
    (res: LaptopType[]) => {
      this.laptopType = res;
    },
    (error) => {
      console.error('Hiba történt a Role-ok lekérésekor:', error);
  }
  );
}
getAllOP() {
  this.editService.getAllOP().subscribe(
    (res: OpSystem[]) => {
      this.opSys = res;
    },
    (error) => {
      console.error('Hiba történt a Role-ok lekérésekor:', error);
  }
  );
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
      this.getAllImageDB();
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
    this.createNewImage.product_id = this.laptop.id;
    this.createNewImage.type = 'laptop'
    this.createImage();

  }
  this.fileNames = [];
  this.getAllImages();
  this.getAllImageDB();

}


//Képfeltöltés vége 
update() {
  if (
    this.form.get('name')?.value != '' &&
    this.form.get('resolution')?.value != '' &&
    this.form.get('processor')?.value != '' &&
    this.form.get('grafic_card')?.value != '' &&
    this.form.get('ram')?.value != '' &&
    this.form.get('ssd')?.value != '' &&
    this.form.get('op')?.value != '' &&
    this.form.get('price')?.value != '' &&
    this.form.get('warranty')?.value != '' &&
    this.form.get('battery')?.value != '' &&
    this.form.get('weight')?.value != '' &&
    this.form.get('keyboard')?.value != '' &&
    this.form.get('type')?.value != '' &&
    this.form.get('discount')?.value != ''
  ) {
    this.sendLaptop.id = this.laptop.id;
    this.sendLaptop.name = this.form.get('name')?.value;
    this.sendLaptop.screen = this.form.get('screen')?.value;
    this.sendLaptop.resolution = this.form.get('resolution')?.value;
    this.sendLaptop.processor = this.form.get('processor')?.value;
    this.sendLaptop.grafic_card = this.form.get('grafic_card')?.value;
    this.sendLaptop.ram = this.form.get('ram')?.value;
    this.sendLaptop.ssd = this.form.get('ssd')?.value;
    this.sendLaptop.op_system_id = this.form.get('op')?.value;
    this.sendLaptop.price = this.form.get('price')?.value;
    this.sendLaptop.warranty = this.form.get('warranty')?.value;
    this.sendLaptop.battery = this.form.get('battery')?.value;
    this.sendLaptop.weight = this.form.get('weight')?.value;
    this.sendLaptop.keyboard = this.form.get('keyboard')?.value;
    this.sendLaptop.laptop_type_id = this.form.get('type')?.value;
    this.sendLaptop.discount = this.form.get('discount')?.value;
    console.log(this.sendLaptop)
    this.dialogRef.close(this.sendLaptop);
  } else {
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
            if(i.type === 'laptop' && i.pic_name === im && this.laptop.id === i.product_id){
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
          console.log(element);
          if (element.pic_name === image && this.laptop.id === element.product_id){
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
