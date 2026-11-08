<script lang="ts">
	import { UserPlus, ArrowLeft, Users, CheckCircle2, UserX } from 'lucide-svelte';
	import Button from '$lib/components/ui/Button.svelte';

	interface Props {
		total: number;
		ativos: number;
		inativos: number;
		onOpenNovoModal: () => void;
	}

	let { total, ativos, inativos, onOpenNovoModal }: Props = $props();
</script>

<div class="mb-6 font-sans">
	<div class="flex items-center justify-between mb-3">
		<a href="/" class="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-gray-500 hover:text-brand-blue transition">
			<ArrowLeft class="h-4 w-4" /> Voltar ao Painel Principal
		</a>
		<span class="text-xs font-medium text-neutral-gray-400">Secretaria & Coordenação</span>
	</div>

	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-brand-dark text-neutral-white p-6 rounded-2xl shadow-xl border border-brand-cyan/20">
		<div>
			<div class="flex items-center gap-2">
				<Users class="h-6 w-6 text-brand-cyan" />
				<h1 class="text-xl sm:text-2xl font-bold tracking-tight">Gestão de Usuários</h1>
			</div>
			<p class="text-xs sm:text-sm text-neutral-surface mt-1">
				Controle de credenciais, vínculos com cursos e ativação de docentes e coordenadores.
			</p>
		</div>

		<div class="flex items-center gap-3">
			<Button variant="primary" size="md" onclick={onOpenNovoModal}>
				{#snippet leftIcon()}
					<UserPlus class="h-4 w-4" />
				{/snippet}
				Novo Usuário
			</Button>
		</div>
	</div>

	<!-- Mini KPIs -->
	<div class="grid grid-cols-3 gap-3 mt-4">
		<div class="bg-neutral-white p-3.5 rounded-xl border border-neutral-border-light shadow-xs flex items-center gap-3">
			<div class="h-9 w-9 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
				<Users class="h-5 w-5" />
			</div>
			<div>
				<span class="text-[11px] text-neutral-dark-gray block">Total Cadastrados</span>
				<strong class="text-base sm:text-lg font-bold text-brand-dark">{total}</strong>
			</div>
		</div>

		<div class="bg-neutral-white p-3.5 rounded-xl border border-neutral-border-light shadow-xs flex items-center gap-3">
			<div class="h-9 w-9 rounded-lg bg-feedback-success/10 flex items-center justify-center text-feedback-success shrink-0">
				<CheckCircle2 class="h-5 w-5" />
			</div>
			<div>
				<span class="text-[11px] text-neutral-dark-gray block">Usuários Ativos</span>
				<strong class="text-base sm:text-lg font-bold text-brand-dark">{ativos}</strong>
			</div>
		</div>

		<div class="bg-neutral-white p-3.5 rounded-xl border border-neutral-border-light shadow-xs flex items-center gap-3">
			<div class="h-9 w-9 rounded-lg bg-neutral-surface flex items-center justify-center text-neutral-gray-500 shrink-0">
				<UserX class="h-5 w-5" />
			</div>
			<div>
				<span class="text-[11px] text-neutral-dark-gray block">Inativos</span>
				<strong class="text-base sm:text-lg font-bold text-neutral-dark">{inativos}</strong>
			</div>
		</div>
	</div>
</div>

