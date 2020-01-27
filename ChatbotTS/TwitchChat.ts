import { Debug } from './Debug';
import { Message } from './Message';
import { Settings } from './Settings';
import { commands } from './commands';

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

   public setEventHandlers() {
      this.ws.on('open', this.openConnection.bind(this));
      this.ws.on('message', async function (data) {
         this.handleMessage(data);
      }.bind(this));
      this.ws.on('close', this.closeConnection.bind(this));
   }

   public openConnection() {
      Debug.log("openConnection() Start");
      this.ws.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership');
      this.ws.send('PASS ' + Settings.token);
      this.ws.send('NICK ' + Settings.botName);
      this.ws.send('JOIN #' + this.channel);
   }

   public closeConnection() {
      this.ws.close();
      console.log("TwitchChat WebSocket: I did it! I closed.");
   }

   private async handleMessage(data) {
      Debug.log("handleMessage() Start");
      Debug.log(data);

      if (data.includes("PRIVMSG")) {
         var msg = new Message(data);

         if (msg.isNotFromSelf()) {
            
            if (msg.isCommand && commands.has(msg.commandName)) {
               Debug.log(msg.commandName + ": Message is a command.");
               try {
                  msg.command = commands.get(msg.commandName);

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