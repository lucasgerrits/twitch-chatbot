import { UserLevel } from './UserLevel';

export class User {
   public name: string;
   private userLevel: UserLevel;

   constructor(nameIn: string) {
      this.name = nameIn;
      this.userLevel = UserLevel.Default;
   }
}