<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils/cn';

	interface Props extends Omit<HTMLInputAttributes, 'value'> {
		value?: string | number;
		label?: string;
		error?: string;
		helperText?: string;
		leftIcon?: Snippet;
		rightIcon?: Snippet;
		wrapperClass?: string;
		class?: string;
	}

	let {
		value = $bindable(''),
		label,
		error,
		helperText,
		id,
		type = 'text',
		disabled = false,
		required = false,
		leftIcon,
		rightIcon,
		wrapperClass = '',
		class: className = '',
		...restProps
	}: Props = $props();

	const autoId = `input-${Math.random().toString(36).substring(2, 9)}`;
	const inputId = $derived(id || autoId);
	const errorId = $derived(`${inputId}-error`);
	const helperId = $derived(`${inputId}-helper`);
</script>

<div class={cn('flex flex-col gap-1.5 w-full font-sans', wrapperClass)}>
	{#if label}
		<label for={inputId} class="text-xs font-semibold text-neutral-dark flex items-center gap-1">
			{label}
			{#if required}
				<span class="text-feedback-error">*</span>
			{/if}
		</label>
	{/if}

	<div class="relative flex items-center w-full">
		{#if leftIcon}
			<div class="absolute left-3 flex items-center pointer-events-none text-neutral-gray-500">
				{@render leftIcon()}
			</div>
		{/if}

		<input
			id={inputId}
			{type}
			{disabled}
			{required}
			bind:value
			aria-invalid={!!error}
			aria-describedby={error ? errorId : helperText ? helperId : undefined}
			class={cn(
				'w-full rounded-lg border bg-neutral-white px-3.5 py-2 text-sm text-neutral-dark',
				'placeholder:text-neutral-gray-400 transition duration-150',
				'focus:outline-none focus:ring-2 focus:ring-offset-0',
				error
					? 'border-feedback-error focus:border-feedback-error focus:ring-feedback-error/20'
					: 'border-neutral-border focus:border-brand-blue focus:ring-brand-blue/20',
				disabled && 'bg-neutral-surface text-neutral-gray-400 cursor-not-allowed border-neutral-border-light',
				leftIcon && 'pl-10',
				rightIcon && 'pr-10',
				className
			)}
			{...restProps}
		/>

		{#if rightIcon}
			<div class="absolute right-3 flex items-center text-neutral-gray-500">
				{@render rightIcon()}
			</div>
		{/if}
	</div>

	{#if error}
		<p id={errorId} class="text-xs font-medium text-feedback-error">
			{error}
		</p>
	{:else if helperText}
		<p id={helperId} class="text-xs text-neutral-gray-500">
			{helperText}
		</p>
	{/if}
</div>

