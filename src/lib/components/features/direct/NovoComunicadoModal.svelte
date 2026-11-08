<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { X, Send, Target } from 'lucide-svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { PerfilOption, CursoOption, TurmaOption } from '$lib/types/impactaDirect';

	interface Props {
		isOpen: boolean;
		perfis: PerfilOption[];
		cursos: CursoOption[];
		turmas: TurmaOption[];
	}

	let { isOpen = $bindable(false), perfis, cursos, turmas }: Props = $props();

	let isSubmitting = $state(false);
	let alvoTipo = $state<'TODOS' | 'PERFIL' | 'CURSO' | 'TURMA'>('TODOS');

	function close() {
		isOpen = false;
	}
</script>

{#if isOpen}
	<button
		type="button"
		class="fixed inset-0 bg-neutral-black/60 backdrop-blur-xs z-50 transition-opacity cursor-default"
		onclick={close}
		aria-label="Fechar modal"
	></button>

	<div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-none font-sans">
		<div class="bg-neutral-white rounded-2xl shadow-2xl border border-neutral-border-light max-w-lg w-full pointer-events-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150">
			<!-- Topo -->
			<div class="p-5 bg-brand-dark text-neutral-white flex items-center justify-between">
				<div class="flex items-center gap-2">
					<Send class="h-5 w-5 text-brand-cyan" />
					<h3 class="text-base font-bold">Enviar Mensagem Direta / Convite</h3>
				</div>
				<button type="button" onclick={close} class="p-1 rounded text-neutral-gray-300 hover:text-neutral-white cursor-pointer" aria-label="Fechar">
					<X class="h-5 w-5" />
				</button>
			</div>

			<!-- Formulário -->
			<form
				method="POST"
				action="?/enviarComunicado"
				use:enhance={() => {
					isSubmitting = true;
					return async ({ result, update }) => {
						isSubmitting = false;
						if (result.type === 'success') {
							await invalidateAll();
							close();
						} else {
							await update();
						}
					};
				}}
				class="p-5 space-y-3.5 text-xs text-neutral-dark"
			>
				<!-- Segmentação por Público -->
				<div>
					<label for="alvo_tipo" class="block font-bold text-neutral-dark-gray mb-1">
						Público Alvo (Segmentação) *
					</label>
					<select
						id="alvo_tipo"
						name="alvo_tipo"
						bind:value={alvoTipo}
						class="w-full px-3 py-2 rounded-xl border border-neutral-border-light bg-neutral-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 font-semibold"
					>
						<option value="TODOS">Todos os Docentes (Geral)</option>
						<option value="PERFIL">Por Perfil (ex: Membros do NDE, Professores)</option>
						<option value="CURSO">Por Curso Específico (ex: ADS, Engenharia)</option>
						<option value="TURMA">Por Turma Específica</option>
					</select>
				</div>

				<!-- Seletor Condicional de Perfil -->
				{#if alvoTipo === 'PERFIL'}
					<div>
						<label for="perfil_id_alvo" class="block font-bold text-neutral-dark-gray mb-1">Selecione o Perfil *</label>
						<select id="perfil_id_alvo" name="perfil_id_alvo" required class="w-full px-3 py-2 rounded-xl border border-neutral-border-light bg-neutral-surface/30">
							{#each perfis as p}
								<option value={p.id}>{p.nome}</option>
							{/each}
						</select>
					</div>
				{/if}

				<!-- Seletor Condicional de Curso -->
				{#if alvoTipo === 'CURSO'}
					<div>
						<label for="curso_id_alvo" class="block font-bold text-neutral-dark-gray mb-1">Selecione o Curso *</label>
						<select id="curso_id_alvo" name="curso_id_alvo" required class="w-full px-3 py-2 rounded-xl border border-neutral-border-light bg-neutral-surface/30">
							{#each cursos as c}
								<option value={c.id}>{c.codigo} — {c.nome}</option>
							{/each}
						</select>
					</div>
				{/if}

				<!-- Seletor Condicional de Turma -->
				{#if alvoTipo === 'TURMA'}
					<div>
						<label for="turma_id_alvo" class="block font-bold text-neutral-dark-gray mb-1">Selecione a Turma *</label>
						<select id="turma_id_alvo" name="turma_id_alvo" required class="w-full px-3 py-2 rounded-xl border border-neutral-border-light bg-neutral-surface/30">
							{#each turmas as t}
								<option value={t.id}>{t.codigo} ({t.turno})</option>
							{/each}
						</select>
					</div>
				{/if}

				<div>
					<label for="titulo" class="block font-bold text-neutral-dark-gray mb-1">Assunto / Título *</label>
					<input id="titulo" name="titulo" type="text" required placeholder="Ex: Pauta da Reunião de Validação do NDE" class="w-full px-3 py-2 rounded-xl border border-neutral-border-light bg-neutral-surface/30 focus:outline-none focus:ring-2 focus:ring-brand-blue/30" />
				</div>

				<div>
					<label for="mensagem" class="block font-bold text-neutral-dark-gray mb-1">Mensagem ou Convite *</label>
					<textarea id="mensagem" name="mensagem" rows="4" required placeholder="Escreva a mensagem, pauta ou detalhes do convite..." class="w-full px-3 py-2 rounded-xl border border-neutral-border-light bg-neutral-surface/30 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 leading-relaxed"></textarea>
				</div>

				<div class="pt-3 border-t border-neutral-border-light flex items-center justify-end gap-2">
					<Button variant="outline" size="sm" type="button" onclick={close}>Cancelar</Button>
					<Button variant="primary" size="sm" type="submit" disabled={isSubmitting}>
						{isSubmitting ? 'Enviando...' : 'Enviar Comunicado'}
					</Button>
				</div>
			</form>
		</div>
	</div>
{/if}

