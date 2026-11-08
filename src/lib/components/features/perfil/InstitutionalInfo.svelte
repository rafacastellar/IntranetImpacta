<script lang="ts">
	import { Lock, BookOpen, Award, Shield, Calendar } from 'lucide-svelte';

	interface Props {
		email: string;
		criadoEm?: string | null;
		perfis?: Array<{ id: number; nome: string; descricao?: string | null }>;
		cursos?: Array<{ id: number; codigo: string; nome: string }>;
		ndeMembros?: Array<{
			id: number;
			cargo: string;
			data_inicio: string;
			data_fim?: string | null;
			ativo: boolean | null;
			cursos?: { codigo: string; nome: string } | null;
		}>;
	}

	let {
		email,
		criadoEm,
		perfis = [],
		cursos = [],
		ndeMembros = []
	}: Props = $props();

	function formatDate(d?: string | null) {
		if (!d) return 'Desde o início';
		try {
			return new Date(d).toLocaleDateString('pt-BR');
		} catch {
			return d;
		}
	}
</script>

<div class="space-y-4 font-sans">
	<!-- Card: Dados Institucionais & Segurança -->
	<div class="bg-neutral-white rounded-2xl p-6 shadow-sm border border-neutral-border-light">
		<div class="flex items-center justify-between mb-4">
			<h2 class="text-base sm:text-lg font-bold text-brand-dark flex items-center gap-2">
				<Shield class="h-5 w-5 text-brand-blue" /> Vínculo Institucional
			</h2>
			<span class="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-dark-gray bg-neutral-surface px-2.5 py-1 rounded-full">
				<Lock class="h-3 w-3" /> Gerenciado pela TI
			</span>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-4">
			<div class="p-3 rounded-xl bg-neutral-surface/50 border border-neutral-border-light">
				<span class="text-[11px] text-neutral-dark-gray block">E-mail Institucional:</span>
				<strong class="text-brand-dark font-mono text-xs">{email}</strong>
			</div>
			<div class="p-3 rounded-xl bg-neutral-surface/50 border border-neutral-border-light">
				<span class="text-[11px] text-neutral-dark-gray block">Membro Ativo Desde:</span>
				<strong class="text-brand-dark text-xs">{formatDate(criadoEm)}</strong>
			</div>
		</div>

		<!-- Perfis Atribuídos -->
		<div class="pt-3 border-t border-neutral-border-light">
			<span class="text-xs font-bold text-neutral-dark block mb-2">Perfis de Acesso Atribuídos (RBAC):</span>
			<div class="space-y-2">
				{#each perfis as p}
					<div class="flex items-start gap-2.5 p-2.5 rounded-xl border border-neutral-border-light/80 bg-neutral-offwhite">
						<div class="h-2 w-2 rounded-full bg-brand-blue mt-1.5 shrink-0"></div>
						<div>
							<strong class="text-xs text-brand-dark">{p.nome}</strong>
							{#if p.descricao}
								<p class="text-[11px] text-neutral-dark-gray leading-tight mt-0.5">{p.descricao}</p>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Card: Cursos e Atuação no NDE -->
	<div class="bg-neutral-white rounded-2xl p-6 shadow-sm border border-neutral-border-light">
		<h3 class="text-sm font-bold text-brand-dark flex items-center gap-2 mb-3">
			<BookOpen class="h-4 w-4 text-brand-blue" /> Cursos de Atuação
		</h3>

		{#if cursos.length > 0}
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
				{#each cursos as c}
					<div class="p-2.5 rounded-xl bg-brand-blue/5 border border-brand-blue/20 flex items-center gap-2">
						<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-blue text-neutral-white">
							{c.codigo}
						</span>
						<span class="text-xs font-semibold text-neutral-dark truncate">{c.nome}</span>
					</div>
				{/each}
			</div>
		{:else}
			<p class="text-xs text-neutral-gray-500 mb-4">Nenhum curso explicitamente associado no momento.</p>
		{/if}

		{#if ndeMembros.length > 0}
			<div class="pt-3 border-t border-neutral-border-light">
				<h4 class="text-xs font-bold text-brand-dark flex items-center gap-1.5 mb-2">
					<Award class="h-4 w-4 text-brand-purple" /> Núcleo Docente Estruturante (MEC)
				</h4>
				{#each ndeMembros as m}
					<div class="p-3 rounded-xl bg-brand-purple/5 border border-brand-purple/20 text-xs">
						<div class="flex items-center justify-between">
							<strong class="text-brand-purple-dark font-bold">{m.cargo}</strong>
							<span class="text-[10px] px-2 py-0.5 rounded-full bg-feedback-success/10 text-feedback-success font-bold">
								{m.ativo ? 'Vigente' : 'Inativo'}
							</span>
						</div>
						<p class="text-neutral-dark text-[11px] mt-1">
							Curso: <strong>{m.cursos?.nome || 'Curso Regular'} ({m.cursos?.codigo || ''})</strong>
						</p>
						<div class="flex items-center gap-1 text-[10px] text-neutral-dark-gray mt-1">
							<Calendar class="h-3 w-3" />
							<span>Início: {formatDate(m.data_inicio)} {m.data_fim ? `| Término: ${formatDate(m.data_fim)}` : ''}</span>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

