/**
 * @file Implements APIs for deleteLog related data access object methods
 */
import type { Inventory } from '$lib/models/inventory';
import type { DeletedInventory } from '$lib/models/deleteLog';
import { Message } from '$lib/message';
import { Status } from '$lib/status';
import * as InventoryService from '$lib/dao/inventoryDao';

/**
 * Represents a DB containing all deletion logs.
 */
const deletionLogDB: Map<string, DeletedInventory> = new Map();

/**
 * Adds a new {@link Inventory} Item to the DB, with its deletion comment.
 *
 * @param item {Inventory | undefined} - the {@link Inventory} item to be stored.
 * @param deletion_comment {string} - the comment given for the deletion of the object.
 * @return {Message} - the status of the insertion operation.
 */
export function logDeletion(item: Inventory | undefined, deletion_comment: string): Message {
	if (item) {
		const LogEntry: DeletedInventory = {
			item: item,
			deleted_on: new Date(),
			deletion_comment: deletion_comment
		};

		if (deletionLogDB.has(item._id)) {
			return new Message(Status.FAILED, 'ID already exists.');
		} else {
			deletionLogDB.set(item._id, LogEntry);
			return new Message(Status.SUCCESS, 'Log appended');
		}
	}
	return new Message(Status.FAILED, 'No item received.');
}

/**
 * Returns all the {@link DeletedInventory} Items from the database.
 *
 * @return {DeletedInventory[]>} - array containing all {@link DeletedInventory} Items in the database.
 */
export function getAllEntries(): DeletedInventory[] {
	return Array.from(deletionLogDB.values());
}

/**
 * Restores the {@link DeletedInventory} Item with the passed in ID to the inventoryDB, and
 * removes it from the deletionLogDB.
 *
 * @param id {string} - the ID of the {@link DeletedInventory} Item to be restored.
 * @return {Message} - the status of the restore operation.
 */
export function revertDeletionById(id: string): Message {
	if (deletionLogDB.has(id)) {
		if (InventoryService.hasId(id)) {
			return new Message(
				Status.FAILED,
				'ID exists in both deletion Log and Inventory. Contact Support.'
			);
		} else {
			const itemToRestore = deletionLogDB.get(id);
			if (itemToRestore) {
				InventoryService.addInventory(itemToRestore.item);
				purgeLogById(id);
				return new Message(Status.SUCCESS, 'ID restored');
			}
			return new Message(Status.FAILED, 'Error Restoring ID. Contact Support.');
		}
	} else {
		return new Message(Status.FAILED, 'ID does not exists.');
	}
}

/**
 * Removes the {@link DeletedInventory} Item with the passed in ID from the deletionLogDB.
 *
 * @param id {string} - the ID of the {@link DeletedInventory} Item to be removed.
 * @return {Message} - the status of the delete operation.
 */
export function purgeLogById(id: string): Message {
	if (deletionLogDB.delete(id)) {
		return new Message(Status.SUCCESS, 'Log Entry Deleted');
	} else {
		return new Message(Status.FAILED, 'No Such ID in deletionLogDB');
	}
}
