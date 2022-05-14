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
	import { getAllItems } from '$lib/dao/inventoryDao';
	import type { Inventory } from '$lib/models/inventory';
	import InventoryCard from '$lib/components/InventoryCard.svelte';
	import { getCachedWeatherDescription } from '$lib/dao/weatherDao';
	// import { getWeatherDescription } from '$lib/services/openweather';

	export let inventoryItems: Inventory[];

	const MAX_CARDS = 10;
</script>

Inventory has {inventoryItems.length} items.

<div class="pl-2 flex flex-col flex-wrap md:flex-row">
	{#each inventoryItems.slice(0, MAX_CARDS) as item}
		<InventoryCard
			bind:id={item._id}
			bind:name={item.name}
			bind:city={item.city}
			bind:description={item.description}
			bind:quantity={item.quantity}
			bind:created_on={item.created_on}
		/>
	{/each}
</div>

<div class="p-4 m-4">
	<span class="text-lg font-mono pt-2 font-bold">Table view</span>
</div>

<table class="table-auto border-collapse border border-slate-500">
	<thead>
		<tr>
			<th class="border border-slate-600 p-4 text-left">ID</th>
			<th class="border border-slate-600 p-4 text-left">Name</th>
			<th class="border border-slate-600 p-4 text-left">City</th>
			<th class="border border-slate-600 p-4 text-left">Weather</th>
			<th class="border border-slate-600 p-4 text-left">Description</th>
			<th class="border border-slate-600 p-4 text-left">Qty.</th>
			<th class="border border-slate-600 p-4 text-left">Created on</th>
			<th class="border border-slate-600 p-4 text-left">View</th>
			<th class="border border-slate-600 p-4 text-left">Update</th>
			<th class="border border-slate-600 p-4 text-left">Delete</th>
		</tr>
	</thead>
	<tbody>
		{#each inventoryItems as item}
			<tr>
				<td class="border border-slate-700 p-2 text-left">{item._id}</td>
				<td class="border border-slate-700 p-2 text-left">{item.name}</td>
				<td class="border border-slate-700 p-2 text-left">{item.city}</td>
				<td class="border border-slate-700 p-2 text-left">{#await getCachedWeatherDescription(item.city) then value}{value}{/await}</td>
				<td class="border border-slate-700 p-2 text-left">{item.description}</td>
				<td class="border border-slate-700 p-2 text-left">{item.quantity}</td>
				<td class="border border-slate-700 p-2 text-left">{item.created_on}</td>
				<td class="border border-slate-700 p-2 text-left"
					><a
						class="underline hover:no-underline hover:text-blue-800"
						href="/inventory/view/{item._id}">View</a
					></td
				>
				<td class="border border-slate-700 p-2 text-left"
					><a
						class="underline hover:no-underline hover:text-blue-800"
						href="/inventory/update/{item._id}">Update</a
					></td
				>
				<td class="border border-slate-700 p-2 text-left"
					><a
						class="underline hover:no-underline hover:text-red-800"
						href="/inventory/delete/{item._id}">Delete</a
					></td
				>
			</tr>
		{/each}
	</tbody>
</table>
