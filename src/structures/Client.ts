import type { CommandBuilder } from './Command';
import { commandHandler, eventHandler } from 'handlers';
import Discord from 'discord.js';

export class ExtendedClient extends Discord.Client<true> {
	public constructor () {
		super({ intents: 4861 });
	}

	public commands = new Discord.Collection<string, CommandBuilder>();

	public async start() {
		await commandHandler(this);
		await eventHandler(this);
		await this.login();
	}
}

