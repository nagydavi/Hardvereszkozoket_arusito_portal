import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { UsersService } from './users.service';
import { User } from '../../Models/user';
import { UserRole } from '../../Models/userRole';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';



@Component({
    selector: 'app-users',
    standalone: true,
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
    imports: [
      MenuComponent,
      CommonModule,
      MatIcon,
      MatTableModule
    ]
})
export class UsersComponent implements OnInit{
    users: User[]=[];
    roles: UserRole[]=[];
    displayedColumns: string[] = ['index', 'name', 'role', 'actions'];
    dataSource!: MatTableDataSource<User>;



  
    constructor(private usersService: UsersService){

    }

    ngOnInit(): void {
        this.getAll();
        this.getAllRole();
    }

    getAll() {
        this.usersService.getAllUser().subscribe(
          (res: User[]) => {
            this.users = res;
            this.dataSource = new MatTableDataSource(res)

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

      getRoleName(roleId: number): string {
        const role = this.roles.find(r => r.id === roleId);
        return role ? role.role_name : '';
      }

      editUser(user: User) {
        throw new Error('Method not implemented.');
        }
          

}
