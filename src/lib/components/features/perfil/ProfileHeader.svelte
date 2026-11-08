<script lang="ts">
	import { ArrowLeft, Building2, ShieldCheck } from 'lucide-svelte';

	interface Props {
		nome: string;
		email: string;
		perfis?: Array<{ id: number; nome: string; descricao?: string | null }>;
	}

	let { nome, email, perfis = [] }: Props = $props();

	const initials = $derived(
		nome
			.split(' ')
			.map((n) => n[0])
			.slice(0, 2)
			.join('')
	);
</script>

<div class="mb-6 font-sans">
	<div class="flex items-center justify-between mb-4">
		<a
			href="/"
			class="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-gray-500 hover:text-brand-blue transition"
		>
			<ArrowLeft class="h-4 w-4" /> Voltar ao Painel Principal
		</a>
		<span class="text-xs text-neutral-gray-400 font-medium">Gestão Acadêmica Impacta</span>
	</div>

	<div class="bg-brand-dark rounded-2xl p-6 text-neutral-white shadow-xl border border-brand-cyan/20">
		<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
			<div class="flex items-center gap-4">
				<div class="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-brand-blue flex items-center justify-center text-xl sm:text-2xl font-bold text-neutral-white border-2 border-brand-cyan/40 shadow-md shrink-0">
					{initials}
				</div>
				<div>
					<h1 class="text-lg sm:text-2xl font-bold tracking-tight text-neutral-white">{nome}</h1>
					<p class="text-xs sm:text-sm text-neutral-surface mt-1">{email}</p>
					<div class="flex items-center gap-1.5 text-xs text-neutral-gray-400 mt-2">
						<Building2 class="h-3.5 w-3.5 text-brand-cyan" />
						<span>Faculdade Impacta de Tecnologia • Corpo Docente</span>
					</div>
				</div>
			</div>

			{#if perfis.length > 0}
				<div class="flex sm:flex-col items-start sm:items-end gap-1.5 flex-wrap">
					<span class="text-[10px] uppercase font-bold tracking-wider text-neutral-gray-400">Perfis Ativos:</span>
					<div class="flex flex-wrap gap-1.5">
						{#each perfis as p}
							<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-neutral-white/10 text-neutral-white border border-neutral-white/20">
								<ShieldCheck class="h-3 w-3 text-brand-cyan" />
								{p.nome}
							</span>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
