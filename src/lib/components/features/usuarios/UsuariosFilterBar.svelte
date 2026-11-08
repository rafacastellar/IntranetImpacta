<script lang="ts">
	import { Search, Filter } from 'lucide-svelte';
	import type { PerfilOption, CursoOption } from '$lib/types/gestaoUsuarios';

	interface Props {
		search: string;
		perfilFilter: string;
		statusFilter: string;
		cursoFilter: string;
		perfis: PerfilOption[];
		cursos: CursoOption[];
	}

	let {
		search = $bindable(''),
		perfilFilter = $bindable('TODOS'),
		statusFilter = $bindable('TODOS'),
		cursoFilter = $bindable('TODOS'),
		perfis = [],
		cursos = []
	}: Props = $props();
</script>

<div class="bg-neutral-white p-4 rounded-xl border border-neutral-border-light shadow-xs mb-4 font-sans">
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
		<!-- Busca por Texto -->
		<div class="lg:col-span-5 relative flex items-center">
			<Search class="absolute left-3.5 h-4 w-4 text-neutral-gray-400 pointer-events-none" />
			<input
				type="text"
				bind:value={search}
				placeholder="Buscar por nome ou e-mail..."
				class="w-full rounded-xl border border-neutral-border bg-neutral-white pl-10 pr-3.5 py-2 text-xs sm:text-sm text-neutral-dark placeholder:text-neutral-gray-400 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition"
			/>
		</div>

		<!-- Filtro por Perfil -->
		<div class="lg:col-span-3">
			<select
				bind:value={perfilFilter}
				class="w-full rounded-xl border border-neutral-border bg-neutral-white px-3 py-2 text-xs sm:text-sm text-neutral-dark focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition"
			>
				<option value="TODOS">Todos os Perfis</option>
				{#each perfis as p}
					<option value={String(p.id)}>{p.nome}</option>
				{/each}
			</select>
		</div>

		<!-- Filtro por Curso -->
		<div class="lg:col-span-2">
			<select
				bind:value={cursoFilter}
				class="w-full rounded-xl border border-neutral-border bg-neutral-white px-3 py-2 text-xs sm:text-sm text-neutral-dark focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition"
			>
				<option value="TODOS">Todos Cursos</option>
				{#each cursos as c}
					<option value={String(c.id)}>{c.codigo}</option>
				{/each}
			</select>
		</div>

		<!-- Filtro por Status -->
		<div class="lg:col-span-2">
			<select
				bind:value={statusFilter}
				class="w-full rounded-xl border border-neutral-border bg-neutral-white px-3 py-2 text-xs sm:text-sm text-neutral-dark focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition"
			>
				<option value="TODOS">Todos Status</option>
				<option value="ATIVOS">Apenas Ativos</option>
				<option value="INATIVOS">Apenas Inativos</option>
			</select>
		</div>
	</div>
</div>

