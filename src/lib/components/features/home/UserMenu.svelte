<script lang="ts">
	import { User, LogOut, ChevronDown } from 'lucide-svelte';

	interface Props {
		userName?: string;
		selectedRole?: string;
		roles?: string[];
		onRoleSelect?: (role: string) => void;
	}

	let {
		userName = 'Prof. Carlos Eduardo Silveira',
		selectedRole = 'Coordenador',
		roles = ['Professor', 'Coordenador', 'NDE', 'Secretaria'],
		onRoleSelect
	}: Props = $props();

	let isOpen = $state(false);

	function close() {
		isOpen = false;
	}
</script>

<div class="relative font-sans">
	<button
		type="button"
		onclick={() => (isOpen = !isOpen)}
		class="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-brand-blue/40 transition cursor-pointer"
		aria-label="Perfil do Usuário"
	>
		<div class="h-8 w-8 rounded-full bg-brand-blue flex items-center justify-center text-xs font-bold text-neutral-white border border-brand-cyan/40 shadow-xs">
			{userName.split(' ').map((n) => n[0]).slice(0, 2).join('')}
		</div>
		<ChevronDown class="h-3.5 w-3.5 text-neutral-gray-400 hidden sm:inline" />
	</button>

	{#if isOpen}
		<div class="absolute right-0 mt-2 w-60 rounded-xl bg-neutral-white text-neutral-dark shadow-xl border border-neutral-border-light py-2 z-50">
			<div class="px-4 py-2.5 border-b border-neutral-border-light">
				<h6 class="text-xs font-bold text-brand-dark truncate">{userName}</h6>
				<span class="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-brand-blue/10 text-brand-blue">
					{selectedRole}
				</span>
			</div>

			<!-- Seletor em Mobile -->
			<div class="md:hidden px-4 py-2 border-b border-neutral-border-light">
				<span class="text-[10px] uppercase font-bold text-neutral-gray-400 block mb-1">Alternar Visão:</span>
				<div class="grid grid-cols-2 gap-1">
					{#each roles as r}
						<button
							type="button"
							onclick={() => { onRoleSelect?.(r); close(); }}
							class={`px-2 py-1 text-[11px] rounded font-semibold text-center cursor-pointer ${
								selectedRole === r ? 'bg-brand-blue text-neutral-white' : 'bg-neutral-surface text-neutral-dark'
							}`}
						>
							{r}
						</button>
					{/each}
				</div>
			</div>

			<ul class="py-1 text-xs">
				<li>
					<a href="/meu-perfil" onclick={close} class="flex items-center gap-2 px-4 py-2 hover:bg-neutral-surface text-neutral-dark font-medium transition">
						<User class="h-4 w-4 text-neutral-gray-500" /> Meu Perfil
					</a>
				</li>
			</ul>

			<div class="pt-1 mt-1 border-t border-neutral-border-light px-2">
				<form action="/logout" method="POST" class="w-full">
					<button
						type="submit"
						class="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-feedback-error hover:bg-feedback-error/10 text-xs font-semibold transition text-left cursor-pointer"
					>
						<LogOut class="h-4 w-4" /> Encerrar Sessão
					</button>
				</form>
			</div>
		</div>

		<button type="button" class="fixed inset-0 z-40 bg-transparent cursor-default" onclick={close} aria-label="Fechar"></button>
	{/if}
</div>
