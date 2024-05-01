import { Component } from '@angular/core';
import { MenuComponent } from "../../menu/menu.component";
import { FooterComponent } from "../../footer/footer.component";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader } from '@angular/material/card';
import { Ram } from '../../../Models/ram';
import { ReadService } from '../../read.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { Image } from '../../../Models/image';
import { OpSystem } from '../../../Models/opsys';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RamviewComponent } from '../../View/ramview/ramview.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ramlist',
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
  templateUrl: './ramlist.component.html',
  styleUrl: './ramlist.component.scss'
})
export class RamlistComponent {

  assetUrl = environment.apiUrl + 'assets/';

  ram: Ram[] = [];
  images: string[] = [];
  imageDB: Image[] = [];
  opSystem: OpSystem[] = [];
  storedRam: Ram[] = [];
  ramSlice: Ram[] = [];

  searchName: any;
  isOnSale: any;
  searchStorage: any;



  constructor(private readService: ReadService, private dialog: MatDialog,private snackBar: MatSnackBar){}


  ngOnInit(){
    this.getAllRam();
    this.getAllImageDB();
    this.getMainImageRam();
}

  getAllRam() {
      this.readService.getAllRam().subscribe(
        (res: Ram[]) => {
          this.ram = res;
          this.ramSlice = this.ram.slice(0,8);
          });
          
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
  
    

  getMainImageRam() {
    let firstImageChecker = true;
    this.readService.getAllImages().subscribe(
    images => {
    this.ram.forEach((r: Ram)=>{
      images.forEach((im: string)=>
        {
          this.imageDB.forEach((i: Image)=>{
            if(i.type === 'ram' && i.pic_name === im && r.id === i.product_id && firstImageChecker){
             r.main_picture = im;
             firstImageChecker = false;
            }
          })
        });
        if(firstImageChecker){
          r.main_picture = 'notfound.webp'
        }
        firstImageChecker = true;
    })
    
  },
  error => {
    console.error('Error fetching images:', error);
  }
  
);
}
  addCartRam(ram: Ram) {
    let storedData = localStorage.getItem("ram");
    if (storedData) {
        this.storedRam = JSON.parse(storedData);
        this.storedRam.push(ram);          
    } else {
        this.storedRam = [ram]; //Azért így helyezem el benne, hogy ha már van több akkor tudjam pusholni
    }
    localStorage.setItem("ram", JSON.stringify(this.storedRam));
    this.snackBar.open('Termék kosárba helyezve', 'Értem', {
      duration: 3000, // Megjelenési időtartam millisecondban (3 másodperc)
      verticalPosition: 'bottom', // Elhelyezkedés: alul
      horizontalPosition: 'center', // Elhelyezkedés: középen
    });
  }
  checkRam(ram: Ram) {
    const dialogConfig = new MatDialogConfig();
      
    dialogConfig.disableClose = true; //ha kikattintunk akkor nem fog bezárni
    dialogConfig.autoFocus = true; //Az fromfield-re megy a fókusz
    dialogConfig.data = ram; // Adat átadása a dialógusnak


    const dialogRef = this.dialog.open(RamviewComponent, dialogConfig);
  }

  OnPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.ram.length){
        endIndex = this.ram.length;
    }
    this.ramSlice = this.ram.slice(startIndex,endIndex)
  }
  search() {
    this.ramSlice = this.ram.slice(0,8);
    if (this.searchName) { 
      this.ramSlice = this.ramSlice.filter(ram => ram.name.toLowerCase().includes(this.searchName.toLowerCase()));
    }
    if (this.isOnSale) { 
      this.ramSlice = this.ramSlice.filter(ram => ram.discount == 1);
    }
    if (this.searchStorage) { 
      this.ramSlice = this.ramSlice.filter(ram => ram.storage >= this.searchStorage);
    }


  }
  delete() {
    this.isOnSale = false;
    this.searchName = '';
    this.searchStorage = null;
    this.ramSlice = this.ram.slice(0,8);
    }

}
