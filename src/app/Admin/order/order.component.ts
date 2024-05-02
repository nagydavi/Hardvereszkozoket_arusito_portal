import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { Order } from '../../Models/order';
import { OrderService } from './order.service';
import { ReadService } from '../../Site/read.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { Laptop } from '../../Models/laptop';
import { SSD } from '../../Models/ssd';
import { Ram } from '../../Models/ram';
import { Pendrive } from '../../Models/pendrive';

@Component({
    selector: 'app-order',
    standalone: true,
    templateUrl: './order.component.html',
    styleUrl: './order.component.scss',
    imports: [
      MenuComponent,
      MatExpansionModule,
      CommonModule
    ]
})
export class OrderComponent {

  order: Order[]=[];
  laptop: Laptop[]=[];
  ssd: SSD[]=[];
  ram: Ram[]=[];
  pendrive: Pendrive[]=[];



  constructor(private orderService: OrderService,private readService: ReadService){
  
  }

  ngOnInit(): void {
    this.getAllOrder();
    this.getAllLaptop();
    this.getAllPendrive();
    this.getAllRam();
    this.getAllSsd();



  }

  getAllOrder() {
    this.orderService.getAllOrder().subscribe(
      (res: Order[]) => {
        this.order = res;
        //Azért kell, hogy mindig a legfrissebb megrendelés legyen legfelül
        this.order.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      },
      (error) => {
        console.error('Hiba történt a Megrendelések lekérésekor:', error);
    }
    );
  }
  getAllLaptop(){
    this.readService.getAllLaptop().subscribe(
      (res: Laptop[])=>{
        this.laptop = res; 
      });
  }
  getLaptopById(id: number): Laptop{
    let laptop = new Laptop;
    this.laptop.forEach((element)=>{
      if(element.id === id){
        laptop = element;
      }
    });
    return laptop;

  }
  getAllRam(){
    this.readService.getAllRam().subscribe(
      (res: Ram[])=>{
        this.ram = res; 
      });
  }
  getRamById(id: number): Ram{
    let ram = new Ram;
    this.ram.forEach((element)=>{
      if(element.id === id){
        ram = element;
      }
    });
    return ram;
  }
  getAllPendrive(){
    this.readService.getAllPendrive().subscribe(
      (res: Pendrive[])=>{
        this.pendrive = res; 
      });
  }
  getPendriveById(id: number): Pendrive{
    let pendrive = new Pendrive();
    this.pendrive.forEach((element)=>{
      if(element.id === id){
        pendrive = element;
      }
    });
    return pendrive;
  }
  getAllSsd(){
    this.readService.getAllSSD().subscribe(
      (res: SSD[])=>{
        this.ssd = res; 
      });
  }
  getSsdById(id: number): SSD{
    let ssd = new SSD();
    this.ssd.forEach((element)=>{
      if(element.id === id){
        ssd = element;
      }
    });
    return ssd;
  }

}
