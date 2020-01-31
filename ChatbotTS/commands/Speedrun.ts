import { Ajax } from '../Ajax';
import { Command } from '../Command';

export class Speedrun extends Command {
   constructor() {
      super();

      this.reply = this.getMostRecentRun;
   }

   async getMostRecentRun(args) {
      var userURL = "https://www.speedrun.com/api/v1/users?name=" + args[0];
      var userData: any = await Ajax.get(userURL);
      userData = JSON.parse(userData).data[0];
      var name = userData.names.international;

      var runsURL = userData.links[1].uri + "&orderby=submitted&direction=desc";
      var runsData: any = await Ajax.get(runsURL);
      var runsData = JSON.parse(runsData).data[0];
      var runWebLink = runsData.weblink;
      var runDate = runsData.date;
      var runTime = new Date(runsData.times.primary_t * 1000).toISOString().substr(11, 8);

      var gameURL = runsData.links[1].uri;
      var gameData: any = await Ajax.get(gameURL);

      gameData = JSON.parse(gameData).data;
      var gameName = gameData.names.international;

      var categoryURL = runsData.links[2].uri;
      var categoryData: any = await Ajax.get(categoryURL);
      categoryData = JSON.parse(categoryData).data;
      var categoryName = categoryData.name;

      var output = name + "'s latest run: " + gameName + " - " +
         categoryName + " on " + runDate + " in " + runTime + ". " + runWebLink;
      return output;
   }
}