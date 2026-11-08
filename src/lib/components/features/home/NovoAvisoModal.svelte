<script lang="ts">
	import { Modal, Button, Input, Select, Textarea } from '$lib/components/ui';
	import type { MockAviso } from '$lib/server/mockData';

	interface Props {
		isOpen?: boolean;
		oncreate?: (aviso: Omit<MockAviso, 'id' | 'data_publicacao' | 'ativo'>) => void;
	}

	let { isOpen = $bindable(false), oncreate }: Props = $props();

	let titulo = $state('');
	let categoria = $state<any>('Acadêmico');
	let prioridade = $state<any>('MEDIA');
	let conteudo = $state('');
	let isSubmitting = $state(false);

	const categoriaOptions = [
		{ label: 'Acadêmico (Provas, Prazos, Calendário)', value: 'Acadêmico' },
		{ label: 'Infraestrutura (Salas, Redes, Labs)', value: 'Infraestrutura' },
		{ label: 'Institucional (NDE, MEC, Colegiado)', value: 'Institucional' },
		{ label: 'Geral / Outros', value: 'Geral' }
	];

	const prioridadeOptions = [
		{ label: 'Média (Padrão)', value: 'MEDIA' },
		{ label: 'Alta (Importante)', value: 'ALTA' },
		{ label: 'Urgente (Destaque em Vermelho)', value: 'URGENTE' },
		{ label: 'Baixa (Informativo)', value: 'BAIXA' }
	];

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!titulo || !conteudo) return;

		isSubmitting = true;
		setTimeout(() => {
			oncreate?.({
				titulo,
				categoria,
				prioridade,
				conteudo,
				autor: 'Prof. Carlos Eduardo Silveira'
			});
			titulo = '';
			conteudo = '';
			isSubmitting = false;
			isOpen = false;
		}, 300);
	}
</script>

<Modal
	bind:isOpen
	title="Publicar Comunicado no Mural"
	description="O comunicado ficará visível para os professores e coordenação na página inicial."
>
	<form onsubmit={handleSubmit} class="flex flex-col gap-4 font-sans">
		<Input
			label="Título do Comunicado"
			placeholder="Ex: Entrega de Matrizes Curriculares 2027"
			bind:value={titulo}
			required
		/>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
			<Select
				label="Categoria"
				options={categoriaOptions}
				bind:value={categoria}
				required
			/>
			<Select
				label="Prioridade"
				options={prioridadeOptions}
				bind:value={prioridade}
				required
			/>
		</div>

		<Textarea
			label="Conteúdo Detalhado"
			placeholder="Escreva a mensagem que deseja transmitir ao corpo docente..."
			bind:value={conteudo}
			rows={4}
			required
		/>

		<div class="flex items-center justify-end gap-2 pt-2">
			<Button variant="outline" size="sm" onclick={() => (isOpen = false)}>
				Cancelar
			</Button>
			<Button variant="primary" size="sm" type="submit" loading={isSubmitting}>
				Publicar Aviso
			</Button>
		</div>
	</form>
</Modal>

