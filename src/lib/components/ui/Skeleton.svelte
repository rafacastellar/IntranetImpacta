<script lang="ts">
	import { cn } from '$lib/utils/cn';

	export type SkeletonVariant = 'rectangular' | 'circular' | 'text' | 'card';

	interface Props {
		variant?: SkeletonVariant;
		lines?: number;
		animate?: boolean;
		class?: string;
	}

	let {
		variant = 'rectangular',
		lines = 1,
		animate = true,
		class: className = ''
	}: Props = $props();

	const baseClasses = $derived(
		cn(
			'bg-neutral-surface/80',
			animate && 'animate-pulse',
			className
		)
	);
</script>

{#if variant === 'text'}
	<div role="status" aria-label="Carregando..." class="flex flex-col gap-2 w-full">
		{#each Array.from({ length: lines }) as _, index}
			<div
				class={cn(
					'h-4 rounded-md',
					baseClasses,
					index === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'
				)}
			></div>
		{/each}
	</div>
{:else if variant === 'circular'}
	<div
		role="status"
		aria-label="Carregando..."
		class={cn('rounded-full shrink-0 h-10 w-10', baseClasses)}
	></div>
{:else if variant === 'card'}
	<div
		role="status"
		aria-label="Carregando..."
		class={cn(
			'rounded-xl border border-neutral-border-light bg-neutral-white p-5 flex flex-col gap-4 shadow-xs',
			animate && 'animate-pulse',
			className
		)}
	>
		<div class="flex items-center gap-3">
			<div class="h-10 w-10 rounded-full bg-neutral-surface shrink-0"></div>
			<div class="flex flex-col gap-1.5 w-full">
				<div class="h-4 w-1/3 rounded-md bg-neutral-surface"></div>
				<div class="h-3 w-1/4 rounded-md bg-neutral-surface/60"></div>
			</div>
		</div>
		<div class="flex flex-col gap-2 pt-2">
			<div class="h-4 w-full rounded-md bg-neutral-surface"></div>
			<div class="h-4 w-5/6 rounded-md bg-neutral-surface"></div>
			<div class="h-4 w-2/3 rounded-md bg-neutral-surface/60"></div>
		</div>
	</div>
{:else}
	<div
		role="status"
		aria-label="Carregando..."
		class={cn('rounded-lg w-full h-12', baseClasses)}
	></div>
{/if}

