<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { X, Calendar, Plus, Users, Clock } from 'lucide-svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { CursoOption, UsuarioOption } from '$lib/types/reunioesAtas';

	interface Props {
		isOpen: boolean;
		cursos: CursoOption[];
		usuarios: UsuarioOption[];
	}

	let { isOpen = $bindable(false), cursos, usuarios }: Props = $props();

	let isSubmitting = $state(false);

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
		<div class="bg-neutral-white rounded-2xl shadow-2xl border border-neutral-border-light max-w-xl w-full max-h-[90vh] flex flex-col pointer-events-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150">
			<!-- Topo -->
			<div class="p-5 bg-brand-dark text-neutral-white flex items-center justify-between shrink-0">
				<div class="flex items-center gap-2">
					<Calendar class="h-5 w-5 text-brand-purple" />
					<h3 class="text-base font-bold">Agendar Nova Reunião Acadêmica</h3>
				</div>
				<button type="button" onclick={close} class="p-1 rounded text-neutral-gray-300 hover:text-neutral-white cursor-pointer" aria-label="Fechar">
					<X class="h-5 w-5" />
				</button>
			</div>

			<!-- Formulário com Scroll -->
			<form
				method="POST"
				action="?/agendarReuniao"
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
				class="p-5 space-y-3.5 text-xs text-neutral-dark overflow-y-auto flex-1"
			>
				<div>
					<label for="titulo" class="block font-bold text-neutral-dark-gray mb-1">Título da Reunião *</label>
					<input id="titulo" name="titulo" type="text" required placeholder="Ex: 5ª Reunião Ordinária do NDE — ADS 2026/1" class="w-full px-3 py-2 rounded-xl border border-neutral-border-light bg-neutral-surface/30 focus:outline-none focus:ring-2 focus:ring-brand-purple/30 font-semibold" />
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<div>
						<label for="tipo_reuniao" class="block font-bold text-neutral-dark-gray mb-1">Tipo de Órgão *</label>
						<select id="tipo_reuniao" name="tipo_reuniao" required class="w-full px-3 py-2 rounded-xl border border-neutral-border-light bg-neutral-white focus:outline-none focus:ring-2 focus:ring-brand-purple/30">
							<option value="NDE">NDE (Núcleo Docente Estruturante)</option>
							<option value="Colegiado">Colegiado de Curso</option>
							<option value="Docente">Reunião Docente de Área</option>
							<option value="Geral">Reunião Geral</option>
						</select>
					</div>

					<div>
						<label for="curso_id" class="block font-bold text-neutral-dark-gray mb-1">Curso Vinculado</label>
						<select id="curso_id" name="curso_id" class="w-full px-3 py-2 rounded-xl border border-neutral-border-light bg-neutral-white focus:outline-none focus:ring-2 focus:ring-brand-purple/30">
							<option value="">Geral (Todos os Cursos)</option>
							{#each cursos as c}
								<option value={c.id}>{c.codigo} — {c.nome}</option>
							{/each}
						</select>
					</div>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<div>
						<label for="data_inicio" class="block font-bold text-neutral-dark-gray mb-1">Data e Hora de Início *</label>
						<input id="data_inicio" name="data_inicio" type="datetime-local" required class="w-full px-3 py-2 rounded-xl border border-neutral-border-light bg-neutral-surface/30 focus:outline-none focus:ring-2 focus:ring-brand-purple/30" />
					</div>

					<div>
						<label for="data_fim" class="block font-bold text-neutral-dark-gray mb-1">Data e Hora de Término *</label>
						<input id="data_fim" name="data_fim" type="datetime-local" required class="w-full px-3 py-2 rounded-xl border border-neutral-border-light bg-neutral-surface/30 focus:outline-none focus:ring-2 focus:ring-brand-purple/30" />
					</div>
				</div>

				<div>
					<label for="local_link" class="block font-bold text-neutral-dark-gray mb-1">Local Físico ou Link da Videoconferência</label>
					<input id="local_link" name="local_link" type="text" placeholder="Ex: https://teams.microsoft.com/... ou Sala 402 - Bloco B" class="w-full px-3 py-2 rounded-xl border border-neutral-border-light bg-neutral-surface/30 focus:outline-none focus:ring-2 focus:ring-brand-purple/30" />
				</div>

				<div>
					<label for="pauta_previa" class="block font-bold text-neutral-dark-gray mb-1">Pauta Prévia da Reunião (Tópicos a Tratar) *</label>
					<textarea id="pauta_previa" name="pauta_previa" rows="3" required placeholder="1. Avaliação do simulado PAI&#10;2. Adequação da bibliografia&#10;3. Planejamento das oficinas..." class="w-full px-3 py-2 rounded-xl border border-neutral-border-light bg-neutral-surface/30 focus:outline-none focus:ring-2 focus:ring-brand-purple/30 leading-relaxed"></textarea>
				</div>

				<!-- Participantes Convocados -->
				<div>
					<span class="block font-bold text-neutral-dark-gray mb-1">Convocação de Docentes & Membros do NDE:</span>
					<div class="max-h-32 overflow-y-auto p-2.5 rounded-xl border border-neutral-border-light bg-neutral-surface/20 space-y-1.5">
						{#each usuarios as u}
							<label class="flex items-center gap-2 text-xs cursor-pointer hover:bg-neutral-surface/60 p-1 rounded">
								<input type="checkbox" name="participantes" value={u.id} checked class="rounded border-neutral-border text-brand-purple focus:ring-brand-purple" />
								<span class="font-medium text-neutral-dark">{u.nome}</span>
								<span class="text-[10px] text-neutral-gray-400">({u.email})</span>
							</label>
						{/each}
					</div>
				</div>

				<div class="pt-3 border-t border-neutral-border-light flex items-center justify-end gap-2 shrink-0">
					<Button variant="outline" size="sm" type="button" onclick={close}>Cancelar</Button>
					<Button variant="primary" size="sm" type="submit" disabled={isSubmitting}>
						{isSubmitting ? 'Agendando...' : 'Agendar & Notificar Convocados'}
					</Button>
				</div>
			</form>
		</div>
	</div>
{/if}

