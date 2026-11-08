<script lang="ts">
	import { Card, Badge } from '$lib/components/ui';
	import type { MockDocumento } from '$lib/server/mockData';
	import { BookOpen, FileCheck, ExternalLink } from 'lucide-svelte';

	interface Props {
		documentos?: MockDocumento[];
		onSelectDocumento?: (doc: MockDocumento) => void;
	}

	let { documentos = [], onSelectDocumento }: Props = $props();
</script>

<div class="flex flex-col gap-3 font-sans">
	<div class="flex items-center justify-between pb-1">
		<div class="flex items-center gap-2">
			<BookOpen class="h-5 w-5 text-brand-dark" />
			<h2 class="text-base font-bold text-brand-dark">Procedimentos & Manuais MEC</h2>
		</div>
		<span class="text-xs text-brand-blue font-semibold hover:underline cursor-pointer">
			Base Completa
		</span>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
		{#each documentos as doc (doc.id)}
			<Card
				variant="default"
				padding="sm"
				class="hover:border-brand-blue/50 hover:shadow-xs transition cursor-pointer flex flex-col justify-between"
				onclick={() => onSelectDocumento?.(doc)}
			>
				<div>
					<div class="flex items-center justify-between gap-2">
						<Badge variant="cyan" class="text-[10px]">
							{doc.categoria}
						</Badge>
						<ExternalLink class="h-3.5 w-3.5 text-neutral-gray-400" />
					</div>
					<h3 class="text-xs font-bold text-neutral-dark mt-2 leading-snug">
						{doc.titulo}
					</h3>
					<p class="text-[11px] text-neutral-gray-600 mt-1 line-clamp-2 content-short">
						{doc.resumo}
					</p>
				</div>

				<div class="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-neutral-border-light flex-wrap">
					{#each doc.palavras_chave.slice(0, 3) as tag}
						<span class="text-[10px] text-neutral-gray-500 bg-neutral-surface px-1.5 py-0.5 rounded">
							#{tag}
						</span>
					{/each}
				</div>
			</Card>
		{/each}
	</div>
</div>

