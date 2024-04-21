import { Component, OnInit } from '@angular/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatToolbar } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CreateService } from './create.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-create',
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
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    sku: new FormControl(''),
    warranty: new FormControl(''),
    discount: new FormControl(''), 
    storage: new FormControl('') ,
    writespeed: new FormControl('') 
  });


  constructor(private createService: CreateService,private dialogRef: MatDialogRef<CreateComponent>,private snackBar: MatSnackBar, private http:HttpClient){

  }
  ngOnInit(): void {

  }

  save() {
    if(this.form.get('name')?.value != '' && this.form.get('sku')?.value != '' && this.form.get('warranty')?.value != '' && this.form.get('discount')?.value != ''&& this.form.get('storage')?.value != '' && this.form.get('writespeed')?.value != ''){
      this.dialogRef.close(this.form.value);
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
