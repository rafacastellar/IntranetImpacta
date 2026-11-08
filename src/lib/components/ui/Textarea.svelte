<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils/cn';

	interface Props extends Omit<HTMLTextareaAttributes, 'value'> {
		value?: string;
		label?: string;
		error?: string;
		helperText?: string;
		wrapperClass?: string;
		class?: string;
	}

	let {
		value = $bindable(''),
		label,
		error,
		helperText,
		id,
		rows = 4,
		disabled = false,
		required = false,
		wrapperClass = '',
		class: className = '',
		...restProps
	}: Props = $props();

	const autoId = `textarea-${Math.random().toString(36).substring(2, 9)}`;
	const textareaId = $derived(id || autoId);
</script>

<div class={cn('flex flex-col gap-1.5 w-full font-sans', wrapperClass)}>
	{#if label}
		<label for={textareaId} class="text-xs font-semibold text-neutral-dark flex items-center gap-1">
			{label}
			{#if required}
				<span class="text-feedback-error">*</span>
			{/if}
		</label>
	{/if}

	<textarea
		id={textareaId}
		bind:value
		{rows}
		{disabled}
		{required}
		aria-invalid={!!error}
		class={cn(
			'w-full rounded-lg border bg-neutral-white px-3.5 py-2 text-sm text-neutral-dark',
			'placeholder:text-neutral-gray-400 transition duration-150',
			'focus:outline-none focus:ring-2 focus:ring-offset-0',
			error
				? 'border-feedback-error focus:border-feedback-error focus:ring-feedback-error/20'
				: 'border-neutral-border focus:border-brand-blue focus:ring-brand-blue/20',
			disabled && 'bg-neutral-surface text-neutral-gray-400 cursor-not-allowed border-neutral-border-light',
			className
		)}
		{...restProps}
	></textarea>

	{#if error}
		<p class="text-xs font-medium text-feedback-error">
			{error}
		</p>
	{:else if helperText}
		<p class="text-xs text-neutral-gray-500">
			{helperText}
		</p>
	{/if}
</div>

