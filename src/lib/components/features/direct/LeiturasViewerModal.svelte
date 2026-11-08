<script lang="ts">
	import { X, CheckCircle2, User, Clock } from 'lucide-svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { ComunicadoItem } from '$lib/types/impactaDirect';

	interface Props {
		comunicado: ComunicadoItem | null;
		isOpen: boolean;
		onclose: () => void;
	}

	let { comunicado, isOpen, onclose }: Props = $props();

	function formatDateTime(iso: string) {
		try {
			return new Date(iso).toLocaleString('pt-BR', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			});
		} catch {
			return iso;
		}
	}
</script>

{#if isOpen && comunicado}
	<button
		type="button"
		class="fixed inset-0 bg-neutral-black/60 backdrop-blur-xs z-50 transition-opacity cursor-default"
		onclick={onclose}
		aria-label="Fechar modal"
	></button>

	<div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-none font-sans">
		<div class="bg-neutral-white rounded-2xl shadow-2xl border border-neutral-border-light max-w-md w-full pointer-events-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150">
			<!-- Topo -->
			<div class="p-5 bg-brand-dark text-neutral-white flex items-center justify-between">
				<div class="flex items-center gap-2">
					<CheckCircle2 class="h-5 w-5 text-feedback-success" />
					<h3 class="text-base font-bold">Confirmações de Leitura</h3>
				</div>
				<button type="button" onclick={onclose} class="p-1 rounded text-neutral-gray-300 hover:text-neutral-white cursor-pointer" aria-label="Fechar">
					<X class="h-5 w-5" />
				</button>
			</div>

			<!-- Conteúdo -->
			<div class="p-5 space-y-3 max-h-96 overflow-y-auto text-xs text-neutral-dark">
				<div>
					<span class="text-[10px] uppercase font-bold text-neutral-gray-400 block">Assunto:</span>
					<strong class="text-brand-dark text-xs">{comunicado.titulo}</strong>
				</div>

				<div class="pt-2 border-t border-neutral-border-light">
					<span class="text-xs font-bold text-neutral-dark-gray block mb-2">
						Docentes que confirmaram leitura ({comunicado.comunicado_leituras?.length || 0}):
					</span>

					{#if comunicado.comunicado_leituras && comunicado.comunicado_leituras.length > 0}
						<ul class="space-y-2">
							{#each comunicado.comunicado_leituras as leitura}
								<li class="p-2.5 rounded-xl bg-neutral-surface/60 border border-neutral-border-light flex items-center justify-between gap-2">
									<div class="flex items-center gap-2 truncate">
										<div class="h-7 w-7 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold text-[10px] shrink-0">
											{(leitura.usuario?.nome || 'U').slice(0, 2).toUpperCase()}
										</div>
										<div class="truncate">
											<span class="font-bold text-neutral-dark block truncate">{leitura.usuario?.nome || 'Docente'}</span>
											<span class="text-[10px] text-neutral-gray-400 block truncate">{leitura.usuario?.email || ''}</span>
										</div>
									</div>

									<div class="text-right shrink-0">
										<span class="text-[10px] text-feedback-success font-semibold flex items-center gap-1">
											<Clock class="h-3 w-3" /> {formatDateTime(leitura.lido_em)}
										</span>
									</div>
								</li>
							{/each}
						</ul>
					{:else}
						<div class="p-4 rounded-xl bg-neutral-surface/40 text-center text-neutral-gray-500">
							Nenhuma confirmação de leitura registrada até o momento.
						</div>
					{/if}
				</div>
			</div>

			<div class="p-4 bg-neutral-surface/40 border-t border-neutral-border-light flex justify-end">
				<Button variant="outline" size="sm" onclick={onclose}>Fechar</Button>
			</div>
		</div>
	</div>
{/if}

