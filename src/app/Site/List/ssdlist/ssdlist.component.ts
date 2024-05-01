import { Component } from '@angular/core';
import { MenuComponent } from "../../menu/menu.component";
import { FooterComponent } from "../../footer/footer.component";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader } from '@angular/material/card';
import { SSD } from '../../../Models/ssd';
import { ReadService } from '../../read.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { Image } from '../../../Models/image';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SsdviewComponent } from '../../View/ssdview/ssdview.component';

@Component({
  selector: 'app-ssdlist',
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
        MatPaginator
  ],
  templateUrl: './ssdlist.component.html',
  styleUrl: './ssdlist.component.scss'
})
export class SsdlistComponent {
  assetUrl = environment.apiUrl + 'assets/';

  ssd: SSD[] = [];
  images: string[] = [];
  imageDB: Image[] = [];
  storedSsd: SSD[] = [];
  ssdSlice: SSD[] = [];

  constructor(private readService: ReadService, private dialog: MatDialog,private snackBar: MatSnackBar){}

  ngOnInit(){
    this.getAllSsd();
    this.getAllImageDB();
    this.getMainImageSsd();
  }
  getAllSsd() {
    this.readService.getAllSSD().subscribe(
        (res: SSD[]) => {
            this.ssd=res;
            this.ssdSlice = this.ssd.slice(0,8)
    });
  }
  getMainImageSsd() {
    let firstImageChecker = true;
    this.readService.getAllImages().subscribe(
    images => {
    this.ssd.forEach((s: SSD)=>{
      images.forEach((im: string)=>
        {
          this.imageDB.forEach((i: Image)=>{
            if(i.type === 'ssd' && i.pic_name === im && s.id === i.product_id && firstImageChecker){
             s.main_picture = im;
             firstImageChecker = false;
            }
          })
        });
        if(firstImageChecker){
          s.main_picture = 'notfound.webp'
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
  addCartSSD(ssd: SSD) {
    let storedData = localStorage.getItem("ssd");
    if (storedData) {
        this.storedSsd = JSON.parse(storedData);
        this.storedSsd.push(ssd);          
    } else {
        this.storedSsd = [ssd]; //Azért így helyezem el benne, hogy ha már van több akkor tudjam pusholni
    }
    localStorage.setItem("ssd", JSON.stringify(this.storedSsd));
    this.snackBar.open('Termék kosárba helyezve', 'Értem', {
      duration: 3000, // Megjelenési időtartam millisecondban (3 másodperc)
      verticalPosition: 'bottom', // Elhelyezkedés: alul
      horizontalPosition: 'center', // Elhelyezkedés: középen
    });
  }
  checkSSD(ssd: SSD) {
    const dialogConfig = new MatDialogConfig();
      
    dialogConfig.disableClose = true; //ha kikattintunk akkor nem fog bezárni
    dialogConfig.autoFocus = true; //A fromfield-re megy a fókusz
    dialogConfig.data = ssd; // Adat átadása a dialógusnak


    const dialogRef = this.dialog.open(SsdviewComponent, dialogConfig);

  }
  OnPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.ssd.length){
        endIndex = this.ssd.length;
    }
    this.ssdSlice = this.ssd.slice(startIndex,endIndex)
  }


}
