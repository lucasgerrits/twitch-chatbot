import { Command } from '../Command';

export class ListCommands extends Command {
   private map: Map<string, Command>;

   constructor(mapIn: Map<string, Command>) {
      super();

      this.map = new Map<string, Command>(mapIn);

      this.reply = this.generateList.bind(this);
   }

   generateList() {
      var keyList = new Array<string>();
      for (let key of this.map.keys()) {
         keyList.push(key.toString());
      }
      return "Available commands: " + keyList.join(", ");
   }
}