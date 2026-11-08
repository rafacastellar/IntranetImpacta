<script lang="ts">
	import { Search, X, Filter } from 'lucide-svelte';

	interface Props {
		search: string;
		tipoFilter: string;
		statusFilter: string;
		totalCount: number;
		filteredCount: number;
	}

	let {
		search = $bindable(''),
		tipoFilter = $bindable('TODOS'),
		statusFilter = $bindable('TODOS'),
		totalCount,
		filteredCount
	}: Props = $props();

	const tipos = [
		{ label: 'Todos os Públicos', value: 'TODOS' },
		{ label: 'Por Perfil (NDE / Professores)', value: 'PERFIL' },
		{ label: 'Por Curso', value: 'CURSO' },
		{ label: 'Por Turma', value: 'TURMA' }
	];

	const statusOptions = [
		{ label: 'Todos os Status', value: 'TODOS' },
		{ label: 'Pendentes de Leitura', value: 'PENDENTES' },
		{ label: 'Leitura Confirmada', value: 'LIDOS' }
	];
</script>

<div class="bg-neutral-white p-4 sm:p-5 rounded-2xl shadow-xs border border-neutral-border-light mb-6 font-sans space-y-3.5">
	<!-- Busca Textual -->
	<div class="flex flex-col sm:flex-row gap-3">
		<div class="relative flex-1">
			<Search class="h-4.5 w-4.5 text-neutral-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
			<input
				type="text"
				bind:value={search}
				placeholder="Buscar por assunto, mensagem ou remetente..."
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
			<span>Exibindo <strong>{filteredCount}</strong> de {totalCount} comunicados</span>
		</div>
	</div>

	<!-- Filtros por Segmentação e Status -->
	<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-neutral-border-light/60">
		<div class="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
			<span class="text-[11px] font-bold text-neutral-gray-400 flex items-center gap-1 mr-1 shrink-0">
				<Filter class="h-3 w-3" /> Público:
			</span>
			{#each tipos as tipo}
				{@const isSelected = tipoFilter === tipo.value}
				<button
					type="button"
					onclick={() => (tipoFilter = tipo.value)}
					class={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
						isSelected
							? 'bg-brand-blue text-neutral-white shadow-xs'
							: 'bg-neutral-surface text-neutral-dark-gray hover:bg-neutral-border-light/60'
					}`}
				>
					{tipo.label}
				</button>
			{/each}
		</div>

		<div class="flex items-center gap-1.5 shrink-0">
			{#each statusOptions as opt}
				{@const isSelected = statusFilter === opt.value}
				<button
					type="button"
					onclick={() => (statusFilter = opt.value)}
					class={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
						isSelected
							? 'bg-brand-dark text-neutral-white shadow-xs'
							: 'bg-neutral-surface text-neutral-dark hover:bg-neutral-border-light/60'
					}`}
				>
					{opt.label}
				</button>
			{/each}
		</div>
	</div>
</div>

