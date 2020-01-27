import { Command } from './Command';
import { User } from './User';
import { Settings } from './Settings';

export class Message {
   private raw: string;
   public meta: string;
   public sender: User;
   public text: string;
   public isCommand: boolean;
   public commandName: string;
   public args: string[];
   public command: Command;

   constructor(data: string) {
      this.raw = this.removeEvilInvisibleSpaces(data);
      this.splitRawMessage();
      this.checkIfCommand();
   }

   private removeEvilInvisibleSpaces(text: string) {
      return text.trim().replace(/\u200B/g, '');
   }

   private splitRawMessage() {
      var arr = this.raw.split(' :', 3);
      this.meta = arr[0];
      var endOfName = arr[1].indexOf("!");
      var senderName = arr[1].substring(0, endOfName);
      this.sender = new User(senderName);
      this.text = arr[2];
   }
   
   private checkIfCommand() {
      if (this.text.substring(0, 1) === '_') {
         this.isCommand = true;
         var arr = this.text.substring(1).split(" ");
         this.commandName = arr[0];
         arr.shift();
         this.args = arr;
      } else {
         this.isCommand = false;
      }
   }

   public isNotFromSelf() {
      return this.sender.name !== Settings.botName;
   }

   public reply() {
      return this.command.reply(this.args);
   }
}