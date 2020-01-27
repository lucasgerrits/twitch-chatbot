import { UserLevel } from './UserLevel';

export class BotTrigger {
   private cooldown: number;
   public isOnCooldown: boolean;
   public reply: any;
   private userLevel: UserLevel;

   constructor() {
      var defaultCooldownMilliseconds = 0;

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