import { Ajax } from '../Ajax';
import { Command } from '../Command';

export class DogFact extends Command {
   constructor() {
      super();

      this.reply = this.getDogFact;
   }

   async getDogFact() {
      var url = "https://dog-api.kinduff.com/api/facts";
      var data: any = await Ajax.get(url);
      var facts = JSON.parse(data).facts[0];
      return facts;
   }
}