<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils/cn';
	import { ChevronDown } from 'lucide-svelte';

	export interface SelectOption {
		label: string;
		value: string | number;
	}

	interface Props extends Omit<HTMLSelectAttributes, 'value'> {
		value?: string | number;
		label?: string;
		error?: string;
		options?: SelectOption[];
		placeholder?: string;
		wrapperClass?: string;
		class?: string;
	}

	let {
		value = $bindable(''),
		label,
		error,
		options = [],
		placeholder,
		id,
		disabled = false,
		required = false,
		wrapperClass = '',
		class: className = '',
		...restProps
	}: Props = $props();

	const autoId = `select-${Math.random().toString(36).substring(2, 9)}`;
	const selectId = $derived(id || autoId);
</script>

<div class={cn('flex flex-col gap-1.5 w-full font-sans', wrapperClass)}>
	{#if label}
		<label for={selectId} class="text-xs font-semibold text-neutral-dark flex items-center gap-1">
			{label}
			{#if required}
				<span class="text-feedback-error">*</span>
			{/if}
		</label>
	{/if}

	<div class="relative flex items-center w-full">
		<select
			id={selectId}
			bind:value
			{disabled}
			{required}
			aria-invalid={!!error}
			class={cn(
				'w-full appearance-none rounded-lg border bg-neutral-white px-3.5 py-2 pr-10 text-sm text-neutral-dark',
				'transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0 cursor-pointer',
				error
					? 'border-feedback-error focus:border-feedback-error focus:ring-feedback-error/20'
					: 'border-neutral-border focus:border-brand-blue focus:ring-brand-blue/20',
				disabled && 'bg-neutral-surface text-neutral-gray-400 cursor-not-allowed border-neutral-border-light',
				className
			)}
			{...restProps}
		>
			{#if placeholder}
				<option value="" disabled selected={value === ''}>{placeholder}</option>
			{/if}
			{#each options as opt (opt.value)}
				<option value={opt.value}>{opt.label}</option>
			{/each}
		</select>

		<div class="pointer-events-none absolute right-3 flex items-center text-neutral-gray-500">
			<ChevronDown class="h-4 w-4" />
		</div>
	</div>

	{#if error}
		<p class="text-xs font-medium text-feedback-error">
			{error}
		</p>
	{/if}
</div>

