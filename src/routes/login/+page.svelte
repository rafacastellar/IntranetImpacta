<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { Mail, Lock, LogIn, AlertCircle, Eye, EyeOff } from 'lucide-svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import DemoCredentialsCard from '$lib/components/features/login/DemoCredentialsCard.svelte';

	let { form }: { form: ActionData } = $props();

	let email = $state('carlos.silveira@impacta.edu.br');
	let password = $state('Impacta@2026Password');
	let showPassword = $state(false);
	let isSubmitting = $state(false);

	function fillDemoCredentials() {
		email = 'carlos.silveira@impacta.edu.br';
		password = 'Impacta@2026Password';
	}
</script>

<svelte:head>
	<title>Login | Intranet Impacta</title>
</svelte:head>

<div class="min-h-screen bg-brand-dark-deep flex flex-col justify-center items-center p-4 sm:p-6 font-sans text-neutral-text">
	<div class="w-full max-w-md">
		<!-- Brand Header -->
		<div class="flex flex-col items-center text-center mb-6">
			<div class="bg-neutral-white p-3 rounded-2xl shadow-lg border border-brand-cyan/20 mb-3 flex items-center justify-center">
				<img src="/logo_impacta.svg" alt="Faculdade Impacta" class="h-10 w-auto object-contain" />
			</div>
			<h1 class="text-xl sm:text-2xl font-bold text-neutral-white tracking-tight">Portal do Corpo Docente</h1>
			<p class="text-xs sm:text-sm text-neutral-gray-400 mt-1">Coordenação, NDE e Gestão Acadêmica</p>
		</div>

		<!-- Card de Login -->
		<div class="bg-neutral-white rounded-2xl shadow-2xl border border-neutral-border-light p-6 sm:p-8">
			<h2 class="text-lg font-bold text-brand-dark mb-1">Acesse sua conta</h2>
			<p class="text-xs text-neutral-gray-500 mb-5">Informe suas credenciais institucionais para entrar.</p>

			{#if form?.error}
				<div class="mb-5 p-3 rounded-xl bg-feedback-error/10 border border-feedback-error/20 flex items-start gap-2.5 text-xs text-feedback-error font-medium">
					<AlertCircle class="h-4 w-4 shrink-0 mt-0.5" />
					<span>{form.error}</span>
				</div>
			{/if}

			<form
				method="POST"
				use:enhance={() => {
					isSubmitting = true;
					return async ({ update }) => {
						isSubmitting = false;
						await update();
					};
				}}
				class="space-y-4"
			>
				<div>
					<label for="email" class="block text-xs font-bold text-neutral-dark mb-1.5">E-mail Institucional</label>
					<div class="relative flex items-center">
						<Mail class="absolute left-3.5 h-4 w-4 text-neutral-gray-400 pointer-events-none" />
						<input
							id="email"
							name="email"
							type="email"
							required
							autocomplete="email"
							bind:value={email}
							placeholder="nome.sobrenome@impacta.edu.br"
							class="w-full rounded-xl border border-neutral-border bg-neutral-white pl-10 pr-4 py-2.5 text-sm text-neutral-dark placeholder:text-neutral-gray-400 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition"
						/>
					</div>
				</div>

				<div>
					<div class="flex items-center justify-between mb-1.5">
						<label for="password" class="text-xs font-bold text-neutral-dark">Senha</label>
						<a href="#recuperar" class="text-[11px] font-semibold text-brand-blue hover:underline">Esqueceu a senha?</a>
					</div>
					<div class="relative flex items-center">
						<Lock class="absolute left-3.5 h-4 w-4 text-neutral-gray-400 pointer-events-none" />
						<input
							id="password"
							name="password"
							type={showPassword ? 'text' : 'password'}
							required
							autocomplete="current-password"
							bind:value={password}
							placeholder="••••••••••••"
							class="w-full rounded-xl border border-neutral-border bg-neutral-white pl-10 pr-10 py-2.5 text-sm text-neutral-dark placeholder:text-neutral-gray-400 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition"
						/>
						<button
							type="button"
							onclick={() => (showPassword = !showPassword)}
							class="absolute right-3 text-neutral-gray-400 hover:text-neutral-dark cursor-pointer transition p-1"
							aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
						>
							{#if showPassword}
								<EyeOff class="h-4 w-4" />
							{:else}
								<Eye class="h-4 w-4" />
							{/if}
						</button>
					</div>
				</div>

				<div class="pt-2">
					<Button type="submit" variant="primary" fullWidth loading={isSubmitting} size="lg">
						{#snippet leftIcon()}
							<LogIn class="h-4 w-4" />
						{/snippet}
						Entrar no Portal
					</Button>
				</div>
			</form>

			<DemoCredentialsCard onFill={fillDemoCredentials} />
		</div>

		<!-- Footer -->
		<div class="text-center mt-6 text-xs text-neutral-gray-500">
			<p>© 2026 Faculdade Impacta de Tecnologia. Todos os direitos reservados.</p>
		</div>
	</div>
</div>
