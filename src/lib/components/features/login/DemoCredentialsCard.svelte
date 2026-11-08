<script lang="ts">
	import { ShieldCheck, Sparkles } from 'lucide-svelte';

	interface Props {
		onFill: () => void;
	}

	let { onFill }: Props = $props();
</script>

<div class="mt-6 pt-5 border-t border-neutral-border-light bg-neutral-surface/60 rounded-xl p-3.5 font-sans">
	<div class="flex items-center justify-between mb-2">
		<div class="flex items-center gap-1.5 text-xs font-bold text-brand-dark">
			<ShieldCheck class="h-4 w-4 text-brand-blue" />
			<span>Usuário Fictício (Multi-Perfil)</span>
		</div>
		<button
			type="button"
			onclick={onFill}
			class="text-[11px] font-bold text-brand-blue hover:text-brand-blue-hover cursor-pointer flex items-center gap-1 transition"
		>
			<Sparkles class="h-3 w-3" /> Preencher
		</button>
	</div>
	<p class="text-[11px] text-neutral-dark-gray leading-relaxed">
		<strong>Prof. Carlos Silveira</strong> (Professor, Coordenador e NDE).
	</p>
	<p class="text-[10px] text-neutral-gray-500 font-mono mt-0.5 truncate">
		carlos.silveira@impacta.edu.br • Impacta@2026Password
	</p>
</div>

