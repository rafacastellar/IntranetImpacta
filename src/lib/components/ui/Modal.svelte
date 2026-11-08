<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils/cn';
	import { X } from 'lucide-svelte';

	export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

	interface Props {
		isOpen?: boolean;
		title?: string;
		description?: string;
		size?: ModalSize;
		closeOnBackdrop?: boolean;
		closeOnEsc?: boolean;
		onclose?: () => void;
		header?: Snippet;
		footer?: Snippet;
		children?: Snippet;
		class?: string;
	}

	let {
		isOpen = $bindable(false),
		title,
		description,
		size = 'md',
		closeOnBackdrop = true,
		closeOnEsc = true,
		onclose,
		header,
		footer,
		children,
		class: className = ''
	}: Props = $props();

	function closeModal() {
		isOpen = false;
		onclose?.();
	}

	function handleBackdropClick(event: MouseEvent) {
		if (closeOnBackdrop && event.target === event.currentTarget) {
			closeModal();
		}
	}

	$effect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (closeOnEsc && e.key === 'Escape') {
				closeModal();
			}
		};

		document.body.classList.add('overflow-hidden');
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			document.body.classList.remove('overflow-hidden');
			window.removeEventListener('keydown', handleKeyDown);
		};
	});

	const sizeClasses: Record<ModalSize, string> = {
		sm: 'max-w-sm',
		md: 'max-w-md',
		lg: 'max-w-lg',
		xl: 'max-w-2xl',
		full: 'max-w-5xl'
	};
</script>

{#if isOpen}
	<div
		role="presentation"
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark-deep/60 backdrop-blur-xs transition-opacity duration-200"
		onclick={handleBackdropClick}
	>
		<div
			role="dialog"
			aria-modal="true"
			aria-labelledby={title ? 'modal-title' : undefined}
			aria-describedby={description ? 'modal-description' : undefined}
			class={cn(
				'relative w-full rounded-2xl bg-neutral-white shadow-2xl font-sans',
				'border border-neutral-border-light overflow-hidden flex flex-col',
				'max-h-[90vh] animate-in fade-in zoom-in-95 duration-150',
				sizeClasses[size],
				className
			)}
		>
			<!-- Header -->
			<div class="flex items-start justify-between border-b border-neutral-border-light px-5 py-4">
				{#if header}
					{@render header()}
				{:else}
					<div class="pr-6">
						{#if title}
							<h2 id="modal-title" class="text-lg font-bold text-brand-dark">
								{title}
							</h2>
						{/if}
						{#if description}
							<p id="modal-description" class="text-xs text-neutral-gray-500 mt-1">
								{description}
							</p>
						{/if}
					</div>
				{/if}

				<button
					type="button"
					aria-label="Fechar"
					onclick={closeModal}
					class="rounded-lg p-1 text-neutral-gray-500 hover:bg-neutral-surface hover:text-neutral-dark focus:outline-none focus:ring-2 focus:ring-brand-blue cursor-pointer"
				>
					<X class="h-5 w-5" />
				</button>
			</div>

			<!-- Body -->
			<div class="flex-1 overflow-y-auto px-5 py-4 text-sm text-neutral-text">
				{#if children}
					{@render children()}
				{/if}
			</div>

			<!-- Footer -->
			{#if footer}
				<div class="flex items-center justify-end gap-2 border-t border-neutral-border-light bg-neutral-surface/40 px-5 py-3">
					{@render footer()}
				</div>
			{/if}
		</div>
	</div>
{/if}
