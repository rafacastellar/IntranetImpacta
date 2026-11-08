<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { CheckCircle2, Clock, Users, User, Calendar, Eye } from 'lucide-svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { ComunicadoItem } from '$lib/types/impactaDirect';

	interface Props {
		comunicado: ComunicadoItem;
		onViewLeituras: (c: ComunicadoItem) => void;
	}

	let { comunicado, onViewLeituras }: Props = $props();
	let isSubmitting = $state(false);

	function formatDateTime(iso: string) {
		try {
			const d = new Date(iso);
			return d.toLocaleString('pt-BR', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			});
		} catch {
			return iso;
		}
	}

	function getTargetBadge(c: ComunicadoItem) {
		if (c.alvo_tipo === 'PERFIL') {
			return { label: `Perfil: ${c.perfil_alvo?.nome || 'Específico'}`, color: 'bg-brand-purple/15 text-brand-purple border-brand-purple/30' };
		}
		if (c.alvo_tipo === 'CURSO') {
			return { label: `Curso: ${c.curso_alvo?.codigo || c.curso_alvo?.nome || 'Específico'}`, color: 'bg-brand-blue/15 text-brand-blue border-brand-blue/30' };
		}
		if (c.alvo_tipo === 'TURMA') {
			return { label: `Turma: ${c.turma_alvo?.codigo || 'Específica'}`, color: 'bg-brand-cyan/20 text-brand-blue-dark border-brand-cyan/40' };
		}
		return { label: 'Todos os Docentes', color: 'bg-brand-dark/10 text-brand-dark border-brand-dark/20' };
	}

	const targetInfo = $derived(getTargetBadge(comunicado));
</script>

<div class="bg-neutral-white rounded-2xl p-5 border border-neutral-border-light shadow-xs hover:shadow-md transition font-sans flex flex-col justify-between">
	<div>
		<!-- Cabeçalho do Card: Público Alvo e Data -->
		<div class="flex flex-wrap items-center justify-between gap-2 mb-3">
			<span class={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-lg border ${targetInfo.color}`}>
				{targetInfo.label}
			</span>
			<span class="text-[11px] text-neutral-gray-400 flex items-center gap-1">
				<Calendar class="h-3 w-3" /> {formatDateTime(comunicado.data_envio)}
			</span>
		</div>

		<!-- Título do Comunicado -->
		<h3 class="text-sm font-bold text-brand-dark leading-snug">
			{comunicado.titulo}
		</h3>

		<!-- Mensagem -->
		<p class="text-xs text-neutral-dark-gray mt-2 leading-relaxed whitespace-pre-line">
			{comunicado.mensagem}
		</p>

		<!-- Remetente -->
		<div class="mt-3 pt-2.5 border-t border-neutral-border-light/60 flex items-center gap-1.5 text-xs text-neutral-dark-gray">
			<User class="h-3.5 w-3.5 text-brand-cyan" />
			<span>Enviado por: <strong>{comunicado.remetente?.nome || 'Coordenação'}</strong></span>
		</div>
	</div>

	<!-- Rodapé: Confirmação de Leitura & Estatísticas -->
	<div class="mt-4 pt-3 border-t border-neutral-border-light flex flex-col sm:flex-row sm:items-center justify-between gap-3">
		<!-- Status Individual do Usuário -->
		<div>
			{#if comunicado.lido_pelo_usuario}
				<div class="inline-flex items-center gap-1.5 text-xs font-semibold text-feedback-success bg-feedback-success/10 px-3 py-1.5 rounded-xl border border-feedback-success/20">
					<CheckCircle2 class="h-4 w-4 shrink-0" />
					<span>Leitura confirmada ({formatDateTime(comunicado.lido_em_usuario || '')})</span>
				</div>
			{:else}
				<form
					method="POST"
					action="?/confirmarLeitura"
					use:enhance={() => {
						isSubmitting = true;
						return async ({ update }) => {
							isSubmitting = false;
							await invalidateAll();
							await update();
						};
					}}
				>
					<input type="hidden" name="comunicado_id" value={comunicado.id} />
					<Button variant="primary" size="sm" type="submit" disabled={isSubmitting}>
						{#snippet leftIcon()}
							<CheckCircle2 class="h-4 w-4" />
						{/snippet}
						{isSubmitting ? 'Confirmando...' : 'Confirmar Leitura'}
					</Button>
				</form>
			{/if}
		</div>

		<!-- Métrica Coletiva de Confirmação -->
		<div class="flex items-center gap-2">
			<button
				type="button"
				onclick={() => onViewLeituras(comunicado)}
				class="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:text-brand-dark transition cursor-pointer px-2.5 py-1.5 rounded-xl hover:bg-neutral-surface"
			>
				<Eye class="h-3.5 w-3.5" />
				<span>{comunicado.total_leituras || 0} confirmações</span>
			</button>
		</div>
	</div>
</div>

