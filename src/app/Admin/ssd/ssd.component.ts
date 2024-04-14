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
import { EditComponent } from './edit/edit.component';

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
    createSSD = new SSD();
    editSSDData = new SSD();
    displayedColumns: string[] = ['index', 'name', 'sku','warranty','storage','discount', 'actions'];
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

    create() {
        this.ssdService.create(this.createSSD).subscribe(
          (res: SSD[]) => {
            this.ssd = res;
            this.createSSD.name = '';
            this.createSSD.sku = '';
            this.createSSD.warranty = '';
            this.createSSD.discount = false;
            this.createSSD.storage = 0;

            this.getAll();
          }
        )
      }

    update(){
        this.ssdService.update(this.editSSDData).subscribe(
          (res) => {
            this.ssd = res;
            this.editSSDData.name = '';
            this.editSSDData.sku = '';
            this.editSSDData.warranty = '';
            this.editSSDData.discount = false;
            this.editSSDData.storage = 0;
          }
        )
      }

    createSSDDialog() {
        const dialogConfig = new MatDialogConfig();
        
        dialogConfig.disableClose = true; //ha kikattintunk akkor nem fog bezárni
        dialogConfig.autoFocus = true; //Az fromfield-re megy a fókusz

        const dialogRef = this.dialog.open(CreateComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
                if(result){
                    this.createSSD.name = result['name'];
                    this.createSSD.sku = result['sku'];
                    this.createSSD.warranty = result['warranty'];
                    this.createSSD.discount = result['discount'];
                    this.createSSD.storage = result['storage'];
                    this.create();

                    

                }
            });
        }

    editSsd(ssd: SSD) {
        const dialogConfig = new MatDialogConfig();
        
        dialogConfig.disableClose = true; //ha kikattintunk akkor nem fog bezárni
        dialogConfig.autoFocus = true; //Az fromfield-re megy a fókusz
        dialogConfig.data = ssd; // Felhasználó átadása a dialógusnak


        const dialogRef = this.dialog.open(EditComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
          if(result){
                this.editSSDData.id = result['id'];
                this.editSSDData.name = result['name'];
                this.editSSDData.sku = result['sku'];
                this.editSSDData.warranty = result['warranty'];
                this.editSSDData.discount = result['discount'];
                this.editSSDData.storage = result['storage'];
                this.update();
                this.getAll();
          }
          
        });
    }

    deleteSsd(ssd: SSD) {
        this.ssdService.delete(ssd).subscribe(
            (res: SSD[]) => {
              this.getAll();
            }
          )
        }
   
}
