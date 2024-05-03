import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { MenuComponent } from "../menu/menu.component";
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ChatbotService } from './chatbot.service';
import { MatInputModule } from '@angular/material/input';

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


  constructor(private chatService: ChatbotService){}

  send(promt: string) {
    this.chatService.chatWithGPT3();
  }
}
