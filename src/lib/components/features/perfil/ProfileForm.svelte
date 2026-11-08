<script lang="ts">
	import { enhance } from '$app/forms';
	import { Save, User, Lock, Eye, EyeOff, CheckCircle, AlertCircle, KeyRound } from 'lucide-svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { PerfilUsuarioData } from '$lib/types/perfil';

	interface Props {
		usuario: PerfilUsuarioData;
		successMessage?: string | null;
		errorMessage?: string | null;
	}

	let { usuario, successMessage, errorMessage }: Props = $props();

	let isSubmitting = $state(false);
	let localSuccess = $state<string | null>(null);
	let localError = $state<string | null>(null);

	let nome = $state('');
	let novaSenha = $state('');
	let confirmarSenha = $state('');
	let showPassword = $state(false);

	$effect(() => {
		nome = usuario.nome || '';
	});
</script>

<div class="bg-neutral-white rounded-2xl p-6 shadow-sm border border-neutral-border-light font-sans">
	<div class="mb-5">
		<h2 class="text-base sm:text-lg font-bold text-brand-dark">Editar Dados Cadastrais</h2>
		<p class="text-xs text-neutral-dark-gray mt-0.5">Gerencie seu nome de exibição acadêmico e credenciais de acesso.</p>
	</div>

	{#if localSuccess || successMessage}
		<div class="mb-4 p-3.5 rounded-xl bg-feedback-success/10 border border-feedback-success/30 flex items-center gap-2.5 text-xs font-semibold text-feedback-success">
			<CheckCircle class="h-4 w-4 shrink-0" />
			<span>{localSuccess || successMessage}</span>
		</div>
	{/if}

	{#if localError || errorMessage}
		<div class="mb-4 p-3.5 rounded-xl bg-feedback-error/10 border border-feedback-error/30 flex items-center gap-2.5 text-xs font-semibold text-feedback-error">
			<AlertCircle class="h-4 w-4 shrink-0" />
			<span>{localError || errorMessage}</span>
		</div>
	{/if}

	<form
		method="POST"
		action="?/updatePerfil"
		use:enhance={() => {
			isSubmitting = true;
			localSuccess = null;
			localError = null;
			return async ({ result, update }) => {
				isSubmitting = false;
				if (result.type === 'success' && result.data?.message) {
					localSuccess = result.data.message as string;
					novaSenha = '';
					confirmarSenha = '';
				} else if (result.type === 'failure' && result.data?.error) {
					localError = result.data.error as string;
				}
				await update({ reset: false });
			};
		}}
		class="space-y-4"
	>
		<div>
			<label for="nome" class="block text-xs font-bold text-neutral-dark mb-1">Nome Completo *</label>
			<div class="relative flex items-center">
				<User class="absolute left-3.5 h-4 w-4 text-neutral-gray-400 pointer-events-none" />
				<input id="nome" name="nome" type="text" required bind:value={nome} class="w-full rounded-xl border border-neutral-border bg-neutral-white pl-10 pr-3.5 py-2.5 text-sm text-neutral-dark focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition" />
			</div>
			<p class="text-[11px] text-neutral-gray-500 mt-1">Nome utilizado em atas, convocações de reuniões e avisos da intranet.</p>
		</div>

		<div class="pt-3 border-t border-neutral-border-light">
			<div class="flex items-center gap-2 mb-2.5">
				<KeyRound class="h-4 w-4 text-brand-blue" />
				<h3 class="text-xs font-bold text-brand-dark uppercase tracking-wide">Alterar Senha de Acesso</h3>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
				<div>
					<label for="nova_senha" class="block text-xs font-bold text-neutral-dark mb-1">Nova Senha</label>
					<div class="relative flex items-center">
						<Lock class="absolute left-3.5 h-4 w-4 text-neutral-gray-400 pointer-events-none" />
						<input id="nova_senha" name="nova_senha" type={showPassword ? 'text' : 'password'} bind:value={novaSenha} placeholder="Mínimo 6 caracteres" class="w-full rounded-xl border border-neutral-border bg-neutral-white pl-10 pr-10 py-2.5 text-sm text-neutral-dark focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition" />
						<button type="button" onclick={() => (showPassword = !showPassword)} class="absolute right-3 text-neutral-gray-400 hover:text-neutral-dark cursor-pointer p-1" aria-label="Exibir/ocultar senha">
							{#if showPassword}<EyeOff class="h-4 w-4" />{:else}<Eye class="h-4 w-4" />{/if}
						</button>
					</div>
				</div>

				<div>
					<label for="confirmar_senha" class="block text-xs font-bold text-neutral-dark mb-1">Confirmar Senha</label>
					<div class="relative flex items-center">
						<Lock class="absolute left-3.5 h-4 w-4 text-neutral-gray-400 pointer-events-none" />
						<input id="confirmar_senha" name="confirmar_senha" type={showPassword ? 'text' : 'password'} bind:value={confirmarSenha} placeholder="Repita a senha" class="w-full rounded-xl border border-neutral-border bg-neutral-white pl-10 pr-3.5 py-2.5 text-sm text-neutral-dark focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition" />
					</div>
				</div>
			</div>
			<p class="text-[11px] text-neutral-gray-500 mt-1">Deixe em branco para manter a senha atual.</p>
		</div>

		<div class="pt-2 flex justify-end">
			<Button type="submit" variant="primary" size="md" loading={isSubmitting}>
				{#snippet leftIcon()}<Save class="h-4 w-4" />{/snippet}
				Salvar Alterações
			</Button>
		</div>
	</form>
</div>
