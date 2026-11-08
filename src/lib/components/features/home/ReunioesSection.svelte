<script lang="ts">
	import { Card, Badge, Button } from '$lib/components/ui';
	import type { MockAta } from '$lib/server/mockData';
	import { Calendar, Users, Clock, Video, FileText, ChevronRight } from 'lucide-svelte';

	interface Props {
		atas?: MockAta[];
		onSelectAta?: (ata: MockAta) => void;
	}

	let { atas = [], onSelectAta }: Props = $props();

	function formatDate(dateStr: string) {
		try {
			return new Intl.DateTimeFormat('pt-BR', {
				day: '2-digit',
				month: 'short',
				hour: '2-digit',
				minute: '2-digit'
			}).format(new Date(dateStr));
		} catch {
			return dateStr;
		}
	}
</script>

<div class="flex flex-col gap-3 font-sans">
	<div class="flex items-center justify-between pb-1">
		<div class="flex items-center gap-2">
			<Calendar class="h-5 w-5 text-brand-purple" />
			<h2 class="text-base font-bold text-brand-dark">Reuniões & Atas NDE (MEC)</h2>
		</div>
		<a href="/reunioes-e-atas" class="text-xs text-brand-purple font-semibold hover:underline cursor-pointer">
			Ver todas
		</a>
	</div>

	<div class="flex flex-col gap-3">
		{#if atas.length === 0}
			<Card variant="bordered" padding="md" class="text-center py-6">
				<p class="text-xs text-neutral-gray-500">Nenhuma reunião recente cadastrada.</p>
			</Card>
		{:else}
			{#each atas as ata (ata.id)}
				<Card
					variant="default"
					padding="sm"
					class="hover:border-brand-purple/50 hover:shadow-xs transition cursor-pointer"
					onclick={() => onSelectAta?.(ata)}
				>
					<div class="flex items-start justify-between gap-2">
						<Badge variant={ata.tipo_reuniao === 'NDE' ? 'purple' : 'primary'}>
							<Users class="h-3 w-3" />
							{ata.tipo_reuniao}
						</Badge>
						<Badge variant={ata.status === 'PUBLICADA' ? 'success' : 'warning'}>
							{ata.status}
						</Badge>
					</div>

					<h3 class="text-sm font-bold text-neutral-dark mt-2 leading-snug">
						{ata.titulo}
					</h3>
					<p class="text-xs text-neutral-gray-500 font-medium mt-0.5">
						{ata.curso}
					</p>

					<!-- Detalhes de Horário e Participantes -->
					<div class="flex items-center gap-3 mt-2.5 text-xs text-neutral-dark/80 flex-wrap">
						<span class="inline-flex items-center gap-1 text-neutral-gray-500">
							<Clock class="h-3.5 w-3.5" />
							{formatDate(ata.data_reuniao)}
						</span>
						<span class="inline-flex items-center gap-1 text-neutral-gray-500">
							<Video class="h-3.5 w-3.5 text-brand-blue" />
							Meet / Presencial
						</span>
					</div>

					<!-- Resumo da Pauta -->
					<div class="mt-2.5 p-2 rounded-lg bg-neutral-surface/60 border border-neutral-border-light text-xs text-neutral-text">
						<div class="font-semibold text-neutral-dark flex items-center gap-1 mb-0.5">
							<FileText class="h-3 w-3 text-brand-purple" />
							Pauta Prévia:
						</div>
						<p class="content-short line-clamp-2 text-neutral-gray-600">
							{ata.pauta_previa}
						</p>
					</div>
				</Card>
			{/each}
		{/if}
	</div>
</div>

