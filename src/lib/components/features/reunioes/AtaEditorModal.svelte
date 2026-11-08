<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { X, Edit3, ShieldCheck } from 'lucide-svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { ReuniaoItem } from '$lib/types/reunioesAtas';

	interface Props {
		reuniao: ReuniaoItem | null;
		isOpen: boolean;
		onclose: () => void;
	}

	let { reuniao, isOpen, onclose }: Props = $props();

	let isSubmitting = $state(false);
	let pautaPrevia = $state('');
	let conteudoRealizado = $state('');
	let status = $state('PUBLICADA');

	$effect(() => {
		if (reuniao?.atas) {
			pautaPrevia = reuniao.atas.pauta_previa || '';
			conteudoRealizado = reuniao.atas.conteudo_realizado || '';
			status = reuniao.atas.status || 'PUBLICADA';
		}
	});
</script>

{#if isOpen && reuniao && reuniao.atas}
	<button
		type="button"
		class="fixed inset-0 bg-neutral-black/60 backdrop-blur-xs z-50 transition-opacity cursor-default"
		onclick={onclose}
		aria-label="Fechar editor"
	></button>

	<div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-none font-sans">
		<div class="bg-neutral-white rounded-2xl shadow-2xl border border-neutral-border-light max-w-xl w-full max-h-[90vh] flex flex-col pointer-events-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150">
			<!-- Topo -->
			<div class="p-5 bg-brand-dark text-neutral-white flex items-center justify-between shrink-0">
				<div class="flex items-center gap-2">
					<Edit3 class="h-5 w-5 text-brand-cyan" />
					<h3 class="text-base font-bold">Redigir / Homologar Ata MEC</h3>
				</div>
				<button type="button" onclick={onclose} class="p-1 rounded text-neutral-gray-300 hover:text-neutral-white cursor-pointer" aria-label="Fechar">
					<X class="h-5 w-5" />
				</button>
			</div>

			<!-- Formulário -->
			<form
				method="POST"
				action="?/salvarAta"
				use:enhance={() => {
					isSubmitting = true;
					return async ({ result, update }) => {
						isSubmitting = false;
						if (result.type === 'success') {
							await invalidateAll();
							onclose();
						} else {
							await update();
						}
					};
				}}
				class="p-5 space-y-3.5 text-xs text-neutral-dark overflow-y-auto flex-1"
			>
				<input type="hidden" name="ata_id" value={reuniao.atas.id} />
				<input type="hidden" name="reuniao_id" value={reuniao.id} />
				<input type="hidden" name="versao" value={reuniao.atas.versao} />

				<div>
					<span class="text-[10px] uppercase font-bold text-neutral-gray-400 block mb-0.5">Sessão:</span>
					<strong class="text-brand-dark text-sm leading-snug">{reuniao.titulo}</strong>
				</div>

				<div>
					<label for="pauta_previa" class="block font-bold text-neutral-dark-gray mb-1">Pauta Prévia da Reunião *</label>
					<textarea id="pauta_previa" name="pauta_previa" rows="3" bind:value={pautaPrevia} required class="w-full px-3 py-2 rounded-xl border border-neutral-border-light bg-neutral-surface/30 focus:outline-none focus:ring-2 focus:ring-brand-purple/30 leading-relaxed"></textarea>
				</div>

				<div>
					<label for="conteudo_realizado" class="block font-bold text-neutral-dark-gray mb-1">Deliberações Realizadas & Ocorrido na Sessão *</label>
					<textarea id="conteudo_realizado" name="conteudo_realizado" rows="5" bind:value={conteudoRealizado} placeholder="Descreva os pontos debatidos, votações, encaminhamentos e decisões..." class="w-full px-3 py-2 rounded-xl border border-neutral-border-light bg-neutral-surface/30 focus:outline-none focus:ring-2 focus:ring-brand-purple/30 leading-relaxed"></textarea>
				</div>

				<div>
					<label for="status" class="block font-bold text-neutral-dark-gray mb-1">Status da Ata *</label>
					<select id="status" name="status" bind:value={status} class="w-full px-3 py-2 rounded-xl border border-neutral-border-light bg-neutral-white focus:outline-none focus:ring-2 focus:ring-brand-purple/30 font-semibold">
						<option value="PUBLICADA">Homologada e Publicada (Cumpre MEC)</option>
						<option value="RASCUNHO">Minuta Prévia / Rascunho</option>
					</select>
				</div>

				<div class="pt-3 border-t border-neutral-border-light flex items-center justify-end gap-2 shrink-0">
					<Button variant="outline" size="sm" type="button" onclick={onclose}>Cancelar</Button>
					<Button variant="primary" size="sm" type="submit" disabled={isSubmitting}>
						{isSubmitting ? 'Salvando...' : 'Salvar e Atualizar Versão'}
					</Button>
				</div>
			</form>
		</div>
	</div>
{/if}

