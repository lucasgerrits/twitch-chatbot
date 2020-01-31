import { Ajax } from '../Ajax';
import { Command } from '../Command';

export class Boing extends Command {
   constructor() {
      super();

      this.reply = this.boingZoom;
   }

   async boingZoom() {
      var peanutCheeseBar = await Ajax.get("http://www.carefreebomb.com/nightbot/boingzoom.php");
      return peanutCheeseBar;
   }
}