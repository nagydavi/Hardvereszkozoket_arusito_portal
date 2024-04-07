import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { UsersService } from './users.service';
import { User } from '../../Models/user';
import { UserRole } from '../../Models/userRole';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, MatDialogModule,MatDialogConfig} from "@angular/material/dialog";
import { DialogComponent } from './dialog/dialog.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EditComponent } from './edit/edit.component';





@Component({
    selector: 'app-users',
    standalone: true,
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
    imports: [
      MenuComponent,
      CommonModule,
      MatIcon,
      MatTableModule,
      MatDialogModule,
      DialogComponent,
      HttpClientModule
    ],

})
export class UsersComponent implements OnInit{

    users: User[]=[];
    roles: UserRole[]=[];
    createUser = new User();
    editUserData = new User();
    displayedColumns: string[] = ['index', 'name', 'role', 'actions'];
    dataSource!: MatTableDataSource<User>;



  
    constructor(private usersService: UsersService,private dialog: MatDialog){

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

      create() {
        this.usersService.create(this.createUser).subscribe(
          (res: User[]) => {
            this.users = res;
            this.createUser.name = '';
            this.createUser.password = '';
            this.createUser.type_id = 0;
            this.getAll();
          }
        )
      }

    
      //A modal-ért lesz felelős, ez nyitja meg majd a dialogot(modalt)
      openDialog() {
        const dialogConfig = new MatDialogConfig();
        
        dialogConfig.disableClose = true; //ha kikattintunk akkor nem fog bezárni
        dialogConfig.autoFocus = true; //Az fromfield-re megy a fókusz

        const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
          this.createUser.name = result['username']
          this.createUser.password = result['password']
          this.createUser.type_id = result['type']

          console.log('The dialog was closed');
          console.log(this.createUser);
          this.create();

         
        });
        }

      editUser(user: User) {
        const dialogConfig = new MatDialogConfig();
        
        dialogConfig.disableClose = true; //ha kikattintunk akkor nem fog bezárni
        dialogConfig.autoFocus = true; //Az fromfield-re megy a fókusz
        dialogConfig.data = user; // Felhasználó átadása a dialógusnak


        const dialogRef = this.dialog.open(EditComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
          this.editUserData.name = result['username']
          this.editUserData.password = result['password']
          this.editUserData.type_id = result['type']

          console.log('The dialog was closed');
          console.log(this.createUser);
         
        });
        }
          

}
