<script lang="ts">
	import { ArrowLeft, BookOpen, ShieldCheck, Plus, Sparkles } from 'lucide-svelte';
	import Button from '$lib/components/ui/Button.svelte';

	interface Props {
		total: number;
		onOpenNovoModal?: () => void;
		canCreate?: boolean;
	}

	let { total, onOpenNovoModal, canCreate = false }: Props = $props();
</script>

<div class="mb-6 font-sans">
	<div class="flex items-center justify-between mb-3">
		<a
			href="/"
			class="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-gray-500 hover:text-brand-blue transition"
		>
			<ArrowLeft class="h-4 w-4" /> Voltar ao Painel Principal
		</a>
		<span class="text-xs font-medium text-neutral-gray-400">Repositório Institucional & MEC</span>
	</div>

	<div class="bg-brand-dark rounded-2xl p-6 text-neutral-white shadow-xl border border-brand-cyan/20">
		<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
			<div>
				<div class="flex items-center gap-2.5">
					<div class="h-10 w-10 rounded-xl bg-brand-blue/30 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan shrink-0">
						<BookOpen class="h-5 w-5" />
					</div>
					<div>
						<h1 class="text-xl sm:text-2xl font-bold tracking-tight">Base de Procedimentos e Políticas</h1>
						<p class="text-xs sm:text-sm text-neutral-surface mt-0.5">
							Tutoriais operacionais, guias de avaliação, manuais regulatórios MEC e políticas de benefícios docentes.
						</p>
					</div>
				</div>
			</div>

			<div class="flex items-center gap-3">
				{#if canCreate && onOpenNovoModal}
					<Button variant="primary" size="md" onclick={onOpenNovoModal}>
						{#snippet leftIcon()}
							<Plus class="h-4 w-4" />
						{/snippet}
						Novo Tutorial
					</Button>
				{/if}
			</div>
		</div>

		<!-- Mini Destaques / Indicadores -->
		<div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-brand-dark-surface/60">
			<div class="flex items-center gap-2">
				<ShieldCheck class="h-4 w-4 text-brand-cyan shrink-0" />
				<span class="text-xs text-neutral-surface">
					<strong>{total}</strong> documentos homologados
				</span>
			</div>
			<div class="flex items-center gap-2">
				<Sparkles class="h-4 w-4 text-feedback-warning shrink-0" />
				<span class="text-xs text-neutral-surface">Busca por palavras-chave</span>
			</div>
			<div class="hidden sm:flex items-center gap-2">
				<span class="h-2 w-2 rounded-full bg-feedback-success shrink-0"></span>
				<span class="text-xs text-neutral-surface">Diretrizes 2026 Vigentes</span>
			</div>
		</div>
	</div>
</div>

