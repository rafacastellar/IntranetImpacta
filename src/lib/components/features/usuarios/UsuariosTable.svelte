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

<div class="hidden md:block bg-neutral-white rounded-2xl shadow-sm border border-neutral-border-light overflow-hidden font-sans">
	<div class="overflow-x-auto">
		<table class="w-full text-left text-xs">
			<thead class="bg-neutral-surface/60 text-neutral-dark-gray uppercase text-[10px] tracking-wider border-b border-neutral-border-light">
				<tr>
					<th class="px-5 py-3.5 font-bold">Usuário</th>
					<th class="px-4 py-3.5 font-bold">Perfil Principal</th>
					<th class="px-4 py-3.5 font-bold">Cursos</th>
					<th class="px-4 py-3.5 font-bold">Status</th>
					<th class="px-4 py-3.5 font-bold text-right">Ações</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-neutral-border-light">
				{#each usuarios as u (u.id)}
					<tr class={`hover:bg-neutral-surface/30 transition ${!u.ativo ? 'opacity-60 bg-neutral-surface/10' : ''}`}>
						<td class="px-5 py-4">
							<div class="flex items-center gap-3">
								<div class="h-9 w-9 rounded-xl bg-brand-blue flex items-center justify-center text-xs font-bold text-neutral-white shrink-0">
									{getInitials(u.nome)}
								</div>
								<div>
									<strong class="text-sm font-bold text-brand-dark block truncate">{u.nome}</strong>
									<span class="text-[11px] text-neutral-gray-500 flex items-center gap-1 font-mono">
										<Mail class="h-3 w-3" /> {u.email}
									</span>
								</div>
							</div>
						</td>

						<td class="px-4 py-4">
							<div class="flex flex-wrap gap-1">
								<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-brand-blue/10 text-brand-blue">
									<ShieldCheck class="h-3 w-3" />
									{u.perfis?.nome || 'Docente'}
								</span>
							</div>
						</td>

						<td class="px-4 py-4">
							<div class="flex flex-wrap gap-1 max-w-xs">
								{#if u.usuario_cursos && u.usuario_cursos.length > 0}
									{#each u.usuario_cursos as uc}
										{#if uc.cursos}
											<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-neutral-surface text-neutral-dark">
												{uc.cursos.codigo}
											</span>
										{/if}
									{/each}
								{:else}
									<span class="text-[11px] text-neutral-gray-400">Geral</span>
								{/if}
							</div>
						</td>

						<td class="px-4 py-4">
							{#if u.ativo}
								<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-feedback-success/10 text-feedback-success">
									Ativo
								</span>
							{:else}
								<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-surface text-neutral-dark-gray">
									Inativo
								</span>
							{/if}
						</td>

						<td class="px-4 py-4 text-right">
							<div class="flex items-center justify-end gap-1.5">
								<!-- Resetar Senha -->
								<form method="POST" action="?/resetSenha" use:enhance>
									<input type="hidden" name="id" value={u.id} />
									<input type="hidden" name="nova_senha" value="Impacta@2026" />
									<button
										type="submit"
										title="Redefinir senha para padrão (Impacta@2026)"
										class="p-1.5 rounded-lg text-neutral-dark-gray hover:text-brand-blue hover:bg-neutral-surface transition cursor-pointer"
									>
										<KeyRound class="h-4 w-4" />
									</button>
								</form>

								<!-- Ativar/Desativar -->
								{#if u.id !== currentUserId}
									<form method="POST" action="?/toggleStatus" use:enhance>
										<input type="hidden" name="id" value={u.id} />
										<button
											type="submit"
											title={u.ativo ? 'Desativar usuário' : 'Ativar usuário'}
											class={`p-1.5 rounded-lg transition cursor-pointer ${
												u.ativo ? 'text-feedback-error hover:bg-feedback-error/10' : 'text-feedback-success hover:bg-feedback-success/10'
											}`}
										>
											<Power class="h-4 w-4" />
										</button>
									</form>
								{/if}
							</div>
						</td>
					</tr>
				{/each}

				{#if usuarios.length === 0}
					<tr>
						<td colspan="5" class="p-8 text-center text-neutral-gray-500">
							Nenhum usuário encontrado para os filtros aplicados.
						</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
</div>

