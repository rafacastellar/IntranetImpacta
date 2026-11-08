<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import HeaderNavbar from '$lib/components/features/home/HeaderNavbar.svelte';
	import ProfileHeader from '$lib/components/features/perfil/ProfileHeader.svelte';
	import ProfileForm from '$lib/components/features/perfil/ProfileForm.svelte';
	import InstitutionalInfo from '$lib/components/features/perfil/InstitutionalInfo.svelte';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let selectedRole = $state('Coordenador');

	$effect(() => {
		if (data.simulatedRole) {
			selectedRole = data.simulatedRole;
		}
	});

	const perfisList = $derived(
		data.usuario.usuario_perfis?.map((up: any) => up.perfis).filter(Boolean) || []
	);
</script>

<svelte:head>
	<title>Meu Perfil | Intranet Impacta</title>
</svelte:head>

<div class="min-h-screen bg-neutral-offwhite font-sans text-neutral-dark pb-16">
	<!-- Navbar Unificada com Módulos, Visão RBAC e Sidebar -->
	<HeaderNavbar
		userName={data.usuario.nome}
		bind:selectedRole
	/>

	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
		<ProfileHeader
			nome={data.usuario.nome}
			email={data.usuario.email}
			perfis={perfisList}
		/>

		<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
			<!-- Coluna Principal: Formulário de Edição -->
			<div class="lg:col-span-7">
				<ProfileForm
					usuario={data.usuario}
					successMessage={form?.message}
					errorMessage={form?.error}
				/>
			</div>

			<!-- Coluna Lateral: Dados Institucionais e Vínculos -->
			<div class="lg:col-span-5">
				<InstitutionalInfo
					email={data.usuario.email}
					criadoEm={data.usuario.criado_em}
					perfis={perfisList}
					cursos={data.cursos}
					ndeMembros={data.ndeMembros}
				/>
			</div>
		</div>

		<!-- Aviso Informativo -->
		<div class="mt-8 text-center text-xs text-neutral-gray-500 border-t border-neutral-border-light pt-4">
			<p>
				Alterações de vínculos de cursos ou portarias do NDE devem ser solicitadas diretamente à Secretaria Geral.
			</p>
		</div>
	</main>
</div>
