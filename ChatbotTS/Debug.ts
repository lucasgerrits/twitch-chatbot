import { Settings } from './Settings';

export abstract class Debug {

   public static log(value: string) {
      if (Settings.debug) {
         console.log("DEBUG: " + value);
      }
   }

   public static logIfOff(value: string) {
      if (!Settings.debug) {
         console.log("DEBUG: " + value);
      }
   }
}