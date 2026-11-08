<script lang="ts">
	import { X, FileText, Download, ShieldCheck, Calendar, Users, CheckCircle2 } from 'lucide-svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { ReuniaoItem } from '$lib/types/reunioesAtas';

	interface Props {
		reuniao: ReuniaoItem | null;
		isOpen: boolean;
		onclose: () => void;
	}

	let { reuniao, isOpen, onclose }: Props = $props();

	function formatDateTime(iso: string) {
		try {
			return new Date(iso).toLocaleString('pt-BR', {
				day: '2-digit',
				month: 'long',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			});
		} catch {
			return iso;
		}
	}
</script>

{#if isOpen && reuniao}
	<button
		type="button"
		class="fixed inset-0 bg-neutral-black/60 backdrop-blur-xs z-50 transition-opacity cursor-default"
		onclick={onclose}
		aria-label="Fechar ata"
	></button>

	<div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-none font-sans">
		<div class="bg-neutral-white rounded-2xl shadow-2xl border border-neutral-border-light max-w-2xl w-full max-h-[90vh] flex flex-col pointer-events-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150">
			<!-- Topo -->
			<div class="p-5 sm:p-6 bg-brand-dark text-neutral-white flex items-start justify-between gap-4 shrink-0">
				<div>
					<div class="flex items-center gap-2 mb-2">
						<span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-purple/40 text-neutral-white border border-brand-purple/50">
							{reuniao.tipo_reuniao}
						</span>
						<span class="text-xs text-brand-cyan flex items-center gap-1 font-semibold">
							<ShieldCheck class="h-3.5 w-3.5" /> Padrão Regulatório MEC
						</span>
						<span class="text-xs text-neutral-gray-300">
							• Versão {reuniao.atas?.versao || 1}.0
						</span>
					</div>
					<h2 class="text-base sm:text-lg font-bold tracking-tight text-neutral-white leading-snug">
						{reuniao.titulo}
					</h2>
				</div>

				<button type="button" onclick={onclose} class="p-1.5 rounded-lg text-neutral-gray-300 hover:text-neutral-white hover:bg-brand-dark-alt transition cursor-pointer" aria-label="Fechar">
					<X class="h-5 w-5" />
				</button>
			</div>

			<!-- Conteúdo da Ata com Rolagem -->
			<div class="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5 text-xs text-neutral-dark">
				<!-- Metadados da Sessão -->
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-neutral-surface/40 border border-neutral-border-light">
					<div>
						<span class="text-[10px] uppercase font-bold text-neutral-gray-400 block">Data e Horário:</span>
						<strong class="text-brand-dark">{formatDateTime(reuniao.data_hora_inicio)}</strong>
					</div>
					<div>
						<span class="text-[10px] uppercase font-bold text-neutral-gray-400 block">Curso:</span>
						<strong class="text-brand-dark">{reuniao.curso?.nome || 'Institucional / Geral'}</strong>
					</div>
				</div>

				<!-- Pauta Prévia -->
				{#if reuniao.atas?.pauta_previa}
					<div>
						<h4 class="text-xs font-bold uppercase tracking-wider text-neutral-gray-400 mb-1.5">Pauta Prévia da Reunião</h4>
						<div class="p-3.5 rounded-xl bg-neutral-surface/30 border border-neutral-border-light whitespace-pre-line leading-relaxed text-neutral-dark-gray">
							{reuniao.atas.pauta_previa}
						</div>
					</div>
				{/if}

				<!-- Conteúdo Realizado / Deliberações -->
				<div>
					<h4 class="text-xs font-bold uppercase tracking-wider text-brand-dark mb-1.5">Deliberações e Ocorrido na Sessão</h4>
					{#if reuniao.atas?.conteudo_realizado}
						<div class="p-4 rounded-xl bg-neutral-surface/20 border border-neutral-border-light whitespace-pre-line leading-relaxed text-neutral-dark">
							{reuniao.atas.conteudo_realizado}
						</div>
					{:else}
						<div class="p-4 rounded-xl bg-feedback-warning/10 border border-feedback-warning/20 text-feedback-warning italic">
							Ata em fase de minuta prévia. O conteúdo deliberativo final será inserido após a conclusão dos trabalhos.
						</div>
					{/if}
				</div>

				<!-- Participantes Convocados / Assinantes -->
				{#if reuniao.reuniao_participantes && reuniao.reuniao_participantes.length > 0}
					<div>
						<h4 class="text-xs font-bold uppercase tracking-wider text-neutral-gray-400 mb-1.5">Membros Participantes</h4>
						<div class="flex flex-wrap gap-2">
							{#each reuniao.reuniao_participantes as part}
								<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-surface border border-neutral-border-light text-xs font-medium text-neutral-dark">
									<Users class="h-3 w-3 text-brand-cyan" />
									{part.usuario?.nome || 'Docente'}
								</span>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<!-- Rodapé -->
			<div class="p-4 bg-neutral-surface/40 border-t border-neutral-border-light flex items-center justify-between gap-3 shrink-0">
				<span class="text-[11px] text-neutral-gray-500">
					Documento sujeito a auditoria e censo do MEC
				</span>

				<div class="flex items-center gap-2">
					{#if reuniao.atas?.arquivo_url}
						<a
							href={reuniao.atas.arquivo_url}
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

