import { User } from './User';
import { UserLevel } from './UserLevel';

export class BotTrigger {
   public cooldown: number;
   public isOnCooldown: boolean;
   public reply: any;
   private userLevel: UserLevel;
   public sender: User;

   constructor() {
      var defaultCooldownMilliseconds = 3000;

      this.cooldown = defaultCooldownMilliseconds;
      this.isOnCooldown = false;

      this.reply = function () { return ""; };

      this.userLevel = UserLevel.Default;
   }

   startCooldown() {
      this.isOnCooldown = true;
      setTimeout(this.stopCooldown.bind(this), this.cooldown);
   }

   stopCooldown() {
      this.isOnCooldown = false;
   }
}