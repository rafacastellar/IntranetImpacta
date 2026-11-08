<script lang="ts">
	import { Card, Badge, Button } from '$lib/components/ui';
	import type { MockAviso } from '$lib/server/mockData';
	import { Bell, AlertOctagon, Wrench, Calendar, ChevronRight } from 'lucide-svelte';

	interface Props {
		avisos?: MockAviso[];
		onSelectAviso?: (aviso: MockAviso) => void;
	}

	let { avisos = [], onSelectAviso }: Props = $props();

	let selectedCategory = $state<string>('TODAS');
	const categories = ['TODAS', 'Infraestrutura', 'Acadêmico', 'Institucional'];

	const filteredAvisos = $derived(
		selectedCategory === 'TODAS'
			? avisos
			: avisos.filter((a) => a.categoria === selectedCategory)
	);

	function getPriorityVariant(prioridade: string) {
		switch (prioridade) {
			case 'URGENTE':
				return 'danger';
			case 'ALTA':
				return 'warning';
			case 'MEDIA':
				return 'primary';
			default:
				return 'default';
		}
	}

	function formatDate(dateStr: string) {
		try {
			return new Intl.DateTimeFormat('pt-BR', {
				day: '2-digit',
				month: '2-digit',
				hour: '2-digit',
				minute: '2-digit'
			}).format(new Date(dateStr));
		} catch {
			return dateStr;
		}
	}
</script>

<div class="flex flex-col gap-3 font-sans">
	<!-- Top Bar do Mural com Filtros de Categoria -->
	<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-1">
		<div class="flex items-center gap-2">
			<Bell class="h-5 w-5 text-brand-blue" />
			<h2 class="text-base font-bold text-brand-dark">Mural de Avisos & Infraestrutura</h2>
		</div>

		<div class="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
			{#each categories as cat}
				<button
					type="button"
					onclick={() => (selectedCategory = cat)}
					class={`px-2.5 py-1 text-xs font-semibold rounded-lg transition whitespace-nowrap cursor-pointer ${
						selectedCategory === cat
							? 'bg-brand-blue text-neutral-white shadow-xs'
							: 'bg-neutral-white border border-neutral-border text-neutral-gray-500 hover:text-neutral-dark'
					}`}
				>
					{cat}
				</button>
			{/each}
		</div>
	</div>

	<!-- Lista de Avisos -->
	<div class="flex flex-col gap-3">
		{#if filteredAvisos.length === 0}
			<Card variant="bordered" padding="md" class="text-center py-8">
				<p class="text-xs text-neutral-gray-500">Nenhum comunicado encontrado nesta categoria.</p>
			</Card>
		{:else}
			{#each filteredAvisos as aviso (aviso.id)}
				<Card
					variant={aviso.prioridade === 'URGENTE' ? 'bordered' : 'default'}
					padding="sm"
					class={`transition-all hover:border-brand-blue/50 hover:shadow-sm cursor-pointer ${
						aviso.prioridade === 'URGENTE' ? 'border-feedback-error/40 bg-feedback-error/5' : ''
					}`}
					onclick={() => onSelectAviso?.(aviso)}
				>
					<div class="flex items-start justify-between gap-2">
						<div class="flex items-center gap-2 flex-wrap">
							<Badge variant={getPriorityVariant(aviso.prioridade)}>
								{#if aviso.prioridade === 'URGENTE'}
									<AlertOctagon class="h-3 w-3" />
								{/if}
								{aviso.prioridade}
							</Badge>
							<span class="text-[11px] font-semibold text-neutral-gray-500">
								{aviso.categoria}
							</span>
						</div>
						<span class="text-[11px] text-neutral-gray-500 shrink-0">
							{formatDate(aviso.data_publicacao)}
						</span>
					</div>

					<h3 class="text-sm font-bold text-neutral-dark mt-2 group-hover:text-brand-blue">
						{aviso.titulo}
					</h3>

					<p class="text-xs text-neutral-text/90 mt-1 line-clamp-2 content-short leading-relaxed">
						{aviso.conteudo}
					</p>

					<div class="flex items-center justify-between pt-2.5 mt-2 border-t border-neutral-border-light text-[11px] text-neutral-gray-500">
						<span>Por: <strong class="font-semibold text-neutral-dark">{aviso.autor}</strong></span>
						<span class="inline-flex items-center text-brand-blue font-semibold gap-0.5">
							Ver detalhes <ChevronRight class="h-3.5 w-3.5" />
						</span>
					</div>
				</Card>
			{/each}
		{/if}
	</div>
</div>

