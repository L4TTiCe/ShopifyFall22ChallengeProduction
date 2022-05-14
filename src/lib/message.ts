import type { LatLong } from './dao/citiesDao';
import type { Inventory } from './models/inventory';
import type { Status } from './status';

/**
 * Represents a Message returned by DAOs, that hold the status of the message (Sucess of Failed),
 * a message describing the result, and an otional payload.
 */
export class Message {
	status: Status;
	message: string;
	item?: Inventory;
	coordinates?: LatLong;

	constructor(status: Status, message: string, item?: Inventory, coordinates?: LatLong) {
		this.status = status;
		this.message = message;
		this.item = item;
		this.coordinates = coordinates;
	}
}
