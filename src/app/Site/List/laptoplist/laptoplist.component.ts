import { Component } from '@angular/core';
import { MenuComponent } from "../../menu/menu.component";
import { FooterComponent } from "../../footer/footer.component";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader } from '@angular/material/card';
import { Laptop } from '../../../Models/laptop';
import { ReadService } from '../../read.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { Image } from '../../../Models/image';
import { OpSystem } from '../../../Models/opsys';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LaptopviewComponent } from '../../View/laptopview/laptopview.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { every } from 'rxjs';

@Component({
    selector: 'app-laptoplist',
    standalone: true,
    templateUrl: './laptoplist.component.html',
    styleUrl: './laptoplist.component.scss',
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
    ]
})
export class LaptoplistComponent {

    assetUrl = environment.apiUrl + 'assets/';

    laptops: Laptop[] = [];
    images: string[] = [];
    imageDB: Image[] = [];
    opSystem: OpSystem[] = [];
    storedLaptop: Laptop[] = [];
    laptopSlice: Laptop[] = [];

    constructor(private readService: ReadService, private dialog: MatDialog,private snackBar: MatSnackBar){}

    ngOnInit(){
        this.getAllOpSystem();
        this.getAllLaptop();
        this.getAllImageDB();
        this.getMainImageLaptop();
    }
    getAllLaptop() {
        this.readService.getAllLaptop().subscribe(
            (res: Laptop[]) => {
                this.laptops=res;
                this.laptopSlice = this.laptops.slice(0,8)
        });
    }
    getMainImageLaptop() {
        let firstImageChecker = true;
        this.readService.getAllImages().subscribe(
        images => {
        this.laptops.forEach((laptop: Laptop)=>{
          images.forEach((im: string)=>
            {
              this.imageDB.forEach((i: Image)=>{
                if(i.type === 'laptop' && i.pic_name === im && laptop.id === i.product_id && firstImageChecker){
                 laptop.main_picture = im;
                 firstImageChecker = false;
                }
              })
            });
            if(firstImageChecker){
              laptop.main_picture = 'notfound.webp'
              console.log('jártam itt');
            }
            firstImageChecker = true;
        })
        
      },
      error => {
        console.error('Error fetching images:', error);
      }
      
    );
    }
    getAllOpSystem() {
        this.readService.getAllOP().subscribe(
          (res: OpSystem[]) => {
            this.opSystem = res;
          },
          (error) => {
            console.error('Hiba történt a Role-ok lekérésekor:', error);
        }
        );
      }
      getOpName(opId?: number): string {
        const op = this.opSystem.find(o => o.id === opId);
        return op ? op.name : '';
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
    addCartLaptop(laptop: Laptop) {
        let storedData = localStorage.getItem("laptop");
        if (storedData) {
            this.storedLaptop = JSON.parse(storedData);
            this.storedLaptop.push(laptop);          
        } else {
            this.storedLaptop = [laptop]; //Azért így helyezem el benne, hogy ha már van több akkor tudjam pusholni
        }
        localStorage.setItem("laptop", JSON.stringify(this.storedLaptop));
        this.snackBar.open('Termék kosárba helyezve', 'Értem', {
          duration: 3000, // Megjelenési időtartam millisecondban (3 másodperc)
          verticalPosition: 'bottom', // Elhelyezkedés: alul
          horizontalPosition: 'center', // Elhelyezkedés: középen
        });
      }
      checkLaptop(laptop: Laptop) {
        const dialogConfig = new MatDialogConfig();
          
        dialogConfig.disableClose = true; //ha kikattintunk akkor nem fog bezárni
        dialogConfig.autoFocus = true; //Az fromfield-re megy a fókusz
        dialogConfig.data = laptop; // Adat átadása a dialógusnak
  
  
        const dialogRef = this.dialog.open(LaptopviewComponent, dialogConfig);
      }
    OnPageChange(event: PageEvent) {
        const startIndex = event.pageIndex * event.pageSize;
        let endIndex = startIndex + event.pageSize;
        if(endIndex > this.laptops.length){
            endIndex = this.laptops.length;
        }
        this.laptopSlice = this.laptops.slice(startIndex,endIndex)
    }
}
