import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { MenuComponent } from "../menu/menu.component";
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ChatbotService } from './chatbot.service';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-chatbot',
    standalone: true,
    templateUrl: './chatbot.component.html',
    styleUrl: './chatbot.component.scss',
    imports: [
      MenuComponent,
      FooterComponent,
      FormsModule,
      MatFormField,
      CommonModule,
      MatFormFieldModule,
      MatInputModule,

    ]
})
export class ChatbotComponent {


  promt:any='';
  message: string[] = [];


  constructor(private chatService: ChatbotService,private snackBar: MatSnackBar){}

  async send(promt: string) {
    this.snackBar.open('Kérjük várjon a válaszra, türelmét köszönjük!', 'Értem', {
      duration: 3000, // Megjelenési időtartam millisecondban (3 másodperc)
      verticalPosition: 'bottom', // Elhelyezkedés: alul
      horizontalPosition: 'center', // Elhelyezkedés: középen
    });
    this.message.push(await this.chatService.chatWithGPT3(promt));
    promt = '';
  }
}
