<script lang="ts">
	import { Card } from '$lib/components/ui';
	import { Calendar, Bell, FileText, ArrowLeftRight } from 'lucide-svelte';

	interface Props {
		reunioesCount?: number;
		avisosUrgentesCount?: number;
		atasPendentesCount?: number;
		substituicoesCount?: number;
	}

	let {
		reunioesCount = 3,
		avisosUrgentesCount = 1,
		atasPendentesCount = 2,
		substituicoesCount = 1
	}: Props = $props();
</script>

<section class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-sans">
	<!-- Reuniões -->
	<Card variant="default" padding="sm" class="border-l-4 border-l-brand-blue">
		<div class="flex items-center justify-between">
			<span class="text-xs font-semibold text-neutral-gray-500">Reuniões NDE</span>
			<div class="p-2 rounded-lg bg-brand-blue/10 text-brand-blue">
				<Calendar class="h-4 w-4" />
			</div>
		</div>
		<div class="mt-2 flex items-baseline gap-2">
			<span class="text-2xl font-bold text-neutral-dark">{reunioesCount}</span>
			<span class="text-[11px] text-feedback-info font-medium">próximas</span>
		</div>
	</Card>

	<!-- Avisos Urgentes -->
	<Card variant="default" padding="sm" class="border-l-4 border-l-feedback-error">
		<div class="flex items-center justify-between">
			<span class="text-xs font-semibold text-neutral-gray-500">Avisos Urgentes</span>
			<div class="p-2 rounded-lg bg-feedback-error/10 text-feedback-error">
				<Bell class="h-4 w-4" />
			</div>
		</div>
		<div class="mt-2 flex items-baseline gap-2">
			<span class="text-2xl font-bold text-neutral-dark">{avisosUrgentesCount}</span>
			<span class="text-[11px] text-feedback-error font-medium">requer atenção</span>
		</div>
	</Card>

	<!-- Atas NDE -->
	<Card variant="default" padding="sm" class="border-l-4 border-l-brand-purple">
		<div class="flex items-center justify-between">
			<span class="text-xs font-semibold text-neutral-gray-500">Atas Pendentes</span>
			<div class="p-2 rounded-lg bg-brand-purple/10 text-brand-purple">
				<FileText class="h-4 w-4" />
			</div>
		</div>
		<div class="mt-2 flex items-baseline gap-2">
			<span class="text-2xl font-bold text-neutral-dark">{atasPendentesCount}</span>
			<span class="text-[11px] text-brand-purple font-medium">em revisão</span>
		</div>
	</Card>

	<!-- Substituições -->
	<Card variant="default" padding="sm" class="border-l-4 border-l-feedback-warning">
		<div class="flex items-center justify-between">
			<span class="text-xs font-semibold text-neutral-gray-500">Substituições</span>
			<div class="p-2 rounded-lg bg-feedback-warning/10 text-feedback-warning">
				<ArrowLeftRight class="h-4 w-4" />
			</div>
		</div>
		<div class="mt-2 flex items-baseline gap-2">
			<span class="text-2xl font-bold text-neutral-dark">{substituicoesCount}</span>
			<span class="text-[11px] text-neutral-gray-500 font-medium">solicitada</span>
		</div>
	</Card>
</section>

