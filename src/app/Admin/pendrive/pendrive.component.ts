import { Component  } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatDialog, MatDialogModule,MatDialogConfig} from "@angular/material/dialog";
import { CreateComponent } from './create/create.component';
import { HttpClientModule } from '@angular/common/http';
import { PendriveService } from './pendrive.service';
import { Pendrive } from '../../Models/pendrive';
import { Image } from '../../Models/image';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-pendrive',
  standalone: true,
  imports: [
    MenuComponent,
    CommonModule,
    MatIcon,
    MatTableModule,
    MatDialogModule,
    CreateComponent,
    HttpClientModule
  ],
  templateUrl: './pendrive.component.html',
  styleUrl: './pendrive.component.scss'
})
export class PendriveComponent {

  pendrive: Pendrive[]=[];
  createPendrive = new Pendrive();
  editPendriveData = new Pendrive();
  displayedColumns: string[] = ['index', 'name', 'sku','warranty','storage','writespeed','discount', 'actions'];
  dataSource!: MatTableDataSource<Pendrive>;

  deleteImageProp: Image[] = [];
  image: Image[] = [];

  constructor(private pendriveService: PendriveService,private dialog: MatDialog){

  }
  ngOnInit(): void {
    this.getAll();
    this.getAllImageDB();
  }

  getAll() {
    this.pendriveService.getAllPendrive().subscribe(
      (res: Pendrive[]) => {
        this.pendrive = res;
        this.dataSource = new MatTableDataSource(res)
      },
      (error) => {
        console.error('Hiba történt a Userek lekérésekor:', error);
    }
    );
  }
  create() {
    this.pendriveService.create(this.createPendrive).subscribe(
      (res: Pendrive[]) => {
        this.pendrive = res;
        this.createPendrive.name = '';
        this.createPendrive.sku = '';
        this.createPendrive.warranty = '';
        this.createPendrive.discount = false;
        this.createPendrive.storage = 0;
        this.createPendrive.writespeed = '';
        this.createPendrive.price = 0;
        this.createPendrive.discountprice = 0;


        this.getAll();
      }
    )
  }
  update(){
    this.pendriveService.update(this.editPendriveData).subscribe(
      (res) => {
        this.pendrive = res;
        this.editPendriveData.name = '';
        this.editPendriveData.sku = '';
        this.editPendriveData.warranty = '';
        this.editPendriveData.discount = false;
        this.editPendriveData.storage = 0;
        this.editPendriveData.writespeed = '';
        this.editPendriveData.price = 0;
        this.editPendriveData.discountprice = 0;
      }
    )
  }
  createPendriveDialog() {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = true; //ha kikattintunk akkor nem fog bezárni
    dialogConfig.autoFocus = true; //Az fromfield-re megy a fókusz

    const dialogRef = this.dialog.open(CreateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.createPendrive.name = result['name'];
                this.createPendrive.sku = result['sku'];
                this.createPendrive.warranty = result['warranty'];
                this.createPendrive.discount = result['discount'];
                this.createPendrive.storage = result['storage'];
                this.createPendrive.writespeed = result['writespeed']
                this.createPendrive.price = result['price']
                this.createPendrive.discountprice = result['discountprice']

                this.create();

                

            }
        });
    }
  editPendrive(pendrive: Pendrive) {
        const dialogConfig = new MatDialogConfig();
        
        dialogConfig.disableClose = true; //ha kikattintunk akkor nem fog bezárni
        dialogConfig.autoFocus = true; //Az fromfield-re megy a fókusz
        dialogConfig.data = pendrive; // Felhasználó átadása a dialógusnak


        const dialogRef = this.dialog.open(EditComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
          if(result){
                this.editPendriveData.id = result['id'];
                this.editPendriveData.name = result['name'];
                this.editPendriveData.sku = result['sku'];
                this.editPendriveData.warranty = result['warranty'];
                this.editPendriveData.discount = result['discount'];
                this.editPendriveData.storage = result['storage'];
                this.editPendriveData.writespeed = result['writespeed'];
                this.editPendriveData.price = result['price'];
                this.editPendriveData.discountprice = result['discountprice'];

                this.update();
                this.getAll();
                this.getAllImageDB();
          }
          
        });
    }
    deletePendrive(pendrive: Pendrive) {
      this.pendriveService.delete(pendrive).subscribe(
          (res: Pendrive[]) => {
            this.getAll();
          }
        );
        this.deleteImageProp.forEach(element => {
          if(element.product_id === pendrive.id && element.type === 'pendrive'){
            this.deleteAsset(element.pic_name);
            this.deleteImageDB(element);
          }
          
        });
    }
       //ImageDB
       getAllImageDB(){
        this.pendriveService.getAllImageDB().subscribe(
          (response: Image[]) =>{
            this.deleteImageProp = response;
          },
          (error) => {
            console.error('Hiba történt a Képek adatok lekérésekor:', error);
        }
        );
      }
  
      deleteImageDB(image: Image) {
        this.pendriveService.deleteImageDB(image).subscribe(
            (res: Image[]) => {
            
            }
          )
        }
     
      deleteAsset(image: string){
        if (image.trim() === '') {
          alert('Add meg a törlendő fájl nevét!');
          return;
        }
        this.pendriveService.deleteFile(image).subscribe();
      }

}
