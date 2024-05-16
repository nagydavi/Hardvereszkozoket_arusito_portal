import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import OpenAI from "openai";


@Injectable({
  providedIn: 'root'
})
export class ChatbotService {


  private openai: any = new OpenAI({ apiKey: environment.chatGPTApiKey, dangerouslyAllowBrowser: true });;

  constructor() {
  };

  async chatWithGPT3(message: string): Promise<string> {
    
    try {
      const completion = await this.openai.chat.completions.create({
        messages: [{ role: "system", content: message }],
        model: "gpt-3.5-turbo",
      });
      return completion.choices[0].message['content'];
    } catch (error) {
      console.error("Error during chat with GPT-3:", error);
    }
    return 'Nincs válasz';
  }


}
