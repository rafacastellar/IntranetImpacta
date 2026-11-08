<script lang="ts">
	import { Search, X, Filter, Calendar, FileText } from 'lucide-svelte';

	interface Props {
		search: string;
		tipoFilter: string;
		abaAtiva: 'TODAS' | 'AGENDADAS' | 'REALIZADAS';
		totalCount: number;
		filteredCount: number;
	}

	let {
		search = $bindable(''),
		tipoFilter = $bindable('TODAS'),
		abaAtiva = $bindable('TODAS'),
		totalCount,
		filteredCount
	}: Props = $props();

	const tipos = [
		{ label: 'Todos os Tipos', value: 'TODAS' },
		{ label: 'NDE', value: 'NDE' },
		{ label: 'Colegiado', value: 'Colegiado' },
		{ label: 'Docente', value: 'Docente' },
		{ label: 'Geral', value: 'Geral' }
	];
</script>

<div class="bg-neutral-white p-4 sm:p-5 rounded-2xl shadow-xs border border-neutral-border-light mb-6 font-sans space-y-4">
	<!-- Abas Principais: Próximas Pautas vs Atas Históricas -->
	<div class="flex items-center gap-2 border-b border-neutral-border-light pb-3 overflow-x-auto">
		<button
			type="button"
			onclick={() => (abaAtiva = 'TODAS')}
			class={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
				abaAtiva === 'TODAS'
					? 'bg-brand-dark text-neutral-white shadow-xs'
					: 'text-neutral-dark-gray hover:bg-neutral-surface'
			}`}
		>
			Todas ({totalCount})
		</button>

		<button
			type="button"
			onclick={() => (abaAtiva = 'AGENDADAS')}
			class={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
				abaAtiva === 'AGENDADAS'
					? 'bg-brand-purple text-neutral-white shadow-xs'
					: 'text-neutral-dark-gray hover:bg-neutral-surface'
			}`}
		>
			<Calendar class="h-4 w-4" /> Próximas & Pautas Prévias
		</button>

		<button
			type="button"
			onclick={() => (abaAtiva = 'REALIZADAS')}
			class={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
				abaAtiva === 'REALIZADAS'
					? 'bg-feedback-success text-neutral-white shadow-xs'
					: 'text-neutral-dark-gray hover:bg-neutral-surface'
			}`}
		>
			<FileText class="h-4 w-4" /> Atas Homologadas (MEC)
		</button>
	</div>

	<!-- Busca Textual & Contadores -->
	<div class="flex flex-col sm:flex-row gap-3">
		<div class="relative flex-1">
			<Search class="h-4.5 w-4.5 text-neutral-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
			<input
				type="text"
				bind:value={search}
				placeholder="Buscar reunião por título, curso, pauta prévia ou deliberações..."
				class="w-full pl-10 pr-9 py-2.5 rounded-xl border border-neutral-border-light bg-neutral-surface/40 text-xs text-neutral-dark placeholder:text-neutral-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple transition"
			/>
			{#if search}
				<button
					type="button"
					onclick={() => (search = '')}
					class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-gray-400 hover:text-neutral-dark cursor-pointer p-0.5"
					aria-label="Limpar busca"
				>
					<X class="h-4 w-4" />
				</button>
			{/if}
		</div>

		<div class="flex items-center text-xs text-neutral-dark-gray px-1">
			<span>Exibindo <strong>{filteredCount}</strong> de {totalCount} reuniões</span>
		</div>
	</div>

	<!-- Filtro por Tipo de Órgão / Reunião -->
	<div class="flex items-center gap-1.5 overflow-x-auto pt-1 border-t border-neutral-border-light/60">
		<span class="text-[11px] font-bold text-neutral-gray-400 flex items-center gap-1 mr-1 shrink-0">
			<Filter class="h-3 w-3" /> Tipo:
		</span>
		{#each tipos as t}
			{@const isSelected = tipoFilter === t.value}
			<button
				type="button"
				onclick={() => (tipoFilter = t.value)}
				class={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
					isSelected
						? 'bg-brand-blue text-neutral-white shadow-xs'
						: 'bg-neutral-surface text-neutral-dark-gray hover:bg-neutral-border-light/60'
				}`}
			>
				{t.label}
			</button>
		{/each}
	</div>
</div>

