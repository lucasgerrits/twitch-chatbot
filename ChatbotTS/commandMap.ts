import { Command } from './Command';

import { Boing } from './commands/Boing';
import { CatFact } from './commands/CatFact';
import { ListCommands } from './commands/ListCommands';
import { DogFact } from './commands/DogFact';
import { Pokedex } from './commands/Pokedex';
import { Rolld20 } from './commands/Rolld20';
import { Shitty8Ball } from './commands/Shitty8Ball';
import { Shoutout } from './commands/Shoutout';
import { Speedrun } from './commands/Speedrun';

//import { CatFacts, DogFact, Speedrun } from './commands';

var commandMap = new Map<string, Command>();

commandMap.set("boing", new Boing());
commandMap.set("catfact", new CatFact());
commandMap.set("clownballs", new Command("GUAPAAAAAA"));
commandMap.set("dogfact", new DogFact());
commandMap.set("pokedex", new Pokedex());
commandMap.set("rolld20", new Rolld20());
commandMap.set("shitty8ball", new Shitty8Ball());
commandMap.set("shoutout", new Shoutout());
commandMap.set("speedrun", new Speedrun());
commandMap.set("commands", new ListCommands(commandMap));

export { commandMap };