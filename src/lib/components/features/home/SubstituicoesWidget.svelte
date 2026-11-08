<script lang="ts">
	import { Card, Badge, Button } from '$lib/components/ui';
	import type { MockSubstituicao } from '$lib/server/mockData';
	import { ArrowLeftRight, Clock, MapPin, CheckCircle, ChevronRight } from 'lucide-svelte';

	interface Props {
		substituicoes?: MockSubstituicao[];
		onRequestSubstituicao?: () => void;
	}

	let { substituicoes = [], onRequestSubstituicao }: Props = $props();
</script>

<div class="flex flex-col gap-3 font-sans">
	<div class="flex items-center justify-between pb-1">
		<div class="flex items-center gap-2">
			<ArrowLeftRight class="h-5 w-5 text-feedback-warning" />
			<h2 class="text-base font-bold text-brand-dark">Substituições de Aulas da Semana</h2>
		</div>
		<button
			type="button"
			onclick={onRequestSubstituicao}
			class="text-xs font-semibold text-brand-blue hover:underline cursor-pointer"
		>
			+ Solicitar
		</button>
	</div>

	<div class="flex flex-col gap-2.5">
		{#if substituicoes.length === 0}
			<Card variant="bordered" padding="sm" class="text-center py-4 text-xs text-neutral-gray-500">
				Nenhuma substituição programada para os próximos dias.
			</Card>
		{:else}
			{#each substituicoes as sub (sub.id)}
				<Card variant="default" padding="sm" class="flex flex-col gap-1.5">
					<div class="flex items-start justify-between gap-2">
						<span class="text-xs font-bold text-neutral-dark">
							{sub.disciplina} ({sub.turma})
						</span>
						<Badge variant={sub.status === 'APROVADO' ? 'success' : 'warning'}>
							{sub.status}
						</Badge>
					</div>

					<div class="text-xs text-neutral-text">
						<span>Titular: <strong>{sub.professor_titular}</strong></span>
						<span class="text-neutral-gray-400 mx-1">➔</span>
						<span>Substituto: <strong>{sub.professor_substituto}</strong></span>
					</div>

					<div class="flex items-center gap-3 text-[11px] text-neutral-gray-500 pt-1 border-t border-neutral-border-light">
						<span class="inline-flex items-center gap-1">
							<Clock class="h-3 w-3" /> {sub.data_substituicao} ({sub.horario})
						</span>
						<span class="inline-flex items-center gap-1">
							<MapPin class="h-3 w-3 text-feedback-error" /> {sub.sala}
						</span>
					</div>
				</Card>
			{/each}
		{/if}
	</div>
</div>

