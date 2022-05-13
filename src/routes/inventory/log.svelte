<script context="module">
	export async function load() {
		const LogEntries = getAllEntries();
		return {
			props: {
				LogEntries
			}
		};
	}
</script>

<script lang="ts">
	import { getAllEntries, revertDeletionById, purgeLogById } from '$lib/dao/deletionLogDao';
	import type { DeletedInventory } from '$lib/models/deleteLog';

	export let LogEntries: DeletedInventory[];

	function refreshData() {
		LogEntries = getAllEntries();
	}

	function handleRestore(id: string) {
		const result = revertDeletionById(id);
		refreshData();
		alert(result.message);
	}

	function handleDelete(id: string) {
		const result = purgeLogById(id);
		refreshData();
		alert(result.message);
	}
</script>

Deletion log has {LogEntries.length} entries.

<div class="p-4 m-4">
	<span class="text-lg font-mono pt-2 font-bold">Table view</span>
</div>

<table class="table-auto border-collapse border border-slate-500">
	<thead>
		<tr>
			<th class="border border-slate-600 p-4 text-left">ID</th>
			<th class="border border-slate-600 p-4 text-left">Name</th>
			<th class="border border-slate-600 p-4 text-left">Description</th>
			<th class="border border-slate-600 p-4 text-left">Qty.</th>
			<th class="border border-slate-600 p-4 text-left">Created on</th>
			<th class="border border-slate-600 p-4 text-left">Delete Comment</th>
			<th class="border border-slate-600 p-4 text-left">Deleted on</th>
			<th class="border border-slate-600 p-4 text-left">Restore</th>
			<th class="border border-slate-600 p-4 text-left">Delete</th>
		</tr>
	</thead>
	<tbody>
		{#each LogEntries as entry}
			<tr>
				<td class="border border-slate-700 p-2 text-left">{entry.item._id}</td>
				<td class="border border-slate-700 p-2 text-left">{entry.item.name}</td>
				<td class="border border-slate-700 p-2 text-left">{entry.item.description}</td>
				<td class="border border-slate-700 p-2 text-left">{entry.item.quantity}</td>
				<td class="border border-slate-700 p-2 text-left">{entry.item.created_on}</td>
				<td class="border border-slate-700 p-2 text-left">{entry.deletion_comment}</td>
				<td class="border border-slate-700 p-2 text-left"
					>{entry.deleted_on.toISOString().slice(0, 16)}</td
				>
				<td class="border border-slate-700 p-2 text-left">
					<span
						class="underline hover:no-underline hover:text-blue-800"
						on:click={() => {
							handleRestore(entry.item._id);
						}}>Restore</span
					>
				</td>
				<td class="border border-slate-700 p-2 text-left">
					<span
						class="underline hover:no-underline hover:text-red-800"
						on:click={() => {
							handleDelete(entry.item._id);
						}}>Delete</span
					>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
