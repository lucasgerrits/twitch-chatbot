import { Ajax } from './Ajax';
import { Command } from './Command';
import { Debug } from './Debug';
import { Util } from './Util';

var commands = new Map<string, Command>();

var clownballs = new Command();
clownballs.reply = function () {
   return "GUAPAAAAAA";
};
commands.set("clownballs", clownballs);

var boing = new Command();
boing.reply = async function () {
   return Ajax.get("http://www.carefreebomb.com/nightbot/boingzoom.php");
}
commands.set("boing", boing);

var pokedex = new Command();
pokedex.reply = async function (args) {
   var url = "https://pokeapi.co/api/v2/pokemon/" + args[0].toLowerCase();
   var data: any = await Ajax.get(url);
   data = JSON.parse(data);
   var id = data.id;
   var name = Util.capitalizeFirst(data.name);
   var type = Util.capitalizeFirst(data.types[0].type.name);
   if (data.types.length > 1) type = Util.capitalizeFirst(data.types[1].type.name) + "/" + type;
   var a = Util.capitalizeFirst(Util.aOrAn(type));
   var url2 = data.species.url;
   Debug.log(url2);
   Debug.log(data.species.url);
   var data2: any = await Ajax.get(url2);
   data2 = JSON.parse(data2);
   var flavorTexts = data2.flavor_text_entries;
   for (var i = 0; i < flavorTexts.length; i++) {
      if (flavorTexts[i].language.name === "en") {
         var description = flavorTexts[i].flavor_text.replace("\n|\f", "");
         Debug.log(description);
         break;
      }
   }
   var output = "#" + id + ". " + name + " - " + a + " " + type +
      " type" + " Pok\xE9mon. " + description;
   return output;
};
commands.set("pokedex", pokedex);

var rolld20 = new Command();
rolld20.reply = function () {
   return "You rolled a " + Util.diceRoll(20) + ".";
};
commands.set("rolld20", rolld20);

var shitty8ball = new Command();
shitty8ball.reply = function () {
   var magic = ["hehe, ye", "nah man", "ya gonna goof it",
      "BEWARE", "uh...null reference exception?", "Please don't talk to me.",
      "How about NO?", "Ha of cour- wait...nope, that was something else",
      "Damned if you do and damned if you don't. Yeehaw.",
      "Naw...or sometimes? Can't help you. Definitely maybe for sure",
      "Listen kid, I aint got nothin for ya"
   ];
   return magic[Util.randomInt(magic.length)];
};
commands.set("shitty8ball", shitty8ball);

var shoutout = new Command();
shoutout.reply = function (args) {
   var shoutUser = args[0];
   var output = "shouts into the void, 'FUCK YEAH @" + shoutUser +
      " !! Let'cha boi hook you up with a garden fresh internet " +
      "link.Hehe, I'm totally the bot. https://www.twitch.tv/" + shoutUser;
   return output;
};
commands.set("shoutout", shoutout);

var speedrun = new Command();
speedrun.reply = async function (args) {
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
};
commands.set("speedrun", speedrun);

export { commands };