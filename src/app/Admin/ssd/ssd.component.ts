import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, MatDialogModule,MatDialogConfig} from "@angular/material/dialog";
import { CreateComponent } from './create/create.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SsdService } from './ssd.service';
import { SSD } from '../../Models/ssd';

@Component({
    selector: 'app-ssd',
    standalone: true,
    templateUrl: './ssd.component.html',
    styleUrl: './ssd.component.scss',
    imports: [
        MenuComponent,
        CommonModule,
        MatIcon,
        MatTableModule,
        MatDialogModule,
        CreateComponent,
        HttpClientModule
    ]
})
export class SsdComponent {


    ssd: SSD[]=[];
    displayedColumns: string[] = ['index', 'name', 'sku','warranty','discount', 'actions'];
    dataSource!: MatTableDataSource<SSD>;




    constructor(private ssdService: SsdService,private dialog: MatDialog){

    }




    ngOnInit(): void {
        this.getAll();
    }

    getAll() {
        this.ssdService.getAllSSD().subscribe(
          (res: SSD[]) => {
            this.ssd = res;
            this.dataSource = new MatTableDataSource(res)
          },
          (error) => {
            console.error('Hiba történt a Userek lekérésekor:', error);
        }
        );
      }

    createSSDDialog() {
        const dialogConfig = new MatDialogConfig();
        
        dialogConfig.disableClose = true; //ha kikattintunk akkor nem fog bezárni
        dialogConfig.autoFocus = true; //Az fromfield-re megy a fókusz

        const dialogRef = this.dialog.open(CreateComponent, dialogConfig);

        //dialogRef.afterClosed().subscribe(result => {
                //if(result){
                    //this.createUser.name = result['username']
                    //this.createUser.password = result['password']
                    //this.createUser.type_id = result['type']
                    //this.create();

                //}
            //});
        }

        editSsd(_t38: any) {
            throw new Error('Method not implemented.');
            }

}
