import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { UsersService } from './users.service';
import { User } from '../../Models/user';

@Component({
    selector: 'app-users',
    standalone: true,
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
    imports: [MenuComponent]
})
export class UsersComponent {
    users: User[]=[];

  
    constructor(private usersService: UsersService){}

    ngOnInit(): void {
        this.getAll();
    }

    getAll() {
        this.usersService.getAll().subscribe(
          (res: User[]) => {
            this.users = res;
          },
          (error) => {
            console.error('Hiba történt a laptopok lekérésekor:', error);
        }
        );
      }
}
