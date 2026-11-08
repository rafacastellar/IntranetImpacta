<script lang="ts">
  import type { PageProps } from "./$types";
  import HeaderNavbar from "$lib/components/features/home/HeaderNavbar.svelte";
  import KpiCards from "$lib/components/features/home/KpiCards.svelte";
  import QuickActions from "$lib/components/features/home/QuickActions.svelte";
  import MuralFeed from "$lib/components/features/home/MuralFeed.svelte";
  import ReunioesSection from "$lib/components/features/home/ReunioesSection.svelte";
  import SubstituicoesWidget from "$lib/components/features/home/SubstituicoesWidget.svelte";
  import DocumentsWidget from "$lib/components/features/home/DocumentsWidget.svelte";
  import ReportIncidentModal from "$lib/components/features/home/ReportIncidentModal.svelte";
  import NovoAvisoModal from "$lib/components/features/home/NovoAvisoModal.svelte";
  import AvisoDetailModal from "$lib/components/features/home/AvisoDetailModal.svelte";
  import SolicitarSubstituicaoModal from "$lib/components/features/home/SolicitarSubstituicaoModal.svelte";
  import { Badge } from "$lib/components/ui";
  import type { MockAviso, MockSubstituicao } from "$lib/server/mockData";

  let { data }: PageProps = $props();

  let selectedRole = $state("Coordenador");
  let addedAvisos = $state<MockAviso[]>([]);
  let addedSubstituicoes = $state<MockSubstituicao[]>([]);

  const avisos = $derived([...addedAvisos, ...data.avisos]);
  const substituicoes = $derived([
    ...addedSubstituicoes,
    ...data.substituicoes,
  ]);

  let isReportModalOpen = $state(false);
  let isNovoAvisoModalOpen = $state(false);
  let isSubstituicaoModalOpen = $state(false);
  let selectedAviso = $state<MockAviso | null>(null);
  let feedbackMessage = $state<string | null>(null);

  const todayFormatted = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  function showFeedback(msg: string) {
    feedbackMessage = msg;
    setTimeout(() => (feedbackMessage = null), 4000);
  }

  function handleIncidentSubmit(incident: {
    sala: string;
    tipo: string;
    descricao: string;
  }) {
    showFeedback(`Chamado registrado com sucesso para ${incident.sala}.`);
  }

  function handleCreateAviso(
    novo: Omit<MockAviso, "id" | "data_publicacao" | "ativo">,
  ) {
    addedAvisos = [
      {
        ...novo,
        id: Date.now(),
        data_publicacao: new Date().toISOString(),
        ativo: true,
      },
      ...addedAvisos,
    ];
    showFeedback("Comunicado publicado no mural com sucesso!");
  }

  function handleCreateSubstituicao(
    sub: Omit<MockSubstituicao, "id" | "status">,
  ) {
    addedSubstituicoes = [
      { ...sub, id: Date.now(), status: "SOLICITADO" },
      ...addedSubstituicoes,
    ];
    showFeedback("Solicitação de substituição enviada para a coordenação.");
  }
</script>

<svelte:head>
  <title>Intranet Acadêmica — Faculdade Impacta</title>
</svelte:head>

<div class="min-h-screen bg-neutral-offwhite font-sans text-neutral-dark pb-16">
  <!-- Navbar Unificada com Módulos, Visão RBAC e Perfil -->
  <HeaderNavbar userName={data.user.nome} bind:selectedRole />

  {#if feedbackMessage}
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div
        class="p-3.5 rounded-xl bg-feedback-success/10 border border-feedback-success/30 text-xs font-semibold text-feedback-success flex items-center justify-between shadow-xs"
      >
        <span>{feedbackMessage}</span>
        <button
          type="button"
          class="cursor-pointer"
          onclick={() => (feedbackMessage = null)}>✕</button
        >
      </div>
    </div>
  {/if}

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col gap-6">
    <KpiCards
      reunioesCount={data.atas.length}
      avisosUrgentesCount={avisos.filter((a) => a.prioridade === "URGENTE")
        .length}
      atasPendentesCount={data.atas.filter((a) => a.status !== "PUBLICADA")
        .length}
      substituicoesCount={substituicoes.length}
    />

    <QuickActions
      userRole={selectedRole}
      onReportIncident={() => (isReportModalOpen = true)}
      onNewNotice={() => (isNovoAvisoModalOpen = true)}
      onNewSubstituicao={() => (isSubstituicaoModalOpen = true)}
      onNewAta={() => (isNovoAvisoModalOpen = true)}
    />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div class="lg:col-span-7 flex flex-col gap-6">
        <MuralFeed {avisos} onSelectAviso={(a) => (selectedAviso = a)} />
        <DocumentsWidget documentos={data.documentos} />
      </div>

      <div class="lg:col-span-5 flex flex-col gap-6">
        <ReunioesSection atas={data.atas} />
        <SubstituicoesWidget
          {substituicoes}
          onRequestSubstituicao={() => (isSubstituicaoModalOpen = true)}
        />
      </div>
    </div>
  </main>

  <!-- Modais Interativos -->
  <ReportIncidentModal bind:isOpen={isReportModalOpen} onsubmit={handleIncidentSubmit} />
  <NovoAvisoModal bind:isOpen={isNovoAvisoModalOpen} oncreate={handleCreateAviso} />
  <AvisoDetailModal isOpen={!!selectedAviso} aviso={selectedAviso} onConfirmRead={() => showFeedback("Leitura registrada!")} />
  <SolicitarSubstituicaoModal bind:isOpen={isSubstituicaoModalOpen} oncreate={handleCreateSubstituicao} />
</div>
