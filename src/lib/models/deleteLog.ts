import type { Inventory } from "./inventory";

/**
 * Represents a Deleted Inventory Item
 * @public
 */
export interface DeletedInventory {
	item: Inventory

	deleted_on: Date;
	deletion_comment?: string;
}
