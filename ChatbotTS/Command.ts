import { BotTrigger } from './BotTrigger';

export class Command extends BotTrigger {

   constructor(optionalString: string = "") {
      super();

      if (optionalString !== "") {
         this.reply = async function () {
            return optionalString;
         }
      }
   }
}