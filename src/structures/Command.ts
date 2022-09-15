import { SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import type { ChatInputApplicationCommandData } from 'discord.js';
import type { ExtendedClient } from './Client';

export class CommandBuilder extends SlashCommandBuilder {
	public callback!: () => unknown;

	public setCallBack (fn: CommandFunction)  {
		this.callback = fn;

		return this;
	}

	public override addSubcommand(input: SlashCommandSubcommandBuilder | ((subcommandGroup: SlashCommandSubcommandBuilder) => SlashCommandSubcommandBuilder)): SlashCommandSubcommandsOnlyBuilder {
		super.addSubcommand(input);

		return this;
	}

	public override addSubcommandGroup(input: SlashCommandSubcommandGroupBuilder | ((subcommandGroup: SlashCommandSubcommandGroupBuilder) => SlashCommandSubcommandGroupBuilder)): SlashCommandSubcommandsOnlyBuilder {
		super.addSubcommandGroup(input);

		return this;
	}
}

type CommandFunction = (idk: {
	client: ExtendedClient;
	interaction: ChatInputApplicationCommandData<'cached'>;
}) => unknown;
