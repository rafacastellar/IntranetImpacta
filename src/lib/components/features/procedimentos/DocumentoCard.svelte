<script lang="ts">
	import { FileText, Download, ArrowUpRight } from 'lucide-svelte';
	import type { DocumentoPolitica } from '$lib/types/procedimentos';

	interface Props {
		documento: DocumentoPolitica;
		onSelectDoc: (doc: DocumentoPolitica) => void;
		onSelectTag: (tag: string) => void;
	}

	let { documento, onSelectDoc, onSelectTag }: Props = $props();

	function getCategoryColor(catNome?: string) {
		switch (catNome) {
			case 'Normas MEC':
				return 'bg-brand-blue/10 text-brand-blue border-brand-blue/20';
			case 'Benefícios':
				return 'bg-brand-purple/10 text-brand-purple border-brand-purple/20';
			case 'Acadêmico':
				return 'bg-brand-dark/10 text-brand-dark border-brand-dark/20';
			case 'Procedimentos Docentes':
			default:
				return 'bg-brand-cyan/15 text-brand-blue-dark border-brand-cyan/30';
		}
	}
</script>

<!-- Container de altura fixa estável no Grid: elimina solavancos e expansão de linhas vizinhas -->
<div class="relative h-[140px] sm:h-[145px] font-sans">
	<!-- Card flutuante: expande apenas sobre si mesmo como overlay (z-30) no mouse-over -->
	<div
		role="button"
		tabindex="0"
		onclick={() => onSelectDoc(documento)}
		onkeydown={(e) => e.key === 'Enter' && onSelectDoc(documento)}
		class="absolute top-0 left-0 right-0 bg-neutral-white rounded-2xl p-4 sm:p-5 border border-neutral-border-light shadow-xs hover:shadow-xl hover:border-brand-blue/60 transition-all duration-300 ease-out z-10 hover:z-30 flex flex-col justify-between group cursor-pointer"
	>
		<div>
			<!-- Cabeçalho Minimalista: Categoria e Acesso Rápido -->
			<div class="flex items-center justify-between gap-2 mb-2">
				<span class={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${getCategoryColor(documento.categoria?.nome)}`}>
					{documento.categoria?.nome || 'Institucional'}
				</span>
				<div class="flex items-center gap-1 text-neutral-gray-400 group-hover:text-brand-blue transition-colors">
					<ArrowUpRight class="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
				</div>
			</div>

			<!-- Título do Documento -->
			<h3 class="text-xs sm:text-sm font-bold text-brand-dark leading-snug line-clamp-2 group-hover:line-clamp-none group-hover:text-brand-blue transition-colors">
				{documento.titulo}
			</h3>

			<!-- Área de Detalhes: Desliza suavemente de cima para baixo no mouse-over -->
			<div class="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
				<div class="overflow-hidden">
					<div class="opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
						<!-- Resumo -->
						{#if documento.resumo}
							<p class="text-xs text-neutral-dark-gray pt-2.5 mt-2 border-t border-neutral-border-light/60 line-clamp-3 leading-relaxed">
								{documento.resumo}
							</p>
						{/if}

						<!-- Palavras-chave / Tags -->
						{#if documento.palavras_chave && documento.palavras_chave.length > 0}
							<div class="flex flex-wrap gap-1 pt-2.5">
								{#each documento.palavras_chave as tag}
									<button
										type="button"
										onclick={(e) => {
											e.stopPropagation();
											onSelectTag(tag);
										}}
										class="text-[10px] font-medium text-neutral-gray-600 bg-neutral-surface hover:bg-brand-blue/10 hover:text-brand-blue px-2 py-0.5 rounded transition cursor-pointer"
									>
										#{tag}
									</button>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<!-- Rodapé Minimalista -->
		<div class="mt-3 pt-2.5 border-t border-neutral-border-light/40 flex items-center justify-between gap-2 text-[11px] text-neutral-gray-400">
			<span class="group-hover:text-brand-blue font-semibold transition-colors flex items-center gap-1">
				<FileText class="h-3.5 w-3.5" /> Acessar tutorial
			</span>

			{#if documento.arquivo_url}
				<a
					href={documento.arquivo_url}
					download
					target="_blank"
					rel="noreferrer"
					onclick={(e) => e.stopPropagation()}
					class="p-1 rounded text-neutral-gray-400 hover:text-brand-blue hover:bg-neutral-surface transition cursor-pointer"
					title="Baixar PDF"
					aria-label="Baixar PDF"
				>
					<Download class="h-3.5 w-3.5" />
				</a>
			{/if}
		</div>
	</div>
</div>
