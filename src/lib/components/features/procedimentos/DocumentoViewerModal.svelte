<script lang="ts">
	import { X, Download, ShieldCheck, Calendar, BookOpen } from 'lucide-svelte';
	import type { DocumentoPolitica } from '$lib/types/procedimentos';
	import Button from '$lib/components/ui/Button.svelte';

	interface Props {
		documento: DocumentoPolitica | null;
		isOpen: boolean;
		onclose: () => void;
	}

	let { documento, isOpen, onclose }: Props = $props();
</script>

{#if isOpen && documento}
	<!-- Backdrop -->
	<button
		type="button"
		class="fixed inset-0 bg-neutral-black/60 backdrop-blur-xs z-50 transition-opacity cursor-default"
		onclick={onclose}
		aria-label="Fechar visualizador"
	></button>

	<!-- Modal Dialog -->
	<div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-none font-sans">
		<div class="bg-neutral-white rounded-2xl shadow-2xl border border-neutral-border-light max-w-2xl w-full max-h-[85vh] flex flex-col pointer-events-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150">
			<!-- Topo do Modal -->
			<div class="p-5 sm:p-6 bg-brand-dark text-neutral-white border-b border-brand-dark-surface flex items-start justify-between gap-4">
				<div>
					<div class="flex items-center gap-2 mb-2">
						<span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-dark-surface text-brand-cyan border border-brand-cyan/20">
							{documento.categoria?.nome || 'Institucional'}
						</span>
						<span class="text-xs text-neutral-gray-300 flex items-center gap-1">
							<ShieldCheck class="h-3.5 w-3.5 text-brand-cyan" /> Homologado Impacta
						</span>
					</div>
					<h2 class="text-base sm:text-lg font-bold tracking-tight text-neutral-white leading-snug">
						{documento.titulo}
					</h2>
				</div>

				<button
					type="button"
					onclick={onclose}
					class="p-1.5 rounded-lg text-neutral-gray-300 hover:text-neutral-white hover:bg-brand-dark-alt transition cursor-pointer"
					aria-label="Fechar"
				>
					<X class="h-5 w-5" />
				</button>
			</div>

			<!-- Conteúdo do Tutorial / Documento -->
			<div class="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm text-neutral-dark">
				<!-- Resumo em Destaque -->
				{#if documento.resumo}
					<div class="p-3.5 rounded-xl bg-neutral-surface/60 border border-neutral-border-light text-xs text-neutral-dark-gray italic">
						{documento.resumo}
					</div>
				{/if}

				<!-- Corpo HTML do Procedimento -->
				<div class="prose prose-xs sm:prose-sm max-w-none text-neutral-dark space-y-3 leading-relaxed">
					{@html documento.conteudo_html || '<p>Nenhum conteúdo adicional registrado.</p>'}
				</div>

				<!-- Tags -->
				{#if documento.palavras_chave && documento.palavras_chave.length > 0}
					<div class="pt-4 border-t border-neutral-border-light flex flex-wrap gap-1.5">
						{#each documento.palavras_chave as tag}
							<span class="text-[10px] font-semibold text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded">
								#{tag}
							</span>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Rodapé com Ações -->
			<div class="p-4 bg-neutral-surface/40 border-t border-neutral-border-light flex items-center justify-between gap-3">
				<span class="text-[11px] text-neutral-dark-gray">
					Regulamento Interno & Gestão de Qualidade Acadêmica
				</span>

				<div class="flex items-center gap-2">
					{#if documento.arquivo_url}
						<a
							href={documento.arquivo_url}
							download
							target="_blank"
							rel="noreferrer"
							class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-border-light bg-neutral-white text-xs font-semibold text-neutral-dark hover:bg-neutral-surface transition shadow-xs"
						>
							<Download class="h-3.5 w-3.5 text-brand-blue" /> Baixar PDF
						</a>
					{/if}
					<Button variant="outline" size="sm" onclick={onclose}>Fechar</Button>
				</div>
			</div>
		</div>
	</div>
{/if}

