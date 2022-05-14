<script lang="ts">
	import { getWeatherDescription } from '$lib/services/openweather';

	export let id: string;
	export let name: string | undefined;
	export let city: string;
	export let description: string | undefined;
	export let quantity: number | string | undefined;
	export let created_on: string | undefined;

	export let show_buttons = false;
	export let handleUpdate: any = null;
	export let handleDelete: any = null;

	let weather = '';

	async function populateWeather() {
		weather = await getWeatherDescription(city);
	}

	populateWeather()
</script>

<!-- 
	@component
	A styled card showing an Inventory Item's details

	Usage:
	```tsx
	<InventoryCard
		id={inventoryItem_id}
		name={inventoryItem.name}
		description={inventoryItem.description}
		quantity={inventoryItem.quantity?.toString()}
		created_on={inventoryItem.created_on}
		show_buttons={true}  // optional
		{handleUpdate}		// optional
		{handleDelete}		// optional
	/>
	```
 -->

<div class="flex-auto p-4 shadow-lg">
	<h3 class="text-lg font-mono pt-2 font-medium">{name}</h3>
	<ul class="pl-4">
		<li class="underline hover:no-underline hover:text-blue-800">
			<a href="/inventory/view/{id}">ID: {id}</a>
		</li>
		<li>
			<span>City: {city}</span>
		</li>
		<li>
			<span>Weather: {weather}</span>
		</li>
		<li>
			<span>Description: {description}</span>
		</li>
		<li>
			<span>Qty: {quantity?.toString()}</span>
		</li>
		<li>
			<span>Created on: {created_on}</span>
		</li>
	</ul>
	{#if show_buttons}
		<div class="inline-flex">
			<button
				on:click={handleUpdate}
				class="block shadow tracking-wide bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 m-2"
				type="button"
			>
				Update
			</button>
			<button
				on:click={handleDelete}
				class="block shadow tracking-wide bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 m-2"
				type="button"
			>
				Delete
			</button>
		</div>
	{/if}
</div>
