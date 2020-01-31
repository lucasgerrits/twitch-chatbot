import { Command } from '../Command';
import { Util } from '../Util';

export class Rolld20 extends Command {
   constructor() {
      super();

      this.cooldown = 0;

      this.reply = this.rolld20.bind(this);
   }

   rolld20() {
      const result: number = Util.diceRoll(20);
      // The addition of the sender's name is known as "The Boshart Clause"
      var output: string = "@" + this.sender.name + ", you rolled a "
         + result + ".";
      if (result === 20) {
         output += " Critical Success!";
      }
      else if (result === 1) {
         output += " Critical Failure!";
      }
      return output;
   }
}