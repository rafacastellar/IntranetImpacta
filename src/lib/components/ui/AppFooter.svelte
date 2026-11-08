<script lang="ts">
	import { GraduationCap, Mail, ShieldCheck, Code2 } from 'lucide-svelte';

	const autores = [
		{
			nome: 'Rafael Cesar Gonçalves',
			email: 'rafael.cesar@aluno.impacta.edu.br',
			cursoTurma: 'ADS · 3A · M'
		},
		{
			nome: 'Rafael Marques Castellar',
			email: 'rafael.castellar@aluno.impacta.edu.br',
			cursoTurma: 'ADS · 3A · M'
		},
		{
			nome: 'Pedro Cortez Rodrigues Alves',
			email: 'pedro.cortez@aluno.impacta.edu.br',
			cursoTurma: 'SI · 3A · M'
		}
	];

	const linksUteis = [
		{ label: 'Painel Principal', href: '/' },
		{ label: 'Impacta Direct', href: '/impacta-direct' },
		{ label: 'Reuniões & Atas MEC', href: '/reunioes-e-atas' },
		{ label: 'Procedimentos & Políticas', href: '/procedimentos-e-politicas' },
		{ label: 'Gestão de Usuários', href: '/usuarios' },
		{ label: 'Meu Perfil', href: '/meu-perfil' }
	];
</script>

<footer class="bg-brand-dark text-neutral-white border-t border-brand-dark-surface font-sans mt-auto">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
		<div class="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
			<!-- Coluna 1: Marca & Missão Institucional -->
			<div class="md:col-span-4 flex flex-col justify-between">
				<div>
					<div class="flex items-center gap-3 mb-3">
						<div class="h-9 w-9 p-1.5 rounded-xl bg-neutral-white shadow-xs flex items-center justify-center shrink-0">
							<img src="/logo_impacta.svg" alt="Faculdade Impacta" class="h-6 w-auto object-contain" />
						</div>
						<div>
							<span class="text-sm font-bold tracking-tight text-neutral-white block leading-tight">Faculdade Impacta</span>
							<span class="text-[11px] text-brand-cyan font-medium">Coordenação & Corpo Docente</span>
						</div>
					</div>
					<p class="text-xs text-neutral-gray-300 leading-relaxed max-w-sm">
						Plataforma acadêmica unificada para gestão de reuniões, atas com conformidade MEC, substituições de aulas, comunicados direcionados e repositório de procedimentos institucionais.
					</p>
				</div>

				<div class="mt-4 flex items-center gap-2 text-[11px] text-brand-cyan">
					<ShieldCheck class="h-4 w-4 shrink-0" />
					<span>Compliance Regulatória MEC & Gestão de NDE</span>
				</div>
			</div>

			<!-- Coluna 2: Equipe de Desenvolvimento (Autores do Projeto) -->
			<div class="md:col-span-5">
				<div class="flex items-center gap-2 mb-3">
					<Code2 class="h-4 w-4 text-brand-cyan" />
					<h4 class="text-xs font-bold uppercase tracking-wider text-neutral-white">Equipe de Desenvolvimento</h4>
				</div>
				<div class="divide-y divide-brand-dark-surface/60">
					{#each autores as autor, index}
						<div class={index > 0 ? 'pt-3 pb-3' : 'pb-3'}>
							<div class="text-xs sm:text-sm font-bold text-neutral-white leading-tight">{autor.nome}</div>
							<a
								href={`mailto:${autor.email}`}
								class="text-[11px] sm:text-xs text-neutral-gray-300 hover:text-brand-cyan transition block mt-0.5"
								title={autor.email}
							>
								{autor.email}
							</a>
							<div class="mt-0.5 text-[11px] sm:text-xs text-brand-cyan font-mono font-semibold tracking-wide">
								{autor.cursoTurma}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Coluna 3: Acessos Rápidos aos Módulos -->
			<div class="md:col-span-3">
				<h4 class="text-xs font-bold uppercase tracking-wider text-neutral-white mb-3">Módulos da Intranet</h4>
				<ul class="space-y-1.5 text-xs">
					{#each linksUteis as link}
						<li>
							<a
								href={link.href}
								class="text-neutral-gray-300 hover:text-brand-cyan transition inline-flex items-center gap-1.5 py-0.5"
							>
								<span class="text-brand-cyan font-bold">›</span> {link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Barra Inferior de Direitos e Tecnologias -->
		<div class="pt-6 border-t border-brand-dark-surface/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-gray-400">
			<p>© 2026 Faculdade Impacta de Tecnologia • Todos os direitos reservados.</p>
			<p class="flex items-center gap-1.5 text-neutral-gray-400">
				<span>Desenvolvido com SvelteKit 2, Svelte 5 & Supabase</span>
			</p>
		</div>
	</div>
</footer>

