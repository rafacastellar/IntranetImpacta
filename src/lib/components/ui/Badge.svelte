<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils/cn';

	export type BadgeVariant =
		| 'default'
		| 'primary'
		| 'secondary'
		| 'success'
		| 'warning'
		| 'danger'
		| 'cyan'
		| 'purple';

	interface Props {
		variant?: BadgeVariant;
		class?: string;
		children?: Snippet;
	}

	let { variant = 'default', class: className = '', children }: Props = $props();

	const variantClasses: Record<BadgeVariant, string> = {
		default: 'bg-neutral-surface text-neutral-dark border-neutral-border',
		primary: 'bg-brand-blue/15 text-brand-blue border-brand-blue/30',
		secondary: 'bg-brand-dark/10 text-brand-dark border-brand-dark/20',
		success: 'bg-feedback-success/15 text-feedback-success border-feedback-success/30',
		warning: 'bg-feedback-warning/15 text-feedback-warning border-feedback-warning/30',
		danger: 'bg-feedback-error/15 text-feedback-error border-feedback-error/30',
		cyan: 'bg-brand-cyan/20 text-brand-dark border-brand-cyan/40',
		purple: 'bg-brand-purple/15 text-brand-purple border-brand-purple/30'
	};
</script>

<span
	class={cn(
		'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border font-sans',
		variantClasses[variant],
		className
	)}
>
	{#if children}
		{@render children()}
	{/if}
</span>

