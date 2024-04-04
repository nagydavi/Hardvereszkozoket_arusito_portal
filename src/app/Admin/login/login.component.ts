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

  
  constructor(private loginService: LoginService){}

  ngOnInit(): void {
    this.getAll();
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
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
