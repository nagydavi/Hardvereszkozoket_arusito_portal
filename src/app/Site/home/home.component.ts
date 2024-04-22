import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { FooterComponent } from "../footer/footer.component";
import { MatCard } from '@angular/material/card';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        MenuComponent,
        FooterComponent,
        MatCard]
})
export class HomeComponent {

}
