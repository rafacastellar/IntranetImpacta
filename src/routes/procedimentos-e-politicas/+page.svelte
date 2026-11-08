<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { CheckCircle2, AlertCircle, FileQuestion, RotateCcw } from 'lucide-svelte';
	import HeaderNavbar from '$lib/components/features/home/HeaderNavbar.svelte';
	import ProcedimentosHeader from '$lib/components/features/procedimentos/ProcedimentosHeader.svelte';
	import ProcedimentosFilterBar from '$lib/components/features/procedimentos/ProcedimentosFilterBar.svelte';
	import DocumentoCard from '$lib/components/features/procedimentos/DocumentoCard.svelte';
	import DocumentoViewerModal from '$lib/components/features/procedimentos/DocumentoViewerModal.svelte';
	import NovoDocumentoModal from '$lib/components/features/procedimentos/NovoDocumentoModal.svelte';
	import type { DocumentoPolitica } from '$lib/types/procedimentos';
	import Button from '$lib/components/ui/Button.svelte';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let search = $state('');
	let categoriaFilter = $state('TODAS');
	let selectedRole = $state('Professor');
	let selectedDoc = $state<DocumentoPolitica | null>(null);
	let isViewerOpen = $state(false);
	let isNovoModalOpen = $state(false);

	$effect(() => {
		if (data.simulatedRole) {
			selectedRole = data.simulatedRole;
		}
	});

	const canCreate = $derived(
		['Coordenador', 'Secretaria', 'NDE', 'Direção'].includes(selectedRole)
	);

	const totalCount = $derived(data.documentos.length);

	const filteredDocumentos = $derived(
		data.documentos.filter((doc) => {
			const term = search.toLowerCase().trim();
			const matchesSearch =
				!term ||
				doc.titulo.toLowerCase().includes(term) ||
				(doc.resumo && doc.resumo.toLowerCase().includes(term)) ||
				doc.palavras_chave?.some((tag) => tag.toLowerCase().includes(term));

			const matchesCategory =
				categoriaFilter === 'TODAS' || String(doc.categoria_id) === categoriaFilter;

			return matchesSearch && matchesCategory;
		})
	);

	function openViewer(doc: DocumentoPolitica) {
		selectedDoc = doc;
		isViewerOpen = true;
	}

	function handleTagFilter(tag: string) {
		search = tag;
	}
</script>

<svelte:head>
	<title>Base de Procedimentos e Políticas | Intranet Impacta</title>
</svelte:head>

<div class="min-h-screen bg-neutral-offwhite font-sans text-neutral-dark pb-16">
	<!-- Navbar Unificada com Módulos, Visão RBAC e Sidebar -->
	<HeaderNavbar
		userName={data.userName}
		bind:selectedRole
	/>

	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
		<ProcedimentosHeader
			total={totalCount}
			{canCreate}
			onOpenNovoModal={() => (isNovoModalOpen = true)}
		/>

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

		<ProcedimentosFilterBar
			bind:search
			bind:categoriaFilter
			categorias={data.categorias}
			{totalCount}
			filteredCount={filteredDocumentos.length}
		/>

		<!-- Grid Responsivo de Documentos & Tutoriais -->
		{#if filteredDocumentos.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each filteredDocumentos as doc (doc.id)}
					<DocumentoCard
						documento={doc}
						onSelectDoc={openViewer}
						onSelectTag={handleTagFilter}
					/>
				{/each}
			</div>
		{:else}
			<div class="bg-neutral-white rounded-2xl p-8 border border-neutral-border-light text-center flex flex-col items-center justify-center my-6">
				<div class="h-12 w-12 rounded-full bg-neutral-surface flex items-center justify-center text-neutral-gray-400 mb-3">
					<FileQuestion class="h-6 w-6" />
				</div>
				<h3 class="text-sm font-bold text-brand-dark">Nenhum documento ou tutorial encontrado</h3>
				<p class="text-xs text-neutral-dark-gray mt-1 max-w-sm">
					Não encontramos resultados correspondentes a "<strong>{search}</strong>". Tente buscar por outros termos ou limpar os filtros.
				</p>
				<button
					type="button"
					onclick={() => { search = ''; categoriaFilter = 'TODAS'; }}
					class="mt-4 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-blue text-neutral-white text-xs font-semibold shadow-xs hover:bg-brand-blue-hover transition cursor-pointer"
				>
					<RotateCcw class="h-3.5 w-3.5" /> Limpar Filtros de Busca
				</button>
			</div>
		{/if}
	</main>
</div>

<!-- Modal de Visualização de Documento Completo -->
<DocumentoViewerModal
	documento={selectedDoc}
	isOpen={isViewerOpen}
	onclose={() => { isViewerOpen = false; selectedDoc = null; }}
/>

<!-- Modal de Cadastro de Novo Procedimento -->
<NovoDocumentoModal
	bind:isOpen={isNovoModalOpen}
	categorias={data.categorias}
/>

