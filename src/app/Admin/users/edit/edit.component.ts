import { Component } from '@angular/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../Models/user';
import { UserRole } from '../../../Models/userRole';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { EditService } from './edit.service';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl ,ReactiveFormsModule} from '@angular/forms';






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
    HttpClientModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  users: User[]=[];
  roles: UserRole[]=[];

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    type: new FormControl(0),
  });

  constructor(private editService: EditService, private dialogRef: MatDialogRef<EditComponent>,private snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public user: any,private formBuilder: FormBuilder
  ){

  }


  ngOnInit(): void {

    this.getAllRole();
    console.log(this.user);
    this.form = this.formBuilder.group({
      username: new FormControl(this.user.name), // Felhasználó nevének beállítása
      password: new FormControl(this.user.password), // Felhasználó jelszavának beállítása
      type: new FormControl(this.user.type_id) // Felhasználó jogosultságának beállítása
    });
    
  }

  getAllRole() {
    this.editService.getAllRole().subscribe(
      (res: UserRole[]) => {
        this.roles = res;
      },
      (error) => {
        console.error('Hiba történt a Role-ok lekérésekor:', error);
    }
    );
  }

  update() {
    throw new Error('Method not implemented.');
  } 
  close() {
    this.dialogRef.close();
  }

}
