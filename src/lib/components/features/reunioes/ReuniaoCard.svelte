<script lang="ts">
	import { Calendar, Video, MapPin, FileText, Edit3 } from 'lucide-svelte';
	import type { ReuniaoItem } from '$lib/types/reunioesAtas';
	import ReuniaoCalendarMenu from './ReuniaoCalendarMenu.svelte';

	interface Props {
		reuniao: ReuniaoItem;
		canEdit?: boolean;
		onViewAta: (r: ReuniaoItem) => void;
		onEditAta: (r: ReuniaoItem) => void;
	}

	let { reuniao, canEdit = true, onViewAta, onEditAta }: Props = $props();

	function formatDateTime(iso: string) {
		try {
			return new Date(iso).toLocaleString('pt-BR', {
				day: '2-digit',
				month: 'short',
				hour: '2-digit',
				minute: '2-digit'
			});
		} catch {
			return iso;
		}
	}

	function getTypeBadge(tipo: string) {
		switch (tipo) {
			case 'NDE':
				return 'bg-brand-purple/15 text-brand-purple border-brand-purple/30';
			case 'Colegiado':
				return 'bg-brand-blue/15 text-brand-blue border-brand-blue/30';
			case 'Docente':
				return 'bg-brand-cyan/20 text-brand-blue-dark border-brand-cyan/40';
			default:
				return 'bg-neutral-dark/10 text-neutral-dark border-neutral-border';
		}
	}
</script>

<div class="bg-neutral-white rounded-2xl p-5 border border-neutral-border-light shadow-xs hover:shadow-md transition font-sans flex flex-col justify-between">
	<div>
		<!-- Cabeçalho: Tipo, Curso e Status -->
		<div class="flex flex-wrap items-center justify-between gap-2 mb-2.5">
			<div class="flex items-center gap-2">
				<span class={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-lg border ${getTypeBadge(reuniao.tipo_reuniao)}`}>
					{reuniao.tipo_reuniao}
				</span>
				{#if reuniao.curso}
					<span class="text-xs font-semibold text-neutral-gray-500">
						• {reuniao.curso.codigo} ({reuniao.curso.nome})
					</span>
				{/if}
			</div>

			<span class={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
				reuniao.status === 'REALIZADA'
					? 'bg-feedback-success/15 text-feedback-success'
					: 'bg-feedback-warning/15 text-feedback-warning'
			}`}>
				{reuniao.status === 'REALIZADA' ? 'Realizada' : 'Agendada'}
			</span>
		</div>

		<!-- Título da Reunião -->
		<h3 class="text-sm sm:text-base font-bold text-brand-dark leading-snug">
			{reuniao.titulo}
		</h3>

		<!-- Data, Horário e Local -->
		<div class="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-neutral-gray-500 mt-2">
			<span class="flex items-center gap-1.5 text-brand-dark font-medium">
				<Calendar class="h-3.5 w-3.5 text-brand-purple" />
				{formatDateTime(reuniao.data_hora_inicio)} às {new Date(reuniao.data_hora_fim).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
			</span>

			{#if reuniao.local_link}
				<span class="flex items-center gap-1.5 truncate max-w-xs">
					{#if reuniao.local_link.startsWith('http')}
						<Video class="h-3.5 w-3.5 text-brand-blue shrink-0" />
						<a href={reuniao.local_link} target="_blank" rel="noreferrer" class="text-brand-blue hover:underline truncate">
							Acessar Videoconferência
						</a>
					{:else}
						<MapPin class="h-3.5 w-3.5 text-neutral-gray-400 shrink-0" />
						<span class="truncate">{reuniao.local_link}</span>
					{/if}
				</span>
			{/if}
		</div>

		<!-- Pauta Prévia ou Resumo de Deliberações -->
		{#if reuniao.atas?.pauta_previa}
			<div class="mt-3 p-3 rounded-xl bg-neutral-surface/50 border border-neutral-border-light text-xs text-neutral-dark">
				<span class="font-bold text-[10px] uppercase text-neutral-gray-400 block mb-1">Pauta Prévia:</span>
				<p class="whitespace-pre-line line-clamp-2 leading-relaxed text-neutral-dark-gray">{reuniao.atas.pauta_previa}</p>
			</div>
		{/if}
	</div>

	<!-- Rodapé e Ações -->
	<div class="mt-4 pt-3 border-t border-neutral-border-light flex flex-col sm:flex-row sm:items-center justify-between gap-3">
		<!-- Menu de Integração com Google/Outlook/.ICS -->
		<ReuniaoCalendarMenu {reuniao} />

		<!-- Ações de Ata -->
		<div class="flex items-center gap-2">
			<button
				type="button"
				onclick={() => onViewAta(reuniao)}
				class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-dark text-neutral-white hover:bg-brand-dark-alt text-xs font-semibold transition cursor-pointer shadow-xs"
			>
				<FileText class="h-3.5 w-3.5 text-brand-cyan" />
				{reuniao.status === 'REALIZADA' ? 'Ver Ata Homologada' : 'Ver Pauta Prévia'}
			</button>

			{#if canEdit}
				<button
					type="button"
					onclick={() => onEditAta(reuniao)}
					class="p-1.5 rounded-xl border border-neutral-border-light hover:bg-neutral-surface text-neutral-gray-500 hover:text-brand-purple transition cursor-pointer"
					title="Redigir / Editar Ata"
					aria-label="Redigir ou Editar Ata"
				>
					<Edit3 class="h-4 w-4" />
				</button>
			{/if}
		</div>
	</div>
</div>
