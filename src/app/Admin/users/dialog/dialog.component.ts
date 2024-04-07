import { Component } from '@angular/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { DialogService } from './dialog.service';
import { User } from '../../../Models/user';
import { UserRole } from '../../../Models/userRole';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';





@Component({
  selector: 'app-dialog',
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
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  users: User[]=[];
  roles: UserRole[]=[];

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    type: new FormControl(0),
  });

  constructor(private dialogService: DialogService, private dialogRef: MatDialogRef<DialogComponent>,private snackBar: MatSnackBar){

  }


  ngOnInit(): void {

    this.getAll();
    this.getAllRole();
    
  }

  getAllRole() {
    this.dialogService.getAllRole().subscribe(
      (res: UserRole[]) => {
        this.roles = res;
      },
      (error) => {
        console.error('Hiba történt a Role-ok lekérésekor:', error);
    }
    );
  }

  save() {
    this.create();
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close();

  }

  create() {
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;
    const type_id = this.form.get('type')?.value;


    if(username && password && type_id){
      const createUser: User = {
        name: username,
        password: password,
        type_id: type_id
      }
      this.dialogService.create(createUser).subscribe(
        (res: User[]) => {
          this.users=res;
          //A form értekeit visszaállítjuk
          this.form.reset();
        }
      )
    }else{
      // Ha valamelyik mező nincs kitöltve, megjelenítünk egy értesítést az alján
      this.snackBar.open('Minden mező kitöltése kötelező!', 'Értem', {
        duration: 3000, // Megjelenési időtartam millisecondban (3 másodperc)
        verticalPosition: 'bottom', // Elhelyezkedés: alul
        horizontalPosition: 'center', // Elhelyezkedés: középen
    });
    }
    

   
  }
  
  getAll() {
    this.dialogService.getAllUser().subscribe(
      (res: User[]) => {
        this.users = res;
      },
      (error) => {
        console.error('Hiba történt a Userek lekérésekor:', error);
    }
    );
  }

}
