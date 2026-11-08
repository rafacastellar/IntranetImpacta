<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { X, Plus, BookOpen } from 'lucide-svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { CategoriaDocumento } from '$lib/types/procedimentos';

	interface Props {
		isOpen: boolean;
		categorias: CategoriaDocumento[];
	}

	let { isOpen = $bindable(false), categorias }: Props = $props();

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
		<div class="bg-neutral-white rounded-2xl shadow-2xl border border-neutral-border-light max-w-lg w-full pointer-events-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150">
			<div class="p-5 bg-brand-dark text-neutral-white flex items-center justify-between">
				<div class="flex items-center gap-2">
					<BookOpen class="h-5 w-5 text-brand-cyan" />
					<h3 class="text-base font-bold">Cadastrar Novo Tutorial ou Norma</h3>
				</div>
				<button type="button" onclick={close} class="p-1 rounded text-neutral-gray-300 hover:text-neutral-white cursor-pointer" aria-label="Fechar">
					<X class="h-5 w-5" />
				</button>
			</div>

			<form
				method="POST"
				action="?/criarDocumento"
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
				<div>
					<label for="titulo" class="block font-bold text-neutral-dark-gray mb-1">Título do Documento *</label>
					<input id="titulo" name="titulo" type="text" required placeholder="Ex: Guia Prático de Faltas e Abonos" class="w-full px-3 py-2 rounded-xl border border-neutral-border-light bg-neutral-surface/30 focus:outline-none focus:ring-2 focus:ring-brand-blue/30" />
				</div>

				<div>
					<label for="categoria_id" class="block font-bold text-neutral-dark-gray mb-1">Categoria *</label>
					<select id="categoria_id" name="categoria_id" required class="w-full px-3 py-2 rounded-xl border border-neutral-border-light bg-neutral-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30">
						{#each categorias as cat}
							<option value={cat.id}>{cat.nome}</option>
						{/each}
					</select>
				</div>

				<div>
					<label for="resumo" class="block font-bold text-neutral-dark-gray mb-1">Resumo Executivo *</label>
					<textarea id="resumo" name="resumo" rows="2" required placeholder="Breve resumo orientativo do procedimento..." class="w-full px-3 py-2 rounded-xl border border-neutral-border-light bg-neutral-surface/30 focus:outline-none focus:ring-2 focus:ring-brand-blue/30"></textarea>
				</div>

				<div>
					<label for="conteudo_html" class="block font-bold text-neutral-dark-gray mb-1">Orientações Detalhadas (HTML/Texto)</label>
					<textarea id="conteudo_html" name="conteudo_html" rows="4" placeholder="Passo a passo, prazos e regras operacionais..." class="w-full px-3 py-2 rounded-xl border border-neutral-border-light bg-neutral-surface/30 focus:outline-none focus:ring-2 focus:ring-brand-blue/30"></textarea>
				</div>

				<div>
					<label for="palavras_chave" class="block font-bold text-neutral-dark-gray mb-1">Palavras-chave (separadas por vírgula)</label>
					<input id="palavras_chave" name="palavras_chave" type="text" placeholder="ex: faltas, abono, atestado, secretaria" class="w-full px-3 py-2 rounded-xl border border-neutral-border-light bg-neutral-surface/30 focus:outline-none focus:ring-2 focus:ring-brand-blue/30" />
				</div>

				<div class="pt-3 border-t border-neutral-border-light flex items-center justify-end gap-2">
					<Button variant="outline" size="sm" type="button" onclick={close}>Cancelar</Button>
					<Button variant="primary" size="sm" type="submit" disabled={isSubmitting}>
						{isSubmitting ? 'Salvando...' : 'Publicar Documento'}
					</Button>
				</div>
			</form>
		</div>
	</div>
{/if}

