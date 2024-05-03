import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import OpenAI from "openai";

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {


  private openai: any;

  constructor() {
    this.openai = new OpenAI({ apiKey: environment.chatGPTApiKey, dangerouslyAllowBrowser: true });
  };

  async chatWithGPT3() {
    
    try {
      const completion = await this.openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "gpt-3.5-turbo",
      });
      console.log('hello');
      console.log(completion.choices[0]);
    } catch (error) {
      console.error("Error during chat with GPT-3:", error);
    }
  }

}
