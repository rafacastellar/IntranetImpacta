<script lang="ts">
	import { Modal, Button, Input, Select, Textarea } from '$lib/components/ui';

	interface Props {
		isOpen?: boolean;
		onsubmit?: (incident: { sala: string; tipo: string; descricao: string }) => void;
	}

	let { isOpen = $bindable(false), onsubmit }: Props = $props();

	let sala = $state('');
	let tipo = $state('Projetor / Audiovisual');
	let descricao = $state('');
	let isSubmitting = $state(false);

	const tipoOptions = [
		{ label: 'Projetor / Cabo HDMI / Som', value: 'Projetor / Audiovisual' },
		{ label: 'Conectividade Wi-Fi / Rede Cabeada', value: 'Rede / Internet' },
		{ label: 'Ar Condicionado / Climatização', value: 'Climatização' },
		{ label: 'Máquinas do Laboratório / Software', value: 'Hardware / Software' },
		{ label: 'Chave / Acesso à Sala', value: 'Acesso' }
	];

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!sala || !descricao) return;

		isSubmitting = true;
		setTimeout(() => {
			onsubmit?.({ sala, tipo, descricao });
			sala = '';
			descricao = '';
			isSubmitting = false;
			isOpen = false;
		}, 400);
	}
</script>

<Modal
	bind:isOpen
	title="Reportar Problema em Sala / Laboratório"
	description="Envie um chamado direto para a equipe de apoio operacional e infraestrutura."
>
	<form onsubmit={handleSubmit} class="flex flex-col gap-4 font-sans">
		<Input
			label="Identificação da Sala ou Laboratório"
			placeholder="Ex: Laboratório 04, Sala 302 - Bloco B"
			bind:value={sala}
			required
		/>

		<Select
			label="Tipo de Ocorrência"
			options={tipoOptions}
			bind:value={tipo}
			required
		/>

		<Textarea
			label="Descrição do Problema"
			placeholder="Descreva o que ocorreu (ex: o projetor liga mas não recebe sinal do cabo HDMI)..."
			bind:value={descricao}
			rows={3}
			required
		/>

		<div class="flex items-center justify-end gap-2 pt-2">
			<Button variant="outline" size="sm" onclick={() => (isOpen = false)}>
				Cancelar
			</Button>
			<Button variant="danger" size="sm" type="submit" loading={isSubmitting}>
				Enviar Chamado
			</Button>
		</div>
	</form>
</Modal>

