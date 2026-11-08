<script lang="ts">
	import { enhance } from '$app/forms';
	import { KeyRound, Power, ShieldCheck, Mail } from 'lucide-svelte';
	import type { UsuarioItem } from '$lib/types/gestaoUsuarios';

	interface Props {
		usuarios: UsuarioItem[];
		currentUserId: string;
	}

	let { usuarios, currentUserId }: Props = $props();

	function getInitials(name: string) {
		return name.split(' ').map((n) => n[0]).slice(0, 2).join('');
	}
</script>

<div class="block md:hidden space-y-3 font-sans">
	{#each usuarios as u (u.id)}
		<div class={`bg-neutral-white p-4 rounded-xl border border-neutral-border-light shadow-xs ${!u.ativo ? 'opacity-60' : ''}`}>
			<div class="flex items-start justify-between gap-3 mb-2">
				<div class="flex items-center gap-2.5">
					<div class="h-9 w-9 rounded-xl bg-brand-blue flex items-center justify-center text-xs font-bold text-neutral-white shrink-0">
						{getInitials(u.nome)}
					</div>
					<div>
						<h3 class="text-sm font-bold text-brand-dark leading-snug">{u.nome}</h3>
						<span class="text-[11px] text-neutral-gray-500 font-mono flex items-center gap-1">
							<Mail class="h-3 w-3" /> {u.email}
						</span>
					</div>
				</div>

				{#if u.ativo}
					<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-feedback-success/10 text-feedback-success shrink-0">
						Ativo
					</span>
				{:else}
					<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-surface text-neutral-dark-gray shrink-0">
						Inativo
					</span>
				{/if}
			</div>

			<div class="flex flex-wrap items-center gap-1.5 py-2 border-t border-neutral-border-light text-xs">
				<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-brand-blue/10 text-brand-blue">
					<ShieldCheck class="h-3 w-3" /> {u.perfis?.nome || 'Docente'}
				</span>

				{#if u.usuario_cursos && u.usuario_cursos.length > 0}
					{#each u.usuario_cursos as uc}
						{#if uc.cursos}
							<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-neutral-surface text-neutral-dark">
								{uc.cursos.codigo}
							</span>
						{/if}
					{/each}
				{/if}
			</div>

			<div class="pt-2 border-t border-neutral-border-light flex items-center justify-between text-xs">
				<span class="text-[10px] text-neutral-gray-400">Ações de Gestão:</span>
				<div class="flex items-center gap-2">
					<form method="POST" action="?/resetSenha" use:enhance>
						<input type="hidden" name="id" value={u.id} />
						<input type="hidden" name="nova_senha" value="Impacta@2026" />
						<button
							type="submit"
							class="px-2 py-1 rounded-lg text-xs font-semibold text-brand-blue bg-brand-blue/10 flex items-center gap-1 cursor-pointer"
						>
							<KeyRound class="h-3.5 w-3.5" /> Resetar Senha
						</button>
					</form>

					{#if u.id !== currentUserId}
						<form method="POST" action="?/toggleStatus" use:enhance>
							<input type="hidden" name="id" value={u.id} />
							<button
								type="submit"
								class={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer ${
									u.ativo
										? 'text-feedback-error bg-feedback-error/10'
										: 'text-feedback-success bg-feedback-success/10'
								}`}
							>
								<Power class="h-3.5 w-3.5" />
								{u.ativo ? 'Desativar' : 'Ativar'}
							</button>
						</form>
					{/if}
				</div>
			</div>
		</div>
	{/each}

	{#if usuarios.length === 0}
		<div class="bg-neutral-white p-6 rounded-xl border border-neutral-border-light text-center text-xs text-neutral-gray-500">
			Nenhum usuário encontrado para os filtros aplicados.
		</div>
	{/if}
</div>

