import { EventBuilder } from 'structures';

export default new EventBuilder('ready', true)
.setCallBack(async client => {
	console.log(`➜ Logged in as ${client.user!.tag}`);
});
