<script lang="ts">
	import { page } from '$app/stores';
	import { getItemById, deleteInventoryById } from '$lib/dao/inventoryDao';
	import type { Message } from '$lib/message';
	import { Status } from '$lib/status';
	import { goto } from '$app/navigation';
	import InventoryCard from '$lib/components/InventoryCard.svelte';

	export const inventoryItemMessage: Message = getItemById($page.params.id);

	let id = '';
	let name = '';
	let city = '';
	let description = '';

	let quantity = '';
	let created_on = new Date().toISOString().slice(0, 16);

	let deletion_comment = '';

	if (inventoryItemMessage.item) {
		id = inventoryItemMessage.item._id;
		if (inventoryItemMessage.item.name) {
			name = inventoryItemMessage.item.name;
		}
		if (inventoryItemMessage.item.city) {
			city = inventoryItemMessage.item.city;
		}
		if (inventoryItemMessage.item.description) {
			description = inventoryItemMessage.item.description;
		}
		if (inventoryItemMessage.item.quantity) {
			quantity = inventoryItemMessage.item.quantity.toString();
		}
		if (inventoryItemMessage.item.created_on) {
			created_on = inventoryItemMessage.item.created_on;
		}
	}

	function handleDelete(): void {
		const result = deleteInventoryById(id, deletion_comment);
		alert(result.message);
		if (result.status == Status.SUCCESS) {
			goto('/inventory/view');
		} else {
			console.log(result);
		}
	}
</script>

<h2 class="text-2xl m-4">Delete Item</h2>

{#if inventoryItemMessage.status == Status.SUCCESS && inventoryItemMessage.item}
	<form class="w-full max-w-lg mx-4">
		<div class="flex flex-wrap -mx-3 mb-6">
			<InventoryCard bind:id bind:name bind:city bind:description bind:quantity bind:created_on />

			<form class="w-full max-w-lg mx-4 my-4">
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full px-3">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-id"
						>
							Reason for Deletion
						</label>
						<input
							bind:value={deletion_comment}
							class="{deletion_comment == ''
								? 'border-red-500'
								: 'border-gray-200'} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="grid-comment"
							type="text"
							placeholder="Created by mistake."
						/>
						<p class="text-gray-600 text-xs italic">Enter reason for deletion.</p>
						{#if id == ''}
							<p class="text-red-500 text-xs italic ">Please fill out this field.</p>
						{/if}
					</div>
				</div>

				<div class="content-center my-4 -mx-3">
					<div class="px-3">
						<button
							on:click={handleDelete}
							class="block shadow tracking-wide bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
							type="button"
						>
							Delete
						</button>
					</div>
				</div>
			</form>
		</div>
	</form>
{:else}
	<div class="pl-2 flex flex-col md:flex-row">
		<div class="flex-auto p-4 shadow-lg">
			<h3 class="text-lg font-mono pt-2 font-medium">{inventoryItemMessage.message}</h3>
		</div>
	</div>
{/if}
