import { CommandBuilder } from 'structures';

export default new CommandBuilder()
	.setName('ping')
	.setNameLocalization('pt-BR', 'latencia')
	.setDescription('Mostrar a latencia do BOT')
	.setCallBack(async ({client, interaction}) => {
		interaction.reply(`Ping ${client.ws.ping}ms`);
	})
