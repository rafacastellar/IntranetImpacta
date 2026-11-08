<script lang="ts">
	import { ArrowLeft, Calendar, ShieldCheck, Plus, Clock, FileText } from 'lucide-svelte';
	import Button from '$lib/components/ui/Button.svelte';

	interface Props {
		totalAgendadas: number;
		totalAtasPublicadas: number;
		canSchedule?: boolean;
		onOpenNovoModal?: () => void;
	}

	let {
		totalAgendadas,
		totalAtasPublicadas,
		canSchedule = true,
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
		<span class="text-xs font-medium text-neutral-gray-400">Compliance MEC & NDE</span>
	</div>

	<div class="bg-brand-dark rounded-2xl p-6 text-neutral-white shadow-xl border border-brand-cyan/20">
		<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
			<div class="flex items-center gap-3">
				<div class="h-10 w-10 rounded-xl bg-brand-purple/30 border border-brand-purple-alt flex items-center justify-center text-brand-cyan shrink-0">
					<Calendar class="h-5 w-5" />
				</div>
				<div>
					<div class="flex items-center gap-2">
						<h1 class="text-xl sm:text-2xl font-bold tracking-tight">Reuniões & Atas (MEC)</h1>
						<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-purple/30 text-neutral-white border border-brand-purple/40">
							Auditável
						</span>
					</div>
					<p class="text-xs sm:text-sm text-neutral-surface mt-0.5">
						Agendamento automático, integração com Google/Outlook e repositório oficial de pautas prévias e atas homologadas.
					</p>
				</div>
			</div>

			{#if canSchedule && onOpenNovoModal}
				<div class="flex items-center gap-3 shrink-0">
					<Button variant="primary" size="md" onclick={onOpenNovoModal}>
						{#snippet leftIcon()}
							<Plus class="h-4 w-4" />
						{/snippet}
						Agendar Reunião
					</Button>
				</div>
			{/if}
		</div>

		<!-- Indicadores de Conformidade MEC -->
		<div class="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-brand-dark-surface/60">
			<div class="flex items-center gap-2">
				<Clock class="h-4 w-4 text-brand-cyan shrink-0" />
				<span class="text-xs text-neutral-surface">
					<strong>{totalAgendadas}</strong> reuniões agendadas
				</span>
			</div>
			<div class="flex items-center gap-2">
				<FileText class="h-4 w-4 text-feedback-success shrink-0" />
				<span class="text-xs text-neutral-surface">
					<strong>{totalAtasPublicadas}</strong> atas homologadas
				</span>
			</div>
			<div class="flex items-center gap-2">
				<ShieldCheck class="h-4 w-4 text-brand-cyan shrink-0" />
				<span class="text-xs text-neutral-surface">
					<strong>100%</strong> padrão INEP/MEC
				</span>
			</div>
		</div>
	</div>
</div>

