<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import InventoryCard from '$lib/components/InventoryCard.svelte';
	import { getItemById } from '$lib/dao/inventoryDao';
	import type { Message } from '$lib/message';
	import { Status } from '$lib/status';

	export const inventoryItemMessage: Message = getItemById($page.params.id);

	function handleUpdate(): void {
		goto('/inventory/update/' + $page.params.id);
	}

	function handleDelete(): void {
		goto('/inventory/delete/' + $page.params.id);
	}
</script>

<li class="underline hover:no-underline hover:text-blue-800">
	<a href="/inventory/view">Back to All inventory Items.</a>
</li>

{#if inventoryItemMessage.status == Status.SUCCESS && inventoryItemMessage.item}
	<InventoryCard
		id={inventoryItemMessage.item._id}
		name={inventoryItemMessage.item.name}
		city={inventoryItemMessage.item.city}
		description={inventoryItemMessage.item.description}
		quantity={inventoryItemMessage.item.quantity?.toString()}
		created_on={inventoryItemMessage.item.created_on}
		{handleUpdate}
		{handleDelete}
		show_buttons={true}
	/>
{:else}
	<div class="pl-2 flex flex-col md:flex-row">
		<div class="flex-auto p-4 shadow-lg">
			<h3 class="text-lg font-mono pt-2 font-medium">{inventoryItemMessage.message}</h3>
		</div>
	</div>
{/if}
