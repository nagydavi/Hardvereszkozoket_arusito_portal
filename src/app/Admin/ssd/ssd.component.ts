import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";

@Component({
    selector: 'app-ssd',
    standalone: true,
    templateUrl: './ssd.component.html',
    styleUrl: './ssd.component.scss',
    imports: [MenuComponent]
})
export class SsdComponent {

}
