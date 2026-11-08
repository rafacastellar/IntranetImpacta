<script lang="ts">
	import { Modal, Button, Input, Select, Textarea } from '$lib/components/ui';
	import type { MockSubstituicao } from '$lib/server/mockData';

	interface Props {
		isOpen?: boolean;
		oncreate?: (sub: Omit<MockSubstituicao, 'id' | 'status'>) => void;
	}

	let { isOpen = $bindable(false), oncreate }: Props = $props();

	let professor_substituto = $state('Profa. Mariana Costa');
	let turma = $state('ADS-4A');
	let disciplina = $state('Arquitetura de Microsserviços');
	let data_substituicao = $state('2026-11-12');
	let horario = $state('19:15 - 21:00');
	let sala = $state('Laboratório 02');
	let motivo = $state('');
	let isSubmitting = $state(false);

	const turmasOptions = [
		{ label: 'ADS-4A (Análise de Sistemas)', value: 'ADS-4A' },
		{ label: 'ADS-3B (Análise de Sistemas)', value: 'ADS-3B' },
		{ label: 'ES-2A (Engenharia de Software)', value: 'ES-2A' },
		{ label: 'RC-1A (Redes e Cibersegurança)', value: 'RC-1A' }
	];

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!motivo) return;

		isSubmitting = true;
		setTimeout(() => {
			oncreate?.({
				professor_titular: 'Prof. Carlos Eduardo Silveira',
				professor_substituto,
				curso: 'Análise e Desenvolvimento de Sistemas',
				turma,
				disciplina,
				data_substituicao,
				horario,
				sala,
				motivo
			});
			motivo = '';
			isSubmitting = false;
			isOpen = false;
		}, 300);
	}
</script>

<Modal
	bind:isOpen
	title="Solicitar Substituição de Aula"
	description="A coordenação e o professor substituto serão notificados para aprovação."
>
	<form onsubmit={handleSubmit} class="flex flex-col gap-3.5 font-sans">
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
			<Select
				label="Turma da Aula"
				options={turmasOptions}
				bind:value={turma}
				required
			/>
			<Input
				label="Disciplina"
				bind:value={disciplina}
				required
			/>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
			<Input
				label="Data"
				type="date"
				bind:value={data_substituicao}
				required
			/>
			<Input
				label="Horário"
				bind:value={horario}
				required
			/>
			<Input
				label="Sala / Lab"
				bind:value={sala}
				required
			/>
		</div>

		<Input
			label="Professor Substituto Indicado"
			bind:value={professor_substituto}
			required
		/>

		<Textarea
			label="Motivo da Ausência / Justificativa"
			placeholder="Ex: Participação em banca examinadora / Reunião externa do NDE..."
			bind:value={motivo}
			rows={3}
			required
		/>

		<div class="flex items-center justify-end gap-2 pt-2">
			<Button variant="outline" size="sm" onclick={() => (isOpen = false)}>
				Cancelar
			</Button>
			<Button variant="primary" size="sm" type="submit" loading={isSubmitting}>
				Enviar Solicitação
			</Button>
		</div>
	</form>
</Modal>

