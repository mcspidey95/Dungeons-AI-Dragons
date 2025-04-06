<script>
	import { openDB, getAllPrisoners, savePrisoner, clearAllPrisoners} from '$lib';
	let key = '';
	let value = null;
	let error = '';

	function loadData() {
		error = '';
		try {
			const raw = localStorage.getItem(key);
			if (!raw) {
				value = null;
				error = 'No data found for this key.';
			} else {
				value = JSON.parse(raw);
			}
		} catch (e) {
			value = null;
			error = 'Error parsing JSON.';
		}
	}

	function clearLocalStorage() {
	localStorage.clear();
	console.log('LocalStorage cleared!');
}

</script>

<style>
	textarea {
		width: 100%;
		height: 200px;
		margin-top: 10px;
		resize: none;
		font-family: monospace;
	}
	.clear-btn {
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		background-color: #ff4d4f;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}
	.clear-btn:hover {
		background-color: #d9363e;
	}

</style>

<h2>🔍 LocalStorage Viewer</h2>

<input
	placeholder="Enter key (e.g. endgame, prisoner1)"
	bind:value={key}
	on:keydown={(e) => e.key === 'Enter' && loadData()}
/>
<button on:click={loadData}>Load</button>

<button on:click={clearLocalStorage} class="clear-btn">
	Clear LocalStorage
</button>


<button on:click={clearAllPrisoners} class="clear-btn">
	Clear All Prisoners
</button>


{#if error}
	<p style="color: red">{error}</p>
{:else if value}
	<textarea readonly>{JSON.stringify(value, null, 2)}</textarea>
{/if}
