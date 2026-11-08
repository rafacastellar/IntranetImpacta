<script lang="ts">
	import { Card, Button } from '$lib/components/ui';
	import { Wrench, PlusCircle, ArrowLeftRight, FileEdit, Sparkles } from 'lucide-svelte';

	interface Props {
		userRole?: string;
		onReportIncident?: () => void;
		onNewNotice?: () => void;
		onNewSubstituicao?: () => void;
		onNewAta?: () => void;
	}

	let {
		userRole = 'Coordenador',
		onReportIncident,
		onNewNotice,
		onNewSubstituicao,
		onNewAta
	}: Props = $props();

	const isCoordOrSecretaria = $derived(userRole === 'Coordenador' || userRole === 'Secretaria');
	const isNdeOrCoord = $derived(userRole === 'NDE' || userRole === 'Coordenador');
</script>

<section class="bg-neutral-white p-4 sm:p-5 rounded-xl border border-neutral-border-light shadow-xs font-sans">
	<div class="flex items-center justify-between mb-3.5">
		<div class="flex items-center gap-2">
			<div class="p-1 rounded-md bg-brand-blue/10 text-brand-blue">
				<Sparkles class="h-4 w-4" />
			</div>
			<h2 class="text-sm font-bold text-brand-dark">Ações Rápidas do Dia</h2>
		</div>
		<span class="text-xs text-neutral-gray-500 hidden sm:inline">Atalhos operacionais rápidos</span>
	</div>

	<div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
		<!-- Reportar Incidente -->
		<Button
			variant="outline"
			class="h-auto py-3 px-3.5 flex-col items-start text-left border-feedback-error/20 bg-feedback-error/5 hover:bg-feedback-error/10 hover:border-feedback-error/40 text-neutral-dark rounded-xl group"
			onclick={onReportIncident}
		>
			<div class="p-2 rounded-lg bg-feedback-error/10 text-feedback-error mb-1.5 group-hover:scale-105 transition">
				<Wrench class="h-4 w-4" />
			</div>
			<span class="text-xs font-bold text-neutral-dark">Reportar Sala</span>
			<span class="text-[11px] text-neutral-gray-500">Projetor, Lab, Wi-Fi</span>
		</Button>

		<!-- Solicitar Substituição -->
		<Button
			variant="outline"
			class="h-auto py-3 px-3.5 flex-col items-start text-left border-neutral-border-light hover:border-brand-blue/40 hover:bg-neutral-surface/50 text-neutral-dark rounded-xl group"
			onclick={onNewSubstituicao}
		>
			<div class="p-2 rounded-lg bg-feedback-warning/10 text-feedback-warning mb-1.5 group-hover:scale-105 transition">
				<ArrowLeftRight class="h-4 w-4" />
			</div>
			<span class="text-xs font-bold text-neutral-dark">Substituição</span>
			<span class="text-[11px] text-neutral-gray-500">Solicitar para aula</span>
		</Button>

		<!-- Novo Comunicado (Visível para Coordenador / Secretaria) -->
		{#if isCoordOrSecretaria}
			<Button
				variant="outline"
				class="h-auto py-3 px-3.5 flex-col items-start text-left border-brand-blue/20 bg-brand-blue/5 hover:bg-brand-blue/10 hover:border-brand-blue/40 text-neutral-dark rounded-xl group"
				onclick={onNewNotice}
			>
				<div class="p-2 rounded-lg bg-brand-blue text-neutral-white mb-1.5 group-hover:scale-105 transition">
					<PlusCircle class="h-4 w-4" />
				</div>
				<span class="text-xs font-bold text-neutral-dark">Novo Comunicado</span>
				<span class="text-[11px] text-neutral-gray-500">Publicar no mural</span>
			</Button>
		{/if}

		<!-- Nova Pauta / Ata (Visível para NDE / Coordenador) -->
		{#if isNdeOrCoord}
			<Button
				variant="outline"
				class="h-auto py-3 px-3.5 flex-col items-start text-left border-brand-purple/20 bg-brand-purple/5 hover:bg-brand-purple/10 hover:border-brand-purple/40 text-neutral-dark rounded-xl group"
				onclick={onNewAta}
			>
				<div class="p-2 rounded-lg bg-brand-purple text-neutral-white mb-1.5 group-hover:scale-105 transition">
					<FileEdit class="h-4 w-4" />
				</div>
				<span class="text-xs font-bold text-neutral-dark">Nova Ata / Pauta</span>
				<span class="text-[11px] text-neutral-gray-500">MEC & NDE</span>
			</Button>
		{/if}
	</div>
</section>

