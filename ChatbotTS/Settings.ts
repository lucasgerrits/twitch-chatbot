import { Util } from './Util';

export abstract class Settings {
   // Channel To Join
   public static channel: string;

   // Twitch Bot Account
   public static botName: string;
   public static token: string;

   // Twitch API Credentials
   public static clientID: string;
   public static clientSecret: string;
   
   // Enables Debug Logging In Console
   public static debug: boolean = true;
   
   public static initialize() {
      const configData: any = Settings.deserializeConfigFile();

      Settings.channel = configData.twitchBot.channelToJoin;
      Settings.botName = configData.twitchBot.account;
      Settings.token = configData.twitchBot.token;

      Settings.clientID = configData.twitchAPI.clientID;
      Settings.clientSecret = configData.twitchAPI.clientSecret;

      Settings.debug = (configData.general.debug === 'true');
   }

   private static deserializeConfigFile(): object {
      const iniString: string = Util.readFileAsString("config.ini");
      return Settings.parseINIString(iniString);
   }

   private static parseINIString(iniString: string): object {
      var regex = {
         section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
         param: /^\s*([^=]+?)\s*=\s*(.*?)\s*$/,
         comment: /^\s*;.*$/
      };
      var value = {};
      var lines = iniString.split(/[\r\n]+/);
      var section = null;
      lines.forEach(function (line) {
         if (regex.comment.test(line)) {
            return;
         } else if (regex.param.test(line)) {
            var match = line.match(regex.param);
            if (section) {
               value[section][match[1]] = match[2];
            } else {
               value[match[1]] = match[2];
            }
         } else if (regex.section.test(line)) {
            var match = line.match(regex.section);
            value[match[1]] = {};
            section = match[1];
         } else if (line.length == 0 && section) {
            section = null;
         };
      });
      return value;
   }
}

/*
// Downside is that inner class must be exported, so it is always
// visible to the outside, there are no private inner classes
export module Settings {
   export class TwitchBotSettings {
      public account: string;
      public token: string;
   }
}
*/