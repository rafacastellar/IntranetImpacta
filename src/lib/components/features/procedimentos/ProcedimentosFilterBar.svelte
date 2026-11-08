<script lang="ts">
	import { Search, X, Tag } from 'lucide-svelte';
	import type { CategoriaDocumento } from '$lib/types/procedimentos';

	interface Props {
		search: string;
		categoriaFilter: string;
		categorias: CategoriaDocumento[];
		totalCount: number;
		filteredCount: number;
	}

	let {
		search = $bindable(''),
		categoriaFilter = $bindable('TODAS'),
		categorias = [],
		totalCount,
		filteredCount
	}: Props = $props();

	const quickTags = ['reembolso', 'PAI', 'sabática', 'Sesc', 'Hub Academia', 'MEC', 'notas'];

	function toggleQuickTag(tag: string) {
		if (search.toLowerCase() === tag.toLowerCase()) {
			search = '';
		} else {
			search = tag;
		}
	}
</script>

<div class="bg-neutral-white p-4 sm:p-5 rounded-2xl shadow-xs border border-neutral-border-light mb-6 font-sans space-y-4">
	<!-- Barra de Busca Textual -->
	<div class="flex flex-col sm:flex-row gap-3">
		<div class="relative flex-1">
			<Search class="h-4.5 w-4.5 text-neutral-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
			<input
				type="text"
				bind:value={search}
				placeholder="Buscar por palavras-chave (ex: reembolso, PAI, sabática, Sesc, MEC, notas...)"
				class="w-full pl-10 pr-9 py-2.5 rounded-xl border border-neutral-border-light bg-neutral-surface/40 text-xs text-neutral-dark placeholder:text-neutral-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition"
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
			<span>Exibindo <strong>{filteredCount}</strong> de {totalCount} documentos</span>
		</div>
	</div>

	<!-- Pílulas Rápidas de Palavras-Chave -->
	<div class="flex items-center gap-1.5 flex-wrap pt-1">
		<span class="text-[11px] font-bold text-neutral-gray-400 flex items-center gap-1 mr-1">
			<Tag class="h-3 w-3" /> Sugestões:
		</span>
		{#each quickTags as tag}
			{@const isSelected = search.toLowerCase() === tag.toLowerCase()}
			<button
				type="button"
				onclick={() => toggleQuickTag(tag)}
				class={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
					isSelected
						? 'bg-brand-blue text-neutral-white shadow-xs'
						: 'bg-neutral-surface text-neutral-dark hover:bg-neutral-border-light/60'
				}`}
			>
				#{tag}
			</button>
		{/each}
	</div>

	<!-- Filtro por Categorias -->
	<div class="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-neutral-border-light/60">
		<button
			type="button"
			onclick={() => (categoriaFilter = 'TODAS')}
			class={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
				categoriaFilter === 'TODAS'
					? 'bg-brand-dark text-neutral-white shadow-xs'
					: 'bg-neutral-surface text-neutral-dark-gray hover:bg-neutral-border-light/60'
			}`}
		>
			Todas as Categorias
		</button>

		{#each categorias as cat}
			{@const isSelected = String(cat.id) === categoriaFilter}
			<button
				type="button"
				onclick={() => (categoriaFilter = String(cat.id))}
				class={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
					isSelected
						? 'bg-brand-blue text-neutral-white shadow-xs'
						: 'bg-neutral-surface text-neutral-dark-gray hover:bg-neutral-border-light/60'
				}`}
			>
				{cat.nome}
			</button>
		{/each}
	</div>
</div>

