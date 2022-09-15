import type { ExtendedClient, EventBuilder } from 'structures';
import { readdirSync } from 'fs';
import { join } from 'path';

export async function eventHandler(client: ExtendedClient) {
	const categories = readdirSync(join(__dirname, '..', 'events'));
	for (const category of categories) {
		const events = readdirSync(join(__dirname, '..', 'events', category));
		for (const eventFile of events) {
			const { default: event }: { default: EventBuilder<'ready'> } = await import(
				join(__dirname, '..', 'events', category, eventFile)
			);

			client[event.once ? 'once' : 'on'](
				event.name,
				(...args) => void event.callback(client, ...args)
			);
		}
	}
}
