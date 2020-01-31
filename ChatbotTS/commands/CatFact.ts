import { Ajax } from '../Ajax';
import { Command } from '../Command';

export class CatFact extends Command {
   constructor() {
      super();

      this.reply = this.getCatFact;
   }

   async getCatFact() {
      var url = "https://catfact.ninja/fact/";
      var data: any = await Ajax.get(url);
      data = JSON.parse(data);
      var fact = data.fact;
      return fact;
   }
}