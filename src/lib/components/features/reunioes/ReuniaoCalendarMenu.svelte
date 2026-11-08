<script lang="ts">
	import { Calendar, Download, ExternalLink } from 'lucide-svelte';
	import type { ReuniaoItem } from '$lib/types/reunioesAtas';
	import { getGoogleCalendarUrl, getOutlookCalendarUrl, downloadIcsFile } from '$lib/utils/calendar';

	interface Props {
		reuniao: ReuniaoItem;
	}

	let { reuniao }: Props = $props();
	let isOpen = $state(false);
</script>

<div class="relative font-sans">
	<button
		type="button"
		onclick={() => (isOpen = !isOpen)}
		class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-border-light bg-neutral-white hover:bg-neutral-surface text-xs font-semibold text-neutral-dark transition shadow-xs cursor-pointer"
	>
		<Calendar class="h-3.5 w-3.5 text-brand-purple" />
		Adicionar à Agenda
	</button>

	{#if isOpen}
		<div class="absolute left-0 bottom-full mb-1 w-48 rounded-xl bg-neutral-white shadow-xl border border-neutral-border-light py-1 z-30 font-sans text-xs">
			<a href={getGoogleCalendarUrl(reuniao)} target="_blank" rel="noreferrer" onclick={() => (isOpen = false)} class="flex items-center gap-2 px-3 py-2 hover:bg-neutral-surface text-neutral-dark">
				<ExternalLink class="h-3.5 w-3.5 text-brand-blue" /> Google Calendar
			</a>
			<a href={getOutlookCalendarUrl(reuniao)} target="_blank" rel="noreferrer" onclick={() => (isOpen = false)} class="flex items-center gap-2 px-3 py-2 hover:bg-neutral-surface text-neutral-dark">
				<ExternalLink class="h-3.5 w-3.5 text-brand-blue" /> Outlook Calendar
			</a>
			<button type="button" onclick={() => { downloadIcsFile(reuniao); isOpen = false; }} class="w-full text-left flex items-center gap-2 px-3 py-2 hover:bg-neutral-surface text-neutral-dark cursor-pointer">
				<Download class="h-3.5 w-3.5 text-neutral-gray-500" /> Baixar arquivo .ICS
			</button>
		</div>
		<button type="button" class="fixed inset-0 z-20 bg-transparent cursor-default" onclick={() => (isOpen = false)} aria-label="Fechar"></button>
	{/if}
</div>

