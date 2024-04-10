import { Component } from '@angular/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CreateService } from './create.service';
import { User } from '../../../Models/user';
import { UserRole } from '../../../Models/userRole';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule

  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  users: User[]=[];
  roles: UserRole[]=[];

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    type: new FormControl(0),
  });

  constructor(private createService: CreateService, private dialogRef: MatDialogRef<CreateComponent>,private snackBar: MatSnackBar){

  }


  ngOnInit(): void {

    this.getAllRole();
    
  }

  getAllRole() {
    this.createService.getAllRole().subscribe(
      (res: UserRole[]) => {
        this.roles = res;
      },
      (error) => {
        console.error('Hiba történt a Role-ok lekérésekor:', error);
    }
    );
  }

  save() {

    if(this.form.get('username') && this.form.get('password')?.value != '' && this.form.get('type')?.value != ''){
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
