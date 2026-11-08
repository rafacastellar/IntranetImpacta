<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { CheckCircle2, AlertCircle, Send, RotateCcw } from 'lucide-svelte';
	import HeaderNavbar from '$lib/components/features/home/HeaderNavbar.svelte';
	import DirectHeader from '$lib/components/features/direct/DirectHeader.svelte';
	import DirectFilterBar from '$lib/components/features/direct/DirectFilterBar.svelte';
	import ComunicadoCard from '$lib/components/features/direct/ComunicadoCard.svelte';
	import NovoComunicadoModal from '$lib/components/features/direct/NovoComunicadoModal.svelte';
	import LeiturasViewerModal from '$lib/components/features/direct/LeiturasViewerModal.svelte';
	import type { ComunicadoItem } from '$lib/types/impactaDirect';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let search = $state('');
	let tipoFilter = $state('TODOS');
	let statusFilter = $state('TODOS');
	let selectedRole = $state('Coordenador');
	let selectedComunicado = $state<ComunicadoItem | null>(null);
	let isLeiturasModalOpen = $state(false);
	let isNovoModalOpen = $state(false);

	$effect(() => {
		if (data.simulatedRole) selectedRole = data.simulatedRole;
	});

	const canSend = $derived(['Coordenador', 'Secretaria', 'NDE', 'Direção'].includes(selectedRole));
	const total = $derived(data.comunicados.length);
	const pendentes = $derived(data.comunicados.filter((c) => !c.lido_pelo_usuario).length);
	const totalLeituras = $derived(data.comunicados.reduce((acc, c) => acc + (c.total_leituras || 0), 0));

	const filteredComunicados = $derived(
		data.comunicados.filter((c) => {
			const term = search.toLowerCase().trim();
			const matchesSearch = !term || c.titulo.toLowerCase().includes(term) || c.mensagem.toLowerCase().includes(term) || (c.remetente?.nome?.toLowerCase().includes(term));
			const matchesTipo = tipoFilter === 'TODOS' || c.alvo_tipo === tipoFilter;
			const matchesStatus = statusFilter === 'TODOS' || (statusFilter === 'PENDENTES' && !c.lido_pelo_usuario) || (statusFilter === 'LIDOS' && c.lido_pelo_usuario);
			return matchesSearch && matchesTipo && matchesStatus;
		})
	);

	function handleViewLeituras(c: ComunicadoItem) {
		selectedComunicado = c;
		isLeiturasModalOpen = true;
	}
</script>

<svelte:head>
	<title>Impacta Direct — Comunicação Segmentada | Intranet Impacta</title>
</svelte:head>

<div class="min-h-screen bg-neutral-offwhite font-sans text-neutral-dark pb-16">
	<HeaderNavbar userName={data.userName} bind:selectedRole />

	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
		<DirectHeader {total} {pendentes} {totalLeituras} {canSend} onOpenNovoModal={() => (isNovoModalOpen = true)} />

		{#if form?.message}
			<div class="mb-4 p-3.5 rounded-xl bg-feedback-success/10 border border-feedback-success/30 flex items-center gap-2.5 text-xs font-semibold text-feedback-success">
				<CheckCircle2 class="h-4 w-4 shrink-0" />
				<span>{form.message}</span>
			</div>
		{/if}

		{#if form?.error}
			<div class="mb-4 p-3.5 rounded-xl bg-feedback-error/10 border border-feedback-error/30 flex items-center gap-2.5 text-xs font-semibold text-feedback-error">
				<AlertCircle class="h-4 w-4 shrink-0" />
				<span>{form.error}</span>
			</div>
		{/if}

		<DirectFilterBar bind:search bind:tipoFilter bind:statusFilter totalCount={total} filteredCount={filteredComunicados.length} />

		{#if filteredComunicados.length > 0}
			<div class="space-y-4">
				{#each filteredComunicados as comunicado (comunicado.id)}
					<ComunicadoCard {comunicado} onViewLeituras={handleViewLeituras} />
				{/each}
			</div>
		{:else}
			<div class="bg-neutral-white rounded-2xl p-8 border border-neutral-border-light text-center flex flex-col items-center justify-center my-6">
				<div class="h-12 w-12 rounded-full bg-neutral-surface flex items-center justify-center text-neutral-gray-400 mb-3">
					<Send class="h-6 w-6" />
				</div>
				<h3 class="text-sm font-bold text-brand-dark">Nenhum comunicado encontrado</h3>
				<p class="text-xs text-neutral-dark-gray mt-1 max-w-sm">Não há mensagens correspondentes aos filtros selecionados.</p>
				<button type="button" onclick={() => { search = ''; tipoFilter = 'TODOS'; statusFilter = 'TODOS'; }} class="mt-4 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-blue text-neutral-white text-xs font-semibold shadow-xs hover:bg-brand-blue-hover transition cursor-pointer">
					<RotateCcw class="h-3.5 w-3.5" /> Redefinir Filtros
				</button>
			</div>
		{/if}
	</main>
</div>

<NovoComunicadoModal bind:isOpen={isNovoModalOpen} perfis={data.perfis} cursos={data.cursos} turmas={data.turmas} />

<LeiturasViewerModal comunicado={selectedComunicado} isOpen={isLeiturasModalOpen} onclose={() => { isLeiturasModalOpen = false; selectedComunicado = null; }} />
