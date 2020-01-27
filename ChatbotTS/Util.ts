export abstract class Util {

   public static diceRoll(size: number) {
      return Util.randomInt(size) + 1;
   }

   public static randomInt(size: number) {
      return Math.floor(Math.random() * size);
   }

   public static capitalizeFirst(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1);
   }

   public static startsWithVowel(str: string) {
      var vowelRegex = '^[aieouAIEOU].*'
      return str.match(vowelRegex);
   }

   public static aOrAn(str: string) {
      if (Util.startsWithVowel(str)) {
         return "an";
      } else {
         return "a";
      }
   }
}