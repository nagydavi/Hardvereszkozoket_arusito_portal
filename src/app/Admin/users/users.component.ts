import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { UsersService } from './users.service';
import { User } from '../../Models/user';
import { UserRole } from '../../Models/userRole';


@Component({
    selector: 'app-users',
    standalone: true,
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
    imports: [MenuComponent]
})
export class UsersComponent {
    users: User[]=[];
    roles: UserRole[]=[];

  
    constructor(private usersService: UsersService){}

    ngOnInit(): void {
        this.getAll();
        this.getAllRole();
    }

    getAll() {
        this.usersService.getAllUser().subscribe(
          (res: User[]) => {
            this.users = res;
          },
          (error) => {
            console.error('Hiba történt a Userek lekérésekor:', error);
        }
        );
      }
    getAllRole() {
        this.usersService.getAllRole().subscribe(
          (res: UserRole[]) => {
            this.roles = res;
          },
          (error) => {
            console.error('Hiba történt a Role-ok lekérésekor:', error);
        }
        );
      }

}
