<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { SlidersHorizontal, ChevronDown, Check, Shield } from 'lucide-svelte';

	interface Props {
		selectedRole?: string;
		onRoleChange?: (role: string) => void;
	}

	let {
		selectedRole = 'Coordenador',
		onRoleChange
	}: Props = $props();

	let isOpen = $state(false);

	const rolesList = [
		{ id: 'Professor', label: 'Professor', desc: 'Turmas, calendário, atas e substituições' },
		{ id: 'Coordenador', label: 'Coordenador', desc: 'Gestão de cursos, turmas, pautas e avisos' },
		{ id: 'Secretaria', label: 'Secretaria', desc: 'Gestão de usuários, salas e logística' },
		{ id: 'NDE', label: 'Membro NDE', desc: 'Compliance regulatório do MEC e atas estruturantes' },
		{ id: 'Direção', label: 'Direção Acadêmica', desc: 'Auditoria institucional e supervisão geral' }
	];

	async function selectRole(role: string) {
		isOpen = false;
		// Persiste a simulação em cookie para que todas as telas e SSR reconheçam
		document.cookie = `dev_simulated_role=${encodeURIComponent(role)}; path=/; max-age=604800; SameSite=Lax`;
		onRoleChange?.(role);
		await invalidateAll();
	}
</script>

<div class="relative font-sans text-xs">
	<!-- [DEV ONLY] Botão Seletor de Perfil Simulado -->
	<button
		type="button"
		onclick={() => (isOpen = !isOpen)}
		class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-dark-surface border border-brand-cyan/40 hover:border-brand-cyan hover:bg-brand-dark-alt transition cursor-pointer text-neutral-white shadow-xs"
		title="Alternar perfil simulado do sistema (Ferramenta de Desenvolvimento)"
	>
		<div class="h-2 w-2 rounded-full bg-brand-cyan animate-pulse"></div>
		<SlidersHorizontal class="h-3.5 w-3.5 text-brand-cyan" />
		<span class="text-neutral-gray-400 font-medium hidden sm:inline">Perfil:</span>
		<strong class="font-bold text-neutral-white">{selectedRole}</strong>
		<ChevronDown class="h-3 w-3 text-neutral-gray-400" />
	</button>

	{#if isOpen}
		<div class="absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 mt-2 w-72 rounded-2xl bg-neutral-white text-neutral-dark shadow-2xl border border-neutral-border-light p-2 z-50">
			<div class="px-3 py-2 border-b border-neutral-border-light flex items-center justify-between">
				<div>
					<span class="text-[10px] uppercase font-bold tracking-wider text-brand-blue block">Ambiente Dev</span>
					<strong class="text-xs font-bold text-brand-dark">Simular Perfil no Sistema</strong>
				</div>
				<span class="text-[10px] bg-brand-cyan/10 text-brand-blue font-bold px-2 py-0.5 rounded-full">Dev Mode</span>
			</div>

			<div class="py-1 space-y-1">
				{#each rolesList as r}
					<button
						type="button"
						onclick={() => selectRole(r.id)}
						class={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition cursor-pointer ${
							selectedRole === r.id
								? 'bg-brand-blue/10 text-brand-dark border border-brand-blue/30 font-bold'
								: 'hover:bg-neutral-surface text-neutral-dark'
						}`}
					>
						<Shield class={`h-4 w-4 mt-0.5 shrink-0 ${selectedRole === r.id ? 'text-brand-blue' : 'text-neutral-gray-400'}`} />
						<div class="flex-1">
							<div class="flex items-center justify-between">
								<span class="text-xs font-bold">{r.label}</span>
								{#if selectedRole === r.id}
									<Check class="h-3.5 w-3.5 text-brand-blue" />
								{/if}
							</div>
							<p class="text-[10px] text-neutral-dark-gray leading-tight mt-0.5">{r.desc}</p>
						</div>
					</button>
				{/each}
			</div>

			<div class="px-3 py-2 border-t border-neutral-border-light bg-neutral-surface/40 rounded-b-xl text-[10px] text-neutral-dark-gray leading-tight">
				Permite testar permissões e telas sem deslogar. Será removido na entrega final.
			</div>
		</div>

		<button type="button" class="fixed inset-0 z-40 bg-transparent cursor-default" onclick={() => (isOpen = false)} aria-label="Fechar"></button>
	{/if}
</div>

