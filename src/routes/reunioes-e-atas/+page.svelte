<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { CheckCircle2, AlertCircle, Calendar, RotateCcw } from 'lucide-svelte';
	import HeaderNavbar from '$lib/components/features/home/HeaderNavbar.svelte';
	import ReunioesHeader from '$lib/components/features/reunioes/ReunioesHeader.svelte';
	import ReunioesFilterBar from '$lib/components/features/reunioes/ReunioesFilterBar.svelte';
	import ReuniaoCard from '$lib/components/features/reunioes/ReuniaoCard.svelte';
	import NovaReuniaoModal from '$lib/components/features/reunioes/NovaReuniaoModal.svelte';
	import AtaViewerModal from '$lib/components/features/reunioes/AtaViewerModal.svelte';
	import AtaEditorModal from '$lib/components/features/reunioes/AtaEditorModal.svelte';
	import type { ReuniaoItem } from '$lib/types/reunioesAtas';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let search = $state('');
	let tipoFilter = $state('TODAS');
	let abaAtiva = $state<'TODAS' | 'AGENDADAS' | 'REALIZADAS'>('TODAS');
	let selectedRole = $state('Coordenador');
	let viewingReuniao = $state<ReuniaoItem | null>(null);
	let editingReuniao = $state<ReuniaoItem | null>(null);
	let isViewerOpen = $state(false);
	let isEditorOpen = $state(false);
	let isNovaModalOpen = $state(false);

	$effect(() => {
		if (data.simulatedRole) selectedRole = data.simulatedRole;
	});

	const canSchedule = $derived(['Coordenador', 'Secretaria', 'NDE', 'Direção'].includes(selectedRole));
	const totalAgendadas = $derived(data.reunioes.filter((r) => r.status === 'AGENDADA').length);
	const totalAtasPublicadas = $derived(data.reunioes.filter((r) => r.atas?.status === 'PUBLICADA').length);

	const filteredReunioes = $derived(
		data.reunioes.filter((r) => {
			const term = search.toLowerCase().trim();
			const matchesSearch = !term || r.titulo.toLowerCase().includes(term) || (r.curso?.nome?.toLowerCase().includes(term)) || (r.curso?.codigo?.toLowerCase().includes(term)) || (r.atas?.pauta_previa?.toLowerCase().includes(term)) || (r.atas?.conteudo_realizado?.toLowerCase().includes(term));
			const matchesTipo = tipoFilter === 'TODAS' || r.tipo_reuniao === tipoFilter;
			const matchesAba = abaAtiva === 'TODAS' || (abaAtiva === 'AGENDADAS' && r.status === 'AGENDADA') || (abaAtiva === 'REALIZADAS' && r.status === 'REALIZADA');
			return matchesSearch && matchesTipo && matchesAba;
		})
	);

	function handleViewAta(r: ReuniaoItem) { viewingReuniao = r; isViewerOpen = true; }
	function handleEditAta(r: ReuniaoItem) { editingReuniao = r; isEditorOpen = true; }
</script>

<svelte:head>
	<title>Reuniões & Atas (MEC) | Intranet Impacta</title>
</svelte:head>

<div class="min-h-screen bg-neutral-offwhite font-sans text-neutral-dark pb-16">
	<HeaderNavbar userName={data.userName} bind:selectedRole />

	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
		<ReunioesHeader {totalAgendadas} {totalAtasPublicadas} {canSchedule} onOpenNovoModal={() => (isNovaModalOpen = true)} />

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

		<ReunioesFilterBar bind:search bind:tipoFilter bind:abaAtiva totalCount={data.reunioes.length} filteredCount={filteredReunioes.length} />

		{#if filteredReunioes.length > 0}
			<div class="space-y-4">
				{#each filteredReunioes as reuniao (reuniao.id)}
					<ReuniaoCard {reuniao} canEdit={canSchedule} onViewAta={handleViewAta} onEditAta={handleEditAta} />
				{/each}
			</div>
		{:else}
			<div class="bg-neutral-white rounded-2xl p-8 border border-neutral-border-light text-center flex flex-col items-center justify-center my-6">
				<div class="h-12 w-12 rounded-full bg-neutral-surface flex items-center justify-center text-neutral-gray-400 mb-3">
					<Calendar class="h-6 w-6" />
				</div>
				<h3 class="text-sm font-bold text-brand-dark">Nenhuma reunião encontrada</h3>
				<p class="text-xs text-neutral-dark-gray mt-1 max-w-sm">Não há registros para os filtros selecionados.</p>
				<button type="button" onclick={() => { search = ''; tipoFilter = 'TODAS'; abaAtiva = 'TODAS'; }} class="mt-4 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-purple text-neutral-white text-xs font-semibold shadow-xs hover:bg-brand-purple-dark transition cursor-pointer">
					<RotateCcw class="h-3.5 w-3.5" /> Redefinir Filtros
				</button>
			</div>
		{/if}
	</main>
</div>

<NovaReuniaoModal bind:isOpen={isNovaModalOpen} cursos={data.cursos} usuarios={data.usuarios} />
<AtaViewerModal reuniao={viewingReuniao} isOpen={isViewerOpen} onclose={() => { isViewerOpen = false; viewingReuniao = null; }} />
<AtaEditorModal reuniao={editingReuniao} isOpen={isEditorOpen} onclose={() => { isEditorOpen = false; editingReuniao = null; }} />
