<script lang="ts">
	import { ArrowLeft, Send, CheckCircle2, Clock, Users, Plus } from 'lucide-svelte';
	import Button from '$lib/components/ui/Button.svelte';

	interface Props {
		total: number;
		pendentes: number;
		totalLeituras: number;
		canSend?: boolean;
		onOpenNovoModal?: () => void;
	}

	let {
		total,
		pendentes,
		totalLeituras,
		canSend = true,
		onOpenNovoModal
	}: Props = $props();
</script>

<div class="mb-6 font-sans">
	<div class="flex items-center justify-between mb-3">
		<a
			href="/"
			class="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-gray-500 hover:text-brand-blue transition"
		>
			<ArrowLeft class="h-4 w-4" /> Voltar ao Painel Principal
		</a>
		<span class="text-xs font-medium text-neutral-gray-400">Coordenação & Gestão Docente</span>
	</div>

	<div class="bg-brand-dark rounded-2xl p-6 text-neutral-white shadow-xl border border-brand-cyan/20">
		<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
			<div class="flex items-center gap-3">
				<div class="h-10 w-10 rounded-xl bg-brand-blue/30 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan shrink-0">
					<Send class="h-5 w-5" />
				</div>
				<div>
					<div class="flex items-center gap-2">
						<h1 class="text-xl sm:text-2xl font-bold tracking-tight">Impacta Direct</h1>
						<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
							Segmentado
						</span>
					</div>
					<p class="text-xs sm:text-sm text-neutral-surface mt-0.5">
						Envio de comunicados, pautas e convites com segmentação por público e confirmação de leitura em tempo real.
					</p>
				</div>
			</div>

			{#if canSend && onOpenNovoModal}
				<div class="flex items-center gap-3 shrink-0">
					<Button variant="primary" size="md" onclick={onOpenNovoModal}>
						{#snippet leftIcon()}
							<Plus class="h-4 w-4" />
						{/snippet}
						Nova Mensagem
					</Button>
				</div>
			{/if}
		</div>

		<!-- Indicadores de Desempenho e Leitura -->
		<div class="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-brand-dark-surface/60">
			<div class="flex items-center gap-2">
				<Send class="h-4 w-4 text-brand-cyan shrink-0" />
				<span class="text-xs text-neutral-surface">
					<strong>{total}</strong> comunicados enviados
				</span>
			</div>
			<div class="flex items-center gap-2">
				<CheckCircle2 class="h-4 w-4 text-feedback-success shrink-0" />
				<span class="text-xs text-neutral-surface">
					<strong>{totalLeituras}</strong> confirmações registradas
				</span>
			</div>
			<div class="flex items-center gap-2">
				<Clock class="h-4 w-4 text-feedback-warning shrink-0" />
				<span class="text-xs text-neutral-surface">
					<strong>{pendentes}</strong> pendentes de leitura
				</span>
			</div>
		</div>
	</div>
</div>

