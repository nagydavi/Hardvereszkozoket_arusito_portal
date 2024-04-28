import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { FooterComponent } from "../footer/footer.component";
import { MatDivider } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { Laptop } from '../../Models/laptop';
import { SSD } from '../../Models/ssd';
import { Ram } from '../../Models/ram';
import { Pendrive } from '../../Models/pendrive';
import { MatIcon } from '@angular/material/icon';
import { OpSystem } from '../../Models/opsys';
import { ReadService } from '../read.service';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss',
    imports: [
      MenuComponent,
      FooterComponent,
      MatDivider,
      CommonModule,
      MatIcon,
      MatButton
    ]
})
export class CartComponent implements OnInit{
 
 
  cartLaptops: any[] = [];
  cartSsd: any[] = [];
  cartRam: any[] = [];
  cartPendrive: any[] = [];
  opSystem: OpSystem[] = [];


  constructor(private readService: ReadService){}


  ngOnInit(): void {
    this.getCartLaptops();
    this.getCartPendrive();
    this.getCartSsd();
    this.getCartRam();
    this.getAllOpSystem();
  }


  getCartLaptops(){
    let storedDataLaptop = localStorage.getItem("laptop");
    if (storedDataLaptop) {
      this.cartLaptops = JSON.parse(storedDataLaptop);
    }
  }
  getCartSsd(){
    let storedDataLaptop = localStorage.getItem("ssd");
    if (storedDataLaptop) {
      this.cartSsd = JSON.parse(storedDataLaptop);
    }
  }
  getCartRam(){
    let storedDataLaptop = localStorage.getItem("ram");
    if (storedDataLaptop) {
      this.cartRam = JSON.parse(storedDataLaptop);
    }
  }
  getCartPendrive(){
    let storedDataLaptop = localStorage.getItem("pendrive");
    if (storedDataLaptop) {
      this.cartPendrive = JSON.parse(storedDataLaptop);
    }
  }

  isPendriveInCart(): boolean {
    if(localStorage.getItem("pendrive")){
      return true;
    }else{
      return false;
    }
  }
  isRamInCart(): boolean {
    if(localStorage.getItem("ram")){
      return true;
    }else{
      return false;
    }
  }
  isSsdInCart(): boolean {
    if(localStorage.getItem("ssd")){
      return true;
    }else{
      return false;
    }
  }
  isLaptopInCart(): boolean {
    if(localStorage.getItem("laptop")){
      return true;
    }else{
      return false;
    }
  }

  getOpName(opId?: number): string {
    const op = this.opSystem.find(o => o.id === opId);
    return op ? op.name : '';
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
  deletePendriveFromCart(pendrive: Pendrive) {
    let storedDataPendrive = localStorage.getItem("pendrive");
    if (storedDataPendrive) {
      let cartPendrive = JSON.parse(storedDataPendrive);
      let i = 0;
      if(Array.isArray(cartPendrive)){
        for(let item of this.cartPendrive){
          if(item.id === pendrive.id){
            cartPendrive.splice(i, 1);
            break;
          }
          i++
        }
        localStorage.setItem("pendrive", JSON.stringify(cartPendrive));
        this.getCartPendrive();
      }
    }
  }
  deleteRamFromCart(ram: Ram) {
    let storedDataRam = localStorage.getItem("ram");
    if (storedDataRam) {
      let cartRam = JSON.parse(storedDataRam);
      let i = 0;
      if(Array.isArray(cartRam)){
        for(let item of this.cartRam){
          if(item.id === ram.id){
            cartRam.splice(i, 1);
            break;
          }
          i++;
        }        
        localStorage.setItem("ram", JSON.stringify(cartRam));
        this.getCartRam();
      }
    }
  }
  deleteSsdFromCart(ssd: SSD) {
    let storedDataSsd = localStorage.getItem("ssd");
    if (storedDataSsd) {
      let cartSsd = JSON.parse(storedDataSsd);
      let i = 0;
      if(Array.isArray(cartSsd)){
        for(let item of this.cartSsd){
          if(item.id === ssd.id){
            cartSsd.splice(i, 1);
            break;
          }
          i++;
        } 
        localStorage.setItem("ssd", JSON.stringify(cartSsd));
        this.getCartSsd();
      }
    }
  }
    
  deleteLaptopFromCart(laptop: Laptop) {
    let storedDataLaptop = localStorage.getItem("laptop");
    if (storedDataLaptop) {
      let cartLaptops = JSON.parse(storedDataLaptop);
      let i = 0;
      if(Array.isArray(cartLaptops)){
        for(let item of this.cartLaptops){
          if(item.id === laptop.id){
            cartLaptops.splice(i, 1);
            break;
          }
          i++;
        }         
        localStorage.setItem("laptop", JSON.stringify(cartLaptops));
        this.getCartLaptops();
      }
    }
  }
  getAllPrice(): number{
    let price = 0;
    //laptop
    this.cartLaptops.forEach((element)=>{
      if(element.discount === 1){
       price += parseInt(element.discountprice);
      }else{
        price += parseInt(element.price);
      }
    })
    //ssd
    this.cartSsd.forEach((element)=>{
      if(element.discount === 1){
        price += parseInt(element.discountprice);
      }else{
        price += parseInt(element.price);
      }
    })
    //pendrive
    this.cartPendrive.forEach((element)=>{
      if(element.discount === 1){
        price += parseInt(element.discountprice);
      }else{
        price += parseInt(element.price);
      }
    })
    //ram
    this.cartRam.forEach((element)=>{
      if(element.discount === 1){
        price += parseInt(element.discountprice);
      }else{
        price += parseInt(element.price);
      }
    })

    return price;
  }


}
