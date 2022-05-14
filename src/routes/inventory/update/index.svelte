<script context="module">
	export async function load() {
		const inventoryItems = getAllItems();
		return {
			props: {
				inventoryItems
			}
		};
	}
</script>

<script lang="ts">
	import { getAllItems, getItemById, updateInventory } from '$lib/dao/inventoryDao';
	import type { Inventory } from '$lib/models/inventory';
	import InventoryForm from '$lib/components/InventoryForm.svelte';

	let selected: string;
	let inventoryId = '';

	export let inventoryItems: Inventory[];

	let id = '';
	let name = '';
	let city = '';
	let description = '';

	let quantity = '';
	let created_on = new Date().toISOString().slice(0, 16);

	let status_message = '';

	function refreshData() {
		inventoryItems = getAllItems();
	}

	function validateInventoryItem(item: Inventory): boolean {
		if (item.name == '') {
			return false;
		} else {
			return true;
		}
	}

	function handleSubmit() {
		let inventoryitem: Inventory = {
			_id: id,
			name: name,
			city: city,
			description: description,
			quantity: +quantity,
			created_on: created_on
		};

		if (validateInventoryItem(inventoryitem)) {
			alert('Item Updated!');
			updateInventory(inventoryitem);
			resetData();
			refreshData();
			selected = '';
		} else {
			status_message = 'Name is a required field.';
		}
	}

	function resetData() {
		id = '';
		name = '';
		city = '';
		description = '';
		quantity = '';
		created_on = new Date().toISOString().slice(0, 16);
	}

	$: if (selected && selected != inventoryId) {
		resetData();
		const selectedItemData = getItemById(selected);
		if (selectedItemData.item) {
			id = selectedItemData.item._id;
			if (selectedItemData.item.name) name = selectedItemData.item.name;
			if (selectedItemData.item.city) city = selectedItemData.item.city;
			if (selectedItemData.item.description) description = selectedItemData.item.description;
			if (selectedItemData.item.quantity) quantity = selectedItemData.item.quantity.toString();
			if (selectedItemData.item.created_on) created_on = selectedItemData.item.created_on;
		}
	}
</script>

<h2 class="text-2xl m-4">Update Item</h2>
<form class="w-full max-w-lg mx-4">
	<div class="flex flex-wrap -mx-3 mb-6">
		<div class="w-full px-3">
			<label
				class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
				for="grid-username"
			>
				Selected Item
			</label>
			<select
				bind:value={selected}
				disabled={inventoryItems.length == 0}
				class="{!selected
					? 'border-red-500'
					: 'border-gray-200'} block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
				id="grid-username"
				placeholder="Choose group to update"
			>
				<option value={''} selected
					>{inventoryItems.length == 0 ? 'No Items' : 'Choose Item'}</option
				>
				{#each inventoryItems as item}
					<option value={item._id}>
						{item.name} x{item.quantity} [{item._id}]
					</option>
				{/each}
			</select>
		</div>
	</div>

	{#if selected}
		<InventoryForm
			bind:id
			bind:name
			bind:city
			bind:description
			bind:quantity
			bind:created_on
			bind:status_message
			{handleSubmit}
			button_text={'Update Item'}
			disable_id={true}
		/>
	{/if}
</form>
