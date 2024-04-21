import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { Laptop } from '../../Models/laptop';
import { LaptopsService } from './laptops.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, MatDialogModule,MatDialogConfig} from "@angular/material/dialog";
import { LaptopType } from '../../Models/laptop_type';
import { OpSystem } from '../../Models/opsys';
import { Image } from '../../Models/image';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';


@Component({
    selector: 'app-laptops',
    standalone: true,
    templateUrl: './laptops.component.html',
    styleUrl: './laptops.component.scss',
    imports: [
      MenuComponent,
      CommonModule,
      MatIcon,
      MatTableModule,
      MatDialogModule,
      HttpClientModule
    ]
})
export class LaptopsComponent implements OnInit {

  laptop: Laptop[] = [];
  laptopTypes: LaptopType[] = [];
  opSystem: OpSystem[] = [];
  createLaptop = new Laptop();
  editLaptopData = new Laptop();
  displayedColumns: string[] = ['index', 'name', 'processor', 'op', 'type','discount','actions'];
  dataSource!: MatTableDataSource<Laptop>;

  deleteImageProp: Image[] = [];
  image: Image[] = [];

  constructor(private laptopsService: LaptopsService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.getAll();
    this.getAllLaptopType();
    this.getAllOpSystem();
    
  }
  getAllOpSystem() {
    this.laptopsService.getAllOP().subscribe(
      (res: OpSystem[]) => {
        this.opSystem = res;
      },
      (error) => {
        console.error('Hiba történt a Role-ok lekérésekor:', error);
    }
    );
  }
  getOpName(opId: number): string {
    const op = this.opSystem.find(o => o.id === opId);
    return op ? op.name : '';
  }
  getAllLaptopType() {
    this.laptopsService.getAllLaptopType().subscribe(
      (res: LaptopType[]) => {
        this.laptopTypes = res;
      },
      (error) => {
        console.error('Hiba történt a Role-ok lekérésekor:', error);
    }
    );
  }
  getTypeName(typeId: number): string {
    const type = this.laptopTypes.find(t => t.id === typeId);
    return type ? type.type : '';
  }



  getAll() {
    this.laptopsService.getAll().subscribe(
        (res: Laptop[]) => {
            this.laptop = res;
            this.dataSource = new MatTableDataSource(res)
        },
        (error) => {
            console.error('Hiba történt a laptopok lekérésekor:', error);
        }
    );
  }
  create() {
    this.laptopsService.create(this.createLaptop).subscribe(
      (res: Laptop[]) => {
        this.laptop = res;

        this.createLaptop.name = '';
        this.createLaptop.resolution = '';
        this.createLaptop.screen = 0;
        this.createLaptop.processor = '';
        this.createLaptop.grafic_card = '';
        this.createLaptop.ram = '';
        this.createLaptop.ssd = '';
        this.createLaptop.op_system_id = 0;
        this.createLaptop.price = 0;
        this.createLaptop.warranty = '';
        this.createLaptop.battery = '';
        this.createLaptop.weight = 0;
        this.createLaptop.keyboard = '';
        this.createLaptop.laptop_type_id = 0;
        this.createLaptop.discount = false;
  
        this.getAll();
      }
    )
  }
  update(){
    this.laptopsService.update(this.editLaptopData).subscribe(
      (res) => {
        this.laptop = res;
        this.editLaptopData.name = '';
        this.editLaptopData.resolution = '';
        this.editLaptopData.screen = 0;
        this.editLaptopData.processor = '';
        this.editLaptopData.grafic_card = '';
        this.editLaptopData.ram = '';
        this.editLaptopData.ssd = '';
        this.editLaptopData.op_system_id = 0;
        this.editLaptopData.price = 0;
        this.editLaptopData.warranty = '';
        this.editLaptopData.battery = '';
        this.editLaptopData.weight = 0;
        this.editLaptopData.keyboard = '';
        this.editLaptopData.laptop_type_id = 0;
        this.editLaptopData.discount = false;

        this.getAll();
      }
    )
  }
  createLaptopDialog() {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = true; //ha kikattintunk akkor nem fog bezárni
    dialogConfig.autoFocus = true; //Az fromfield-re megy a fókusz

    const dialogRef = this.dialog.open(CreateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
            if(result){
              this.createLaptop.name = result['name'];
              this.createLaptop.resolution = result['resolution'];
              this.createLaptop.screen = result['screen'];
              this.createLaptop.processor = result['processor'];
              this.createLaptop.grafic_card = result['grafic_card'];
              this.createLaptop.ram = result['ram'];
              this.createLaptop.ssd = result['ssd'];
              this.createLaptop.op_system_id = result['op'];
              this.createLaptop.price = result['price'];
              this.createLaptop.warranty = result['warranty'];
              this.createLaptop.battery = result['battery'];
              this.createLaptop.weight = result['weight'];
              this.createLaptop.keyboard = result['keyboard'];
              this.createLaptop.laptop_type_id = result['type'];
              this.createLaptop.discount = result['discount'];
              
              this.create();
              this.getAll(); 
                

            }
        });
    }
  editLaptop(laptop: Laptop) {
    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = true; // ha kikattintunk akkor nem fog bezárni
    dialogConfig.autoFocus = true; // Az fromfield-re megy a fókusz
    dialogConfig.data = laptop; // Laptop átadása a dialógusnak

    const dialogRef = this.dialog.open(EditComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.editLaptopData.id = result['id'];
        this.editLaptopData.name = result['name'];
        this.editLaptopData.resolution = result['resolution'];
        this.editLaptopData.screen = result['screen'];
        this.editLaptopData.processor = result['processor'];
        this.editLaptopData.grafic_card = result['grafic_card'];
        this.editLaptopData.ram = result['ram'];
        this.editLaptopData.ssd = result['ssd'];
        this.editLaptopData.op_system_id = result['op_system_id'];
        this.editLaptopData.price = result['price'];
        this.editLaptopData.warranty = result['warranty'];
        this.editLaptopData.battery = result['battery'];
        this.editLaptopData.weight = result['weight'];
        this.editLaptopData.keyboard = result['keyboard'];
        this.editLaptopData.laptop_type_id = result['laptop_type_id'];
        this.editLaptopData.discount = result['discount'];
      
        this.update();
        this.getAll();
        this.getAllImageDB();
      }
    });
  }
  deleteLaptop(laptop: Laptop) {
    this.laptopsService.delete(laptop).subscribe(
        (res: Laptop[]) => {
          this.getAll();
        }
      );
      this.deleteImageProp.forEach(element => {
        if(element.product_id === laptop.id && element.type === 'laptop'){
          this.deleteAsset(element.pic_name);
          this.deleteImageDB(element);
        }
        
      });
  }

 
  //ImageDB
  getAllImageDB(){
    this.laptopsService.getAllImageDB().subscribe(
      (response: Image[]) =>{
        this.deleteImageProp = response;
      },
      (error) => {
        console.error('Hiba történt a Képek adatok lekérésekor:', error);
    }
    );
  }

  deleteImageDB(image: Image) {
    this.laptopsService.deleteImageDB(image).subscribe(
        (res: Image[]) => {
        
        }
      )
    }
 
  deleteAsset(image: string){
    if (image.trim() === '') {
      alert('Add meg a törlendő fájl nevét!');
      return;
    }
    this.laptopsService.deleteFile(image).subscribe();
  } 

}
