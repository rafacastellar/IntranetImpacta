<script lang="ts">
	import { Search, Menu, X, UserCircle } from 'lucide-svelte';
	import UserMenu from './UserMenu.svelte';

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

	let isNavMenuOpen = $state(false);

	const roles = ['Professor', 'Coordenador', 'NDE', 'Secretaria'];
	const navLinks = [
		{ label: 'Mural de Avisos & Infraestrutura', href: '#mural' },
		{ label: 'Reuniões & Atas NDE (MEC)', href: '#reunioes' },
		{ label: 'Substituições de Aulas', href: '#substituicoes' },
		{ label: 'Procedimentos & Políticas', href: '#procedimentos' }
	];

	function handleRoleSelect(role: string) {
		selectedRole = role;
		onRoleChange?.(role);
	}
</script>

<header class="sticky top-0 z-40 bg-brand-dark text-neutral-white border-b border-brand-dark-surface shadow-md font-sans">
	<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
		<!-- Início: Menu Hambúrguer + Logo Impacta -->
		<div class="flex items-center gap-2.5">
			<div class="relative">
				<button
					type="button"
					onclick={() => (isNavMenuOpen = !isNavMenuOpen)}
					class="p-2 rounded-lg text-neutral-white hover:bg-brand-dark-alt transition cursor-pointer"
					aria-label="Menu de Navegação"
				>
					{#if isNavMenuOpen}<X class="h-5 w-5" />{:else}<Menu class="h-5 w-5" />{/if}
				</button>

				{#if isNavMenuOpen}
					<div class="absolute left-0 mt-2 w-64 rounded-xl bg-neutral-white text-neutral-dark shadow-xl border border-neutral-border-light py-2 z-50">
						<div class="px-4 py-2 border-b border-neutral-border-light">
							<span class="text-xs font-bold text-brand-dark uppercase tracking-wider">Módulos da Intranet</span>
						</div>
						<ul class="py-1 text-xs">
							{#each navLinks as link}
								<li>
									<a
										href={link.href}
										onclick={() => (isNavMenuOpen = false)}
										class="flex items-center px-4 py-2 hover:bg-neutral-surface hover:text-brand-blue font-medium transition"
									>
										{link.label}
									</a>
								</li>
							{/each}
						</ul>
					</div>
					<button type="button" class="fixed inset-0 z-40 bg-transparent cursor-default" onclick={() => (isNavMenuOpen = false)} aria-label="Fechar"></button>
				{/if}
			</div>

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

		<!-- Centro: Seletor de Visão de Perfil (Desktop) -->
		<div class="hidden md:flex items-center gap-1.5 bg-brand-dark-alt/80 px-2.5 py-1 rounded-xl border border-brand-dark-surface">
			<UserCircle class="h-4 w-4 text-brand-cyan" />
			<span class="text-xs text-neutral-gray-400 font-medium mr-1">Visão:</span>
			<div class="flex items-center gap-1">
				{#each roles as r}
					<button
						type="button"
						onclick={() => handleRoleSelect(r)}
						class={`px-2.5 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
							selectedRole === r
								? 'bg-brand-blue text-neutral-white shadow-xs'
								: 'text-neutral-gray-400 hover:text-neutral-white hover:bg-brand-dark-surface'
						}`}
					>
						{r}
					</button>
				{/each}
			</div>
		</div>

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
