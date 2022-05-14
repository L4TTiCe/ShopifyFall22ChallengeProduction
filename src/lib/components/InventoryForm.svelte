<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';
	import { getAvailableCities } from '$lib/dao/citiesDao';

	export let id: string;
	export let name: string;
	export let city: string;
	export let description: string;
	export let quantity: string;
	export let created_on: string;

	export let status_message: string;

	export let handleSubmit: any;
	export let button_text: string;

	export let disable_id = false;

	/**
	 * Generates a new ID for the Inventory Item.
	 */
	function generateID() {
		id = uuidv4();
	}

	const availableCities: string[] = getAvailableCities();
</script>
<!-- 
	@component
	A form that shows all relavant details about an Inventory Item.

	Usage:
	```tsx
	<InventoryForm
		bind:id
		bind:name
		bind:city
		bind:description
		bind:quantity
		bind:created_on
		bind:status_message
		{handleSubmit}
		button_text={'Update Item'}  // What the submit button should read
		disable_id={true}	// If the ID of the object should be editable
	/>
	```
 -->

<form class="w-full max-w-lg mx-4">
	<div class="flex flex-wrap -mx-3 mb-6">
		<div class="w-full px-3">
			<label
				class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
				for="grid-id"
			>
				ID
			</label>
			<input
				bind:value={id}
				disabled={disable_id}
				class="{id == ''
					? 'border-red-500'
					: 'border-gray-200'} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
				id="grid-username"
				type="text"
				placeholder="b920acea-3828-4f42-80d2-b2743c99fd65"
			/>
			{#if !disable_id}
				<button
					on:click={generateID}
					class="block shadow tracking-wide bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
					type="button"
				>
					Generate ID
				</button>
				<p class="text-gray-600 text-xs italic">Make it as unique as yourself!</p>
			{:else}
				<p class="text-red-500 text-xs italic ">ID cannot be updated.</p>
			{/if}
			{#if id == ''}
				<p class="text-red-500 text-xs italic ">Please fill out this field.</p>
			{/if}
		</div>
	</div>
	<div class="flex flex-wrap -mx-3 mb-6">
		<div class="w-full px-3">
			<label
				class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
				for="grid-name"
			>
				Name
			</label>
			<input
				bind:value={name}
				class="{name == ''
					? 'border-red-500'
					: 'border-gray-200'} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
				id="grid-name"
				type="text"
				placeholder="Iron"
			/>
			<p class="text-gray-600 text-xs italic">Your Item's Name</p>
			{#if name == ''}
				<p class="text-red-500 text-xs italic ">Consider filling out this field.</p>
			{/if}
		</div>
	</div>
	<div class="flex flex-wrap -mx-3 mb-6">
		<div class="w-full px-3">
			<label
				class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
				for="grid-city"
			>
				City
			</label>
			<select
				bind:value={city}
				class="{!city
					? 'border-red-500'
					: 'border-gray-200'} block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
				id="grid-username"
				placeholder="Choose City"
			>
				<option value={''} selected hidden disabled
					>{availableCities.length == 0 ? 'No Cities' : 'Choose City'}</option
				>
				{#each availableCities as item}
					<option value={item}>
						{item}
					</option>
				{/each}
			</select>
			{#if city == ''}
				<p class="text-red-500 text-xs italic ">Please fill out this field.</p>
			{/if}
		</div>
	</div>
	<div class="flex flex-wrap -mx-3 mb-6">
		<div class="w-full px-3">
			<label
				class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
				for="grid-description"
			>
				Description
			</label>
			<input
				bind:value={description}
				class="{description == ''
					? 'border-red-500'
					: 'border-gray-200'} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
				id="grid-name"
				type="text"
				placeholder="A 500x500 Sheet"
			/>
			<p class="text-gray-600 text-xs italic">Your Item's Description</p>
		</div>
	</div>

	<div class="flex flex-wrap -mx-3 mb-6">
		<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
			<label
				class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
				for="grid-qty"
			>
				Quantity
			</label>
			<input
				bind:value={quantity}
				type="number"
				min="0"
				max="100000"
				class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
				id="grid-qty"
				placeholder="0"
			/>
		</div>
		<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
			<label
				class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
				for="grid-procured"
			>
				Date Created
			</label>
			<input
				bind:value={created_on}
				type="datetime-local"
				class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
				id="grid-procured"
			/>
		</div>
	</div>

	<div class="content-center -mx-3 mb-6">
		<div class="px-3">
			<button
				on:click={handleSubmit}
				class="block shadow tracking-wide bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
				type="button"
			>
				{button_text}
			</button>
			{#if status_message != ''}
				<p class="text-red-500 text-s italic ">{status_message}</p>
			{/if}
		</div>
	</div>
</form>
