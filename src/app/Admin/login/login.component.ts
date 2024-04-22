import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../Models/user';
import { LoginService } from './login.service';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from "../menu/menu.component";
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        MenuComponent
    ]
})
export class LoginComponent implements OnInit{

  users: User[]=[];

  
  constructor(private loginService: LoginService,private router:Router,private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.getAll();
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  login() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      const foundUser = this.users.find((user: User) =>
        user.name === this.form.value['username'] && user.password === this.form.value['password']
      );

      if (foundUser) {
        localStorage.setItem('user', JSON.stringify(foundUser));
        this.router.navigateByUrl('/admin/laptops')
      }else{
        this.snackBar.open('Hibás felhasználónév vagy jelszó!', 'Értem', {
          duration: 3000, // Megjelenési időtartam millisecondban (3 másodperc)
          verticalPosition: 'bottom', // Elhelyezkedés: alul
          horizontalPosition: 'center', // Elhelyezkedés: középen
        });
      }
    }
  
  }
  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();

  getAll() {
    this.loginService.getAll().subscribe(
      (res: User[]) => {
        this.users = res;
      },
      (error) => {
        console.error('Hiba történt a laptopok lekérésekor:', error);
    }
    );
  }

}
