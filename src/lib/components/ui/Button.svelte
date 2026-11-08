<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils/cn';
	import { Loader2 } from 'lucide-svelte';

	export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
	export type ButtonSize = 'sm' | 'md' | 'lg';

	interface Props extends HTMLButtonAttributes {
		variant?: ButtonVariant;
		size?: ButtonSize;
		loading?: boolean;
		fullWidth?: boolean;
		leftIcon?: Snippet;
		rightIcon?: Snippet;
		children?: Snippet;
		class?: string;
	}

	let {
		variant = 'primary',
		size = 'md',
		loading = false,
		fullWidth = false,
		disabled = false,
		type = 'button',
		leftIcon,
		rightIcon,
		children,
		class: className = '',
		...restProps
	}: Props = $props();

	const variantClasses: Record<ButtonVariant, string> = {
		primary:
			'bg-brand-blue text-neutral-white hover:bg-brand-blue-hover active:bg-brand-blue-active focus-visible:ring-brand-blue shadow-sm',
		secondary:
			'bg-brand-dark text-neutral-white hover:bg-brand-dark-alt focus-visible:ring-brand-dark shadow-sm',
		outline:
			'border border-neutral-border text-neutral-text hover:bg-neutral-surface hover:text-neutral-dark focus-visible:ring-brand-blue',
		ghost:
			'text-neutral-text hover:bg-neutral-surface hover:text-neutral-dark focus-visible:ring-brand-blue',
		danger:
			'bg-feedback-error text-neutral-white hover:opacity-90 active:opacity-100 focus-visible:ring-feedback-error shadow-sm',
		success:
			'bg-feedback-success text-neutral-white hover:opacity-90 active:opacity-100 focus-visible:ring-feedback-success shadow-sm'
	};

	const sizeClasses: Record<ButtonSize, string> = {
		sm: 'px-3 py-1.5 text-xs font-medium rounded-md gap-1.5',
		md: 'px-4 py-2 text-sm font-semibold rounded-lg gap-2',
		lg: 'px-6 py-3 text-base font-bold rounded-lg gap-2.5'
	};

	const isDisabled = $derived(disabled || loading);
</script>

<button
	{type}
	disabled={isDisabled}
	aria-busy={loading}
	class={cn(
		'inline-flex items-center justify-center font-sans transition-colors duration-150',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
		'disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer',
		variantClasses[variant],
		sizeClasses[size],
		fullWidth && 'w-full',
		className
	)}
	{...restProps}
>
	{#if loading}
		<Loader2 class="h-4 w-4 animate-spin text-current" />
	{:else if leftIcon}
		{@render leftIcon()}
	{/if}

	{#if children}
		{@render children()}
	{/if}

	{#if !loading && rightIcon}
		{@render rightIcon()}
	{/if}
</button>

