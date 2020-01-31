import { Command } from '../Command';
import { Util } from '../Util';

export class Shitty8Ball extends Command {
   private magic: Array<string>;

   constructor() {
      super();

      this.imagination();

      this.reply = this.itsMagic.bind(this);
   }

   imagination() {
      this.magic = [
         "hehe, ye",
         "nah man",
         "ya gonna goof it",
         "BEWARE",
         "uh...null reference exception?",
         "Please don't talk to me.",
         "How about NO?",
         "Ha of cour- wait...nope, that was something else",
         "Damned if you do and damned if you don't. Yeehaw.",
         "Naw...or sometimes? Can't help you. Definitely maybe for sure",
         "Listen kid, I ain't got nothin for ya"
      ];
   }

   itsMagic() {
      var magicNumber = Util.randomInt(this.magic.length);
      return "*shakeshakeshake* It says: \"" + this.magic[magicNumber] + "\"";
   }
}