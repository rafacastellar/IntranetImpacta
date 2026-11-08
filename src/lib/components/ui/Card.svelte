<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils/cn';

	export type CardVariant = 'default' | 'bordered' | 'elevated' | 'institutional' | 'interactive';
	export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		variant?: CardVariant;
		padding?: CardPadding;
		title?: string;
		subtitle?: string;
		action?: Snippet;
		header?: Snippet;
		footer?: Snippet;
		children?: Snippet;
		class?: string;
	}

	let {
		variant = 'default',
		padding = 'md',
		title,
		subtitle,
		action,
		header,
		footer,
		children,
		class: className = '',
		...restProps
	}: Props = $props();

	const variantClasses: Record<CardVariant, string> = {
		default: 'bg-neutral-white border border-neutral-border-light shadow-xs',
		bordered: 'bg-neutral-white border border-neutral-border',
		elevated: 'bg-neutral-white border border-neutral-border-light shadow-md',
		institutional: 'bg-brand-dark text-neutral-white border border-brand-dark-surface shadow-sm',
		interactive:
			'bg-neutral-white border border-neutral-border-light shadow-xs hover:border-brand-blue hover:shadow-md transition-all duration-200 cursor-pointer'
	};

	const paddingClasses: Record<CardPadding, string> = {
		none: 'p-0',
		sm: 'p-3 sm:p-4',
		md: 'p-4 sm:p-6',
		lg: 'p-6 sm:p-8'
	};
</script>

<div
	class={cn(
		'rounded-xl font-sans overflow-hidden flex flex-col',
		variantClasses[variant],
		className
	)}
	{...restProps}
>
	{#if header}
		<div class="border-b border-neutral-border-light px-4 py-3 sm:px-6">
			{@render header()}
		</div>
	{:else if title || subtitle || action}
		<div class="flex items-start justify-between border-b border-neutral-border-light px-4 py-3 sm:px-6 gap-3">
			<div>
				{#if title}
					<h3 class={cn('text-base font-bold', variant === 'institutional' ? 'text-neutral-white' : 'text-brand-dark')}>
						{title}
					</h3>
				{/if}
				{#if subtitle}
					<p class={cn('text-xs mt-0.5', variant === 'institutional' ? 'text-neutral-gray-400' : 'text-neutral-gray-500')}>
						{subtitle}
					</p>
				{/if}
			</div>
			{#if action}
				<div class="flex items-center shrink-0">
					{@render action()}
				</div>
			{/if}
		</div>
	{/if}

	<div class={cn('flex-1', paddingClasses[padding])}>
		{#if children}
			{@render children()}
		{/if}
	</div>

	{#if footer}
		<div class="border-t border-neutral-border-light bg-neutral-surface/40 px-4 py-3 sm:px-6">
			{@render footer()}
		</div>
	{/if}
</div>

