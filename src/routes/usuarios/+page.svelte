<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { CheckCircle2, AlertCircle } from 'lucide-svelte';
	import HeaderNavbar from '$lib/components/features/home/HeaderNavbar.svelte';
	import UsuariosHeader from '$lib/components/features/usuarios/UsuariosHeader.svelte';
	import UsuariosFilterBar from '$lib/components/features/usuarios/UsuariosFilterBar.svelte';
	import UsuariosTable from '$lib/components/features/usuarios/UsuariosTable.svelte';
	import UsuariosMobileCards from '$lib/components/features/usuarios/UsuariosMobileCards.svelte';
	import NovoUsuarioModal from '$lib/components/features/usuarios/NovoUsuarioModal.svelte';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let search = $state('');
	let perfilFilter = $state('TODOS');
	let statusFilter = $state('TODOS');
	let cursoFilter = $state('TODOS');
	let isNovoModalOpen = $state(false);
	let selectedRole = $state('Secretaria');

	$effect(() => {
		if (data.simulatedRole) {
			selectedRole = data.simulatedRole;
		}
	});

	const total = $derived(data.usuarios.length);
	const ativos = $derived(data.usuarios.filter((u) => u.ativo).length);
	const inativos = $derived(data.usuarios.filter((u) => !u.ativo).length);

	const filteredUsuarios = $derived(
		data.usuarios.filter((u) => {
			const matchesSearch =
				!search ||
				u.nome.toLowerCase().includes(search.toLowerCase()) ||
				u.email.toLowerCase().includes(search.toLowerCase());

			const matchesPerfil =
				perfilFilter === 'TODOS' || String(u.perfil_id) === perfilFilter;

			const matchesStatus =
				statusFilter === 'TODOS' ||
				(statusFilter === 'ATIVOS' && u.ativo) ||
				(statusFilter === 'INATIVOS' && !u.ativo);

			const matchesCurso =
				cursoFilter === 'TODOS' ||
				u.usuario_cursos?.some((uc) => String(uc.curso_id) === cursoFilter);

			return matchesSearch && matchesPerfil && matchesStatus && matchesCurso;
		})
	);
</script>

<svelte:head>
	<title>Gestão de Usuários | Intranet Impacta</title>
</svelte:head>

<div class="min-h-screen bg-neutral-offwhite font-sans text-neutral-dark pb-16">
	<!-- Navbar Unificada com Módulos, Visão RBAC e Sidebar -->
	<HeaderNavbar
		userName={data.userName}
		bind:selectedRole
	/>

	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
		<UsuariosHeader
			{total}
			{ativos}
			{inativos}
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

		<UsuariosFilterBar
			bind:search
			bind:perfilFilter
			bind:statusFilter
			bind:cursoFilter
			perfis={data.perfis}
			cursos={data.cursos}
		/>

		<!-- Tabela Responsiva Desktop -->
		<UsuariosTable usuarios={filteredUsuarios} currentUserId={data.currentUserId} />

		<!-- Cards Responsivos Mobile -->
		<UsuariosMobileCards usuarios={filteredUsuarios} currentUserId={data.currentUserId} />
	</main>
</div>

<NovoUsuarioModal
	bind:isOpen={isNovoModalOpen}
	perfis={data.perfis}
	cursos={data.cursos}
/>
