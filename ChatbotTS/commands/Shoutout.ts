import { Ajax } from '../Ajax';
import { Command } from '../Command';

export class Shoutout extends Command {
   constructor() {
      super();

      this.reply = this.shoutShoutLetItAllOut;
   }

   shoutShoutLetItAllOut(args) {
      var shoutUser: string = args[0];
      var output: string;
      if (shoutUser) {
         var output = "shouts into the void, 'FUCK YEAH @" + shoutUser +
            " !! Let'cha favorite bot boi hook you up with a garden fresh" +
            " internet link. *wink wink* https://www.twitch.tv/" + shoutUser;
      }
      else {
         output = "Yeah, but like, who would name their kid \'undefined\'?";
      }
      return output;
   }
}