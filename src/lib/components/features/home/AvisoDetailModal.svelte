<script lang="ts">
	import { Modal, Button, Badge } from '$lib/components/ui';
	import type { MockAviso } from '$lib/server/mockData';
	import { CheckCircle2, Calendar, User, AlertOctagon } from 'lucide-svelte';

	interface Props {
		isOpen?: boolean;
		aviso?: MockAviso | null;
		onConfirmRead?: (id: number) => void;
	}

	let { isOpen = $bindable(false), aviso = null, onConfirmRead }: Props = $props();

	let hasRead = $state(false);

	$effect(() => {
		if (isOpen) {
			hasRead = false;
		}
	});

	function handleConfirm() {
		hasRead = true;
		if (aviso) onConfirmRead?.(aviso.id);
		setTimeout(() => {
			isOpen = false;
		}, 600);
	}
</script>

<Modal
	bind:isOpen
	title={aviso?.titulo || 'Comunicado'}
	description={`Publicado por ${aviso?.autor || 'Coordenação'} em ${aviso?.categoria || 'Geral'}`}
>
	{#if aviso}
		<div class="flex flex-col gap-4 font-sans text-neutral-dark">
			<div class="flex items-center gap-2 flex-wrap">
				<Badge variant={aviso.prioridade === 'URGENTE' ? 'danger' : 'primary'}>
					{#if aviso.prioridade === 'URGENTE'}
						<AlertOctagon class="h-3 w-3" />
					{/if}
					Prioridade {aviso.prioridade}
				</Badge>
				<span class="text-xs text-neutral-gray-500">
					Categoria: <strong class="text-neutral-dark">{aviso.categoria}</strong>
				</span>
			</div>

			<div class="bg-neutral-surface/40 p-4 rounded-xl border border-neutral-border-light text-sm leading-relaxed whitespace-pre-line text-neutral-text">
				{aviso.conteudo}
			</div>

			{#if aviso.turmas && aviso.turmas.length > 0}
				<div class="flex items-center gap-1.5 text-xs text-neutral-gray-500">
					<span>Turmas afetadas:</span>
					{#each aviso.turmas as t}
						<span class="px-2 py-0.5 rounded bg-neutral-surface text-neutral-dark font-medium border border-neutral-border-light">
							{t}
						</span>
					{/each}
				</div>
			{/if}

			<div class="flex items-center justify-between pt-3 border-t border-neutral-border-light">
				<span class="text-xs text-neutral-gray-500">
					{hasRead ? 'Leitura registrada no sistema!' : 'Confirme a ciência do comunicado.'}
				</span>
				<div class="flex items-center gap-2">
					<Button variant="outline" size="sm" onclick={() => (isOpen = false)}>
						Fechar
					</Button>
					<Button
						variant={hasRead ? 'success' : 'primary'}
						size="sm"
						onclick={handleConfirm}
						disabled={hasRead}
					>
						<CheckCircle2 class="h-4 w-4" />
						{hasRead ? 'Ciência Registrada' : 'Confirmar Leitura'}
					</Button>
				</div>
			</div>
		</div>
	{/if}
</Modal>

