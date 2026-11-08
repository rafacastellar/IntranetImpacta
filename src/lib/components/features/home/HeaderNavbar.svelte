<script lang="ts">
	import { Search, Menu, X } from 'lucide-svelte';
	import UserMenu from './UserMenu.svelte';
	import DevRoleSelector from './DevRoleSelector.svelte';
	import AppSidebar from './AppSidebar.svelte';

	interface Props {
		userName?: string;
		selectedRole?: string;
		onRoleChange?: (role: string) => void;
		onSearchClick?: () => void;
	}

	let {
		userName = 'Prof. Carlos Eduardo Silveira',
		selectedRole = $bindable('Coordenador'),
		onRoleChange,
		onSearchClick
	}: Props = $props();

	let isSidebarOpen = $state(false);

	const roles = ['Professor', 'Coordenador', 'NDE', 'Secretaria'];

	function handleRoleSelect(role: string) {
		selectedRole = role;
		onRoleChange?.(role);
	}
</script>

<header class="sticky top-0 z-40 bg-brand-dark text-neutral-white border-b border-brand-dark-surface shadow-md font-sans h-14 flex items-center">
	<nav class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
		<!-- Início: Menu Hambúrguer + Logo Impacta -->
		<div class="flex items-center gap-2.5">
			<button
				type="button"
				onclick={() => (isSidebarOpen = !isSidebarOpen)}
				class="p-2 rounded-lg text-neutral-white hover:bg-brand-dark-alt transition cursor-pointer"
				aria-label="Abrir ou fechar menu de navegação"
			>
				{#if isSidebarOpen}
					<X class="h-5 w-5" />
				{:else}
					<Menu class="h-5 w-5" />
				{/if}
			</button>

			<a href="/" class="flex items-center gap-2.5 hover:text-brand-cyan transition">
				<div class="h-8 w-8 p-1 rounded-lg bg-neutral-white shadow-xs flex items-center justify-center shrink-0">
					<img src="/logo_impacta.svg" alt="Faculdade Impacta" class="h-5 w-auto object-contain" />
				</div>
				<div class="flex flex-col text-left">
					<span class="text-sm font-bold tracking-tight leading-tight">Faculdade Impacta</span>
					<span class="text-[10px] text-brand-cyan font-medium leading-tight hidden sm:inline">Coordenação & Corpo Docente</span>
				</div>
			</a>
		</div>

		<!-- [DEV ONLY] Seletor de Perfil Simulado -->
		<DevRoleSelector
			{selectedRole}
			onRoleChange={handleRoleSelect}
		/>

		<!-- Fim: Busca + Menu do Usuário -->
		<div class="flex items-center gap-2 sm:gap-3">
			<button
				type="button"
				onclick={onSearchClick}
				class="p-2 rounded-lg text-neutral-gray-300 hover:text-neutral-white hover:bg-brand-dark-alt transition cursor-pointer"
				aria-label="Buscar na Intranet"
			>
				<Search class="h-4.5 w-4.5" />
			</button>

			<UserMenu
				{userName}
				{selectedRole}
				{roles}
				onRoleSelect={handleRoleSelect}
			/>
		</div>
	</nav>
</header>

<!-- Sidebar Lateral deslizante abaixo do Header -->
<AppSidebar
	isOpen={isSidebarOpen}
	onclose={() => (isSidebarOpen = false)}
	currentRole={selectedRole}
/>
