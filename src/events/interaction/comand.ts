import { ChannelType } from 'discord.js';
import { EventBuilder } from 'structures';

export default new EventBuilder('interactionCreate', true).setCallBack(async (client, interaction) => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.channel && interaction.channel.type === ChannelType.DM) {
		return interaction.reply({
			content: 'Nao pode usar comandos na DM',
			ephemeral: true
		})
	}

	if (!interaction.inCachedGuild()) {
		await interaction.guild?.fetch();
		return interaction.reply({
			content: 'Adicionando o servidor ao Cache',
			ephemeral: true
		});
	}

	const { commandName } = interaction;
	const command = client.commands.get(commandName);

	if (!command) {
		client.application.commands.set(client.commands.map(c => c.toJSON()));

		return interaction.reply({
			content: 'Comando nao encontrado',
			ephemeral: true
		});
	}

	await command.callback({ client, interaction });
	return void 0;
});
