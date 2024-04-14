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
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  //Képfeltöltés-hez kellenek
  options?: {content: FormData;};
  file: string = '';
  myFiles:string [] = [];
  //Képfeltöltés vége

  ssdProp: SSD[]=[];
  sendSSD: SSD = new SSD;


  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    sku: new FormControl(''),
    warranty: new FormControl(''),
    discount: new FormControl(''),
    storage: new FormControl('') 
    
  });



  constructor(private editService: EditService, private dialogRef: MatDialogRef<EditComponent>,private snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public ssd: any,private formBuilder: FormBuilder,private http: HttpClient
){

}
  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: new FormControl(this.ssd.name), 
      sku: new FormControl(this.ssd.sku), 
      warranty: new FormControl(this.ssd.warranty),
      storage: new FormControl(this.ssd.storage),
      discount: new FormControl(this.ssd.discount) 
 
 
    });
  }
  //Képfeltöltés
  onFileSelect(event:any) {
    if(event.target.files){
      for(let i = 0; i < (event.target.files.length);i++){
        this.file = event.target.files[i]
        this.myFiles.push(event.target.files[i]);

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
        console.log(response);
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
  }
  
  
  //Képfeltöltés vége 

  update() {
    if(this.form.get('name')?.value != '' && this.form.get('sku')?.value != '' && this.form.get('warranty')?.value != '' && this.form.get('discount')?.value != '' && this.form.get('storage')?.value != ''){
      this.sendSSD.id  = this.ssd.id;
      this.sendSSD.name = this.form.get('name')?.value;
      this.sendSSD.sku = this.form.get('sku')?.value;
      this.sendSSD.warranty = this.form.get('warranty')?.value;
      this.sendSSD.storage = this.form.get('storage')?.value;
      this.sendSSD.discount = this.form.get('discount')?.value;
      this.dialogRef.close(this.sendSSD);
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

}
