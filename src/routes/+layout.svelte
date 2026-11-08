<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import AppFooter from '$lib/components/ui/AppFooter.svelte';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen flex flex-col justify-between">
	<div class="flex-1 flex flex-col">
		{@render children()}
	</div>
	<AppFooter />
</div>
