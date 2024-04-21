import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, MatDialogModule,MatDialogConfig} from "@angular/material/dialog";
import { CreateComponent } from './create/create.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RamService } from './ram.service';
import { Ram } from '../../Models/ram';
import { Image } from '../../Models/image';
import { EditComponent } from './edit/edit.component';
@Component({
  selector: 'app-ram',
  standalone: true,
  imports: [ 
    MenuComponent,
    CommonModule,
    MatIcon,
    MatTableModule,
    MatDialogModule,
    CreateComponent,
    HttpClientModule],
  templateUrl: './ram.component.html',
  styleUrl: './ram.component.scss'
})
export class RamComponent {

  ram: Ram[]=[];
  createRam = new Ram();
  editRamData = new Ram();
  displayedColumns: string[] = ['index', 'name', 'sku','warranty','storage','discount', 'actions'];
  dataSource!: MatTableDataSource<Ram>;

  deleteImageProp: Image[] = [];
  image: Image[] = [];

  constructor(private ramService: RamService,private dialog: MatDialog){

  }

  ngOnInit(): void {
    this.getAll();
    this.getAllImageDB();
  }

  getAll() {
    this.ramService.getAllRam().subscribe(
      (res: Ram[]) => {
        this.ram = res;
        this.dataSource = new MatTableDataSource(res)
      },
      (error) => {
        console.error('Hiba történt a Userek lekérésekor:', error);
    }
    );
  }
  create() {
    this.ramService.create(this.createRam).subscribe(
      (res: Ram[]) => {
        this.ram = res;
        this.createRam.name = '';
        this.createRam.sku = '';
        this.createRam.warranty = '';
        this.createRam.discount = false;
        this.createRam.storage = 0;

        this.getAll();
      }
    )
  }
  update(){
    this.ramService.update(this.editRamData).subscribe(
      (res) => {
        this.ram = res;
        this.editRamData.name = '';
        this.editRamData.sku = '';
        this.editRamData.warranty = '';
        this.editRamData.discount = false;
        this.editRamData.storage = 0;
      }
    )
  }

  createRamDialog() {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = true; //ha kikattintunk akkor nem fog bezárni
    dialogConfig.autoFocus = true; //Az fromfield-re megy a fókusz

    const dialogRef = this.dialog.open(CreateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.createRam.name = result['name'];
                this.createRam.sku = result['sku'];
                this.createRam.warranty = result['warranty'];
                this.createRam.discount = result['discount'];
                this.createRam.storage = result['storage'];
                this.create();

                

            }
        });
    }
 editRam(ram: Ram) {
        const dialogConfig = new MatDialogConfig();
        
        dialogConfig.disableClose = true; //ha kikattintunk akkor nem fog bezárni
        dialogConfig.autoFocus = true; //Az fromfield-re megy a fókusz
        dialogConfig.data = ram; // Felhasználó átadása a dialógusnak


        const dialogRef = this.dialog.open(EditComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
          if(result){
                this.editRamData.id = result['id'];
                this.editRamData.name = result['name'];
                this.editRamData.sku = result['sku'];
                this.editRamData.warranty = result['warranty'];
                this.editRamData.discount = result['discount'];
                this.editRamData.storage = result['storage'];
                this.update();
                this.getAll();
                this.getAllImageDB();
          }
          
        });
    }
  deleteRam(ram: Ram) {
        this.ramService.delete(ram).subscribe(
            (res: Ram[]) => {
              this.getAll();
            }
          );
          this.deleteImageProp.forEach(element => {
            if(element.product_id === ram.id && element.type === 'ram'){
              this.deleteAsset(element.pic_name);
              this.deleteImageDB(element);
            }
            
          });
  }
  //ImageDB
  getAllImageDB(){
    this.ramService.getAllImageDB().subscribe(
      (response: Image[]) =>{
        this.deleteImageProp = response;
      },
      (error) => {
        console.error('Hiba történt a Képek adatok lekérésekor:', error);
    }
    );
  }

  deleteImageDB(image: Image) {
    this.ramService.deleteImageDB(image).subscribe(
        (res: Image[]) => {
        
        }
      )
    }
 
  deleteAsset(image: string){
    if (image.trim() === '') {
      alert('Add meg a törlendő fájl nevét!');
      return;
    }
    this.ramService.deleteFile(image).subscribe();
  }


}
