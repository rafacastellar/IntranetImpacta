<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { UserPlus, User, Mail, Lock, Shield, AlertCircle } from 'lucide-svelte';
	import Modal from '$lib/components/ui/Modal.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { PerfilOption, CursoOption } from '$lib/types/gestaoUsuarios';

	interface Props {
		isOpen: boolean;
		perfis: PerfilOption[];
		cursos: CursoOption[];
	}

	let { isOpen = $bindable(false), perfis, cursos }: Props = $props();

	let isSubmitting = $state(false);
	let errorMessage = $state<string | null>(null);

	let nome = $state('');
	let email = $state('');
	let senha = $state('Impacta@2026');
	let perfilId = $state<number>(1);
	let selectedCursos = $state<number[]>([]);

	function toggleCurso(id: number) {
		if (selectedCursos.includes(id)) {
			selectedCursos = selectedCursos.filter((c) => c !== id);
		} else {
			selectedCursos = [...selectedCursos, id];
		}
	}
</script>

<Modal bind:isOpen title="Cadastrar Novo Usuário">
	{#if errorMessage}
		<div class="mb-4 p-3 rounded-xl bg-feedback-error/10 border border-feedback-error/30 text-xs text-feedback-error flex items-center gap-2">
			<AlertCircle class="h-4 w-4 shrink-0" />
			<span>{errorMessage}</span>
		</div>
	{/if}

	<form
		method="POST"
		action="?/criarUsuario"
		use:enhance={() => {
			isSubmitting = true;
			errorMessage = null;
			return async ({ result, update }) => {
				isSubmitting = false;
				if (result.type === 'success') {
					nome = '';
					email = '';
					senha = 'Impacta@2026';
					selectedCursos = [];
					isOpen = false;
					await invalidateAll();
				} else if (result.type === 'failure' && result.data?.error) {
					errorMessage = result.data.error as string;
				}
				await update();
			};
		}}
		class="space-y-4 font-sans text-xs"
	>
		<div>
			<label for="modal-nome" class="block font-bold text-neutral-dark mb-1">Nome Completo *</label>
			<div class="relative flex items-center">
				<User class="absolute left-3.5 h-4 w-4 text-neutral-gray-400 pointer-events-none" />
				<input id="modal-nome" name="nome" type="text" required bind:value={nome} placeholder="Ex: Prof. Mariana Costa" class="w-full rounded-xl border border-neutral-border bg-neutral-white pl-10 pr-3.5 py-2 text-sm text-neutral-dark focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition" />
			</div>
		</div>

		<div>
			<label for="modal-email" class="block font-bold text-neutral-dark mb-1">E-mail Institucional *</label>
			<div class="relative flex items-center">
				<Mail class="absolute left-3.5 h-4 w-4 text-neutral-gray-400 pointer-events-none" />
				<input id="modal-email" name="email" type="email" required bind:value={email} placeholder="mariana.costa@impacta.edu.br" class="w-full rounded-xl border border-neutral-border bg-neutral-white pl-10 pr-3.5 py-2 text-sm text-neutral-dark focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition" />
			</div>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
			<div>
				<label for="modal-perfil" class="block font-bold text-neutral-dark mb-1">Perfil de Acesso *</label>
				<div class="relative flex items-center">
					<Shield class="absolute left-3.5 h-4 w-4 text-neutral-gray-400 pointer-events-none" />
					<select id="modal-perfil" name="perfil_id" bind:value={perfilId} class="w-full rounded-xl border border-neutral-border bg-neutral-white pl-10 pr-3.5 py-2 text-sm text-neutral-dark focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition">
						{#each perfis as p}
							<option value={p.id}>{p.nome}</option>
						{/each}
					</select>
				</div>
			</div>

			<div>
				<label for="modal-senha" class="block font-bold text-neutral-dark mb-1">Senha Inicial *</label>
				<div class="relative flex items-center">
					<Lock class="absolute left-3.5 h-4 w-4 text-neutral-gray-400 pointer-events-none" />
					<input id="modal-senha" name="senha" type="text" required bind:value={senha} class="w-full rounded-xl border border-neutral-border bg-neutral-white pl-10 pr-3.5 py-2 text-sm text-neutral-dark focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition" />
				</div>
			</div>
		</div>

		<div>
			<span class="block font-bold text-neutral-dark mb-1.5">Vincular a Cursos:</span>
			<div class="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto p-2 bg-neutral-surface/40 rounded-xl border border-neutral-border-light">
				{#each cursos as c}
					<label class="flex items-center gap-2 p-1.5 rounded-lg hover:bg-neutral-surface cursor-pointer text-xs">
						<input type="checkbox" name="cursos" value={c.id} checked={selectedCursos.includes(c.id)} onchange={() => toggleCurso(c.id)} class="rounded text-brand-blue focus:ring-brand-blue" />
						<span class="font-bold text-brand-blue">{c.codigo}</span>
						<span class="truncate text-neutral-dark-gray">{c.nome}</span>
					</label>
				{/each}
			</div>
		</div>

		<div class="pt-3 flex justify-end gap-2 border-t border-neutral-border-light">
			<Button type="button" variant="outline" size="md" onclick={() => (isOpen = false)}>Cancelar</Button>
			<Button type="submit" variant="primary" size="md" loading={isSubmitting}>
				{#snippet leftIcon()}<UserPlus class="h-4 w-4" />{/snippet}
				Salvar Usuário
			</Button>
		</div>
	</form>
</Modal>
