import { Component } from '@angular/core';
import { MenuComponent } from "../../menu/menu.component";
import { FooterComponent } from "../../footer/footer.component";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader } from '@angular/material/card';
import { Pendrive } from '../../../Models/pendrive';
import { ReadService } from '../../read.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { Image } from '../../../Models/image';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PendriveviewComponent } from '../../View/pendriveview/pendriveview.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pendrivelist',
  standalone: true,
  imports: [
        MenuComponent,
        FooterComponent,
        MatCard,
        CommonModule,
        MatCardContent,
        MatCardActions,
        MatButton,
        MatCardHeader,
        MatPaginator,
        MatExpansionModule,
        MatInputModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatIconModule,
        FormsModule
  ],
  templateUrl: './pendrivelist.component.html',
  styleUrl: './pendrivelist.component.scss'
})
export class PendrivelistComponent {

  assetUrl = environment.apiUrl + 'assets/';

  pendrive: Pendrive[] = [];
  images: string[] = [];
  imageDB: Image[] = [];
  storedPendrive: Pendrive[] = [];
  pendriveSlice: Pendrive[] = [];
  searchName: any;
  isOnSale: any;
  searchStorage: any;
  searchWritespeed: any;


  constructor(private readService: ReadService, private dialog: MatDialog,private snackBar: MatSnackBar){}

  ngOnInit(){
    this.getAllPendrive();
    this.getAllImageDB();
    this.getMainImagePendrive();
  }

  getAllPendrive() {
    this.readService.getAllPendrive().subscribe(
        (res: Pendrive[]) => {
            this.pendrive=res;
            this.pendriveSlice = this.pendrive.slice(0,8)
    });
  }
  getMainImagePendrive() {
    let firstImageChecker = true;
    this.readService.getAllImages().subscribe(
    images => {
    this.pendrive.forEach((p: Pendrive)=>{
      images.forEach((im: string)=>
        {
          this.imageDB.forEach((i: Image)=>{
            if(i.type === 'pendrive' && i.pic_name === im && p.id === i.product_id && firstImageChecker){
             p.main_picture = im;
             firstImageChecker = false;
            }
          })
        });
        if(firstImageChecker){
          p.main_picture = 'notfound.webp'
        }
        firstImageChecker = true;
    })
    
  },
  error => {
    console.error('Error fetching images:', error);
  }
  );
  }

  getAllImageDB(){
    this.readService.getAllImageDB().subscribe(
    (response: Image[]) =>{
        this.imageDB = response;
    },
    (error) => {
        console.error('Hiba történt a Képek adatok lekérésekor:', error);
    }
    );
  }

  addCartPendrive(pendrive: Pendrive) {
    let storedData = localStorage.getItem("pendrive");
    if (storedData) {
        this.storedPendrive = JSON.parse(storedData);
        this.storedPendrive.push(pendrive);          
    } else {
        this.storedPendrive = [pendrive]; //Azért így helyezem el benne, hogy ha már van több akkor tudjam pusholni
    }
    localStorage.setItem("pendrive", JSON.stringify(this.storedPendrive));
    this.snackBar.open('Termék kosárba helyezve', 'Értem', {
      duration: 3000, // Megjelenési időtartam millisecondban (3 másodperc)
      verticalPosition: 'bottom', // Elhelyezkedés: alul
      horizontalPosition: 'center', // Elhelyezkedés: középen
    });
  }
  checkPendrive(pendrive: Pendrive) {
    const dialogConfig = new MatDialogConfig();
      
    dialogConfig.disableClose = true; //ha kikattintunk akkor nem fog bezárni
    dialogConfig.autoFocus = true; //Az fromfield-re megy a fókusz
    dialogConfig.data = pendrive; // Adat átadása a dialógusnak


    const dialogRef = this.dialog.open(PendriveviewComponent, dialogConfig);
  }

  OnPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.pendrive.length){
        endIndex = this.pendrive.length;
    }
    this.pendriveSlice = this.pendrive.slice(startIndex,endIndex)
  }

  search() {
    this.pendriveSlice = this.pendrive.slice(0,8);
    if (this.searchName) { 
      this.pendriveSlice = this.pendriveSlice.filter(pendrive => pendrive.name.toLowerCase().includes(this.searchName.toLowerCase()));
    }
    if (this.isOnSale) { 
      this.pendriveSlice = this.pendriveSlice.filter(pendrive => pendrive.discount == 1);
    }
    if (this.searchStorage) { 
      this.pendriveSlice = this.pendriveSlice.filter(pendrive => pendrive.storage >= this.searchStorage);
    }
    if (this.searchWritespeed) { 
      
      this.pendriveSlice = this.pendriveSlice.filter(pendrive => parseInt(pendrive.writespeed) >= this.searchWritespeed);
    }


  }
  delete() {
    this.isOnSale = false;
    this.searchName = '';
    this.searchStorage = null;
    this.searchWritespeed = null;
    this.pendriveSlice = this.pendrive.slice(0,8);
    }


}
