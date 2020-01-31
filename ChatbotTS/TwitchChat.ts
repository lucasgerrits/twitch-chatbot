import { Debug } from './Debug';
import { Message } from './Message';
import { Settings } from './Settings';
import { commandMap } from './commandMap';

const WebSocket = require('ws');

export class TwitchChat {
   private ws: any;
   private url: string;
   private channel: string;

   constructor() {
      this.channel = Settings.channel;
      this.url = "wss://irc-ws.chat.twitch.tv:443";
      this.ws = new WebSocket(this.url);

      try {
         this.setEventHandlers();
      }
      catch (err) {
         console.log(err);
      }
   }

   public setEventHandlers(): void {
      this.ws.on('open', this.openConnection.bind(this));
      this.ws.on('message', async function (data) {
         this.handleMessage(data);
      }.bind(this));
      this.ws.on('close', this.closeConnection.bind(this));
   }

   public openConnection(): void {
      Debug.log("openConnection() Start");
      this.ws.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership');
      this.ws.send('PASS ' + Settings.token);
      this.ws.send('NICK ' + Settings.botName);
      this.ws.send('JOIN #' + this.channel);
   }

   public closeConnection(): void {
      this.ws.close();
      console.log("TwitchChat WebSocket: I did it! I closed.");
   }

   private async handleMessage(data) {
      Debug.log("handleMessage() Start");
      Debug.log(data);

      if (data.includes("PRIVMSG")) {
         var msg = new Message(data);

         if (msg.isNotFromSelf()) {
            
            if (msg.isCommand && commandMap.has(msg.commandName)) {
               Debug.log(msg.commandName + ": Message is a command.");
               try {
                  msg.command = commandMap.get(msg.commandName);
                  msg.command.sender = msg.sender;

                  var reply = await msg.reply();

                  if (!msg.command.isOnCooldown && reply !== undefined) {
                     console.log(reply);
                     this.sendToChannel(reply);
                     msg.command.startCooldown();
                  }
               }
               catch (err) {
                  console.log(err);
               }
            }
         }
      } else if (data.includes("PING")) {
         Debug.log("PING PONG");
         this.ws.send('PONG :tmi.twitch.tv');
      } else if (data.includes("JOIN") || data.includes("PART")) {
         Debug.logIfOff(data);
      }
   }

   private async sendToChannel(msg: string) {
      this.ws.send("PRIVMSG #" + this.channel + " :/me : " + msg);
   }
   
}