<script>
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
</script>

<style>
	textarea {
		width: 100%;
		height: 200px;
		margin-top: 10px;
		resize: none;
		font-family: monospace;
	}
</style>

<h2>🔍 LocalStorage Viewer</h2>

<input
	placeholder="Enter key (e.g. endgame, prisoner1)"
	bind:value={key}
	on:keydown={(e) => e.key === 'Enter' && loadData()}
/>
<button on:click={loadData}>Load</button>

{#if error}
	<p style="color: red">{error}</p>
{:else if value}
	<textarea readonly>{JSON.stringify(value, null, 2)}</textarea>
{/if}
