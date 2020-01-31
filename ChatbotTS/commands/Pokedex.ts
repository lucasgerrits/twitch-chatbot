import { Ajax } from '../Ajax';
import { Command } from '../Command';
import { Debug } from '../Debug';
import { Util } from '../Util';

export class Pokedex extends Command {

   constructor() {
      super();

      this.reply = this.getPokedexEntry;
   }

   async getPokedexEntry(args) {
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
   }
}