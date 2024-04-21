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
import { LaptopType } from '../../../Models/laptop_type';
import { OpSystem } from '../../../Models/opsys';
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

  constructor(private createService: CreateService,private dialogRef: MatDialogRef<CreateComponent>,private snackBar: MatSnackBar, private http:HttpClient){
  }

  ngOnInit(): void {
    this.getAllOP();
    this.getAllType();
  }  
  
  save() {
    if (
      this.form.get('name')?.value !== '' &&
      this.form.get('resolution')?.value !== '' &&
      this.form.get('screen')?.value !== '' &&
      this.form.get('processor')?.value !== '' &&
      this.form.get('grafic_card')?.value !== '' &&
      this.form.get('ram')?.value !== '' &&
      this.form.get('ssd')?.value !== '' &&
      this.form.get('op')?.value !== '' &&
      this.form.get('price')?.value !== '' &&
      this.form.get('warranty')?.value !== '' &&
      this.form.get('battery')?.value !== '' &&
      this.form.get('weight')?.value !== '' &&
      this.form.get('keyboard')?.value !== '' &&
      this.form.get('discount')?.value !== '' &&
      this.form.get('type')?.value !== ''
  ) {
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




  getAllType() {
    this.createService.getAllType().subscribe(
      (res: LaptopType[]) => {
        this.laptopType = res;
      },
      (error) => {
        console.error('Hiba történt a Role-ok lekérésekor:', error);
    }
    );
  }
  getAllOP() {
    this.createService.getAllOP().subscribe(
      (res: OpSystem[]) => {
        this.opSys = res;
      },
      (error) => {
        console.error('Hiba történt a Role-ok lekérésekor:', error);
    }
    );
  }
}


