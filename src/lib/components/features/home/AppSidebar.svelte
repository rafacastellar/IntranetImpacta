<script lang="ts">
  import {
    LayoutDashboard,
    Calendar,
    BookOpen,
    Send,
    Wrench,
    FileText,
    Users,
    ShieldCheck,
  } from "lucide-svelte";
  import { page } from "$app/state";

  interface Props {
    isOpen: boolean;
    onclose: () => void;
    currentRole?: string;
  }

  let { isOpen, onclose, currentRole = "Coordenador" }: Props = $props();

  const menuItems = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard, badge: "" },
    { label: "Reuniões e Atas", href: "/reunioes-e-atas", icon: Calendar },
    { label: "Minhas Turmas", href: "/#turmas", icon: BookOpen, badge: "" },
    {
      label: "Procedimentos e Políticas",
      href: "/procedimentos-e-politicas",
      icon: FileText,
      badge: "",
    },
    {
      label: "Gestão de Usuários",
      href: "/usuarios",
      icon: Users,
    },
    {
      label: "Impacta Direct",
      href: "/impacta-direct",
      icon: Send,
      badge: "Novo",
    },
  ];
</script>

{#if isOpen}
  <!-- Backdrop abaixo do header (top-14) -->
  <button
    type="button"
    class="fixed top-14 inset-x-0 bottom-0 bg-neutral-black/50 backdrop-blur-xs z-30 transition-opacity cursor-default"
    onclick={onclose}
    aria-label="Fechar menu lateral"
  ></button>
{/if}

<!-- Sidebar deslizante lateralmente abaixo do header (top-14) -->
<aside
  class={`fixed top-14 left-0 bottom-0 w-72 bg-brand-dark text-neutral-white border-r border-brand-dark-surface shadow-2xl z-30 flex flex-col transition-transform duration-300 ease-in-out font-sans ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  }`}
  aria-label="Menu Principal de Navegação"
>
  <!-- Cabeçalho da Sidebar -->
  <div
    class="px-5 py-4 border-b border-brand-dark-surface/80 flex items-center justify-between"
  >
    <div>
      <span
        class="text-[11px] font-bold text-brand-cyan uppercase tracking-wider block"
        >Intranet Docente</span
      >
      <span class="text-xs text-neutral-gray-300">Navegação & Módulos</span>
    </div>
    <span
      class="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-dark-surface text-brand-cyan border border-brand-cyan/20"
    >
      {currentRole}
    </span>
  </div>

  <!-- Lista de Links -->
  <nav class="flex-1 overflow-y-auto p-3 space-y-1">
    {#each menuItems as item}
      {@const Icon = item.icon}
      {@const isActive = page.url.pathname === item.href}
      <a
        href={item.href}
        onclick={onclose}
        class={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition group ${
          isActive
            ? "bg-brand-dark-alt text-brand-cyan shadow-xs"
            : "text-neutral-gray-200 hover:text-neutral-white hover:bg-brand-dark-alt"
        }`}
      >
        <div class="flex items-center gap-3">
          <Icon
            class={`h-4 w-4 shrink-0 transition-colors ${
              isActive
                ? "text-brand-cyan"
                : "text-neutral-gray-400 group-hover:text-neutral-white"
            }`}
          />
          <span class="truncate">{item.label}</span>
        </div>
        {#if item.badge}
          <span
            class={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
              item.badge === "Novo"
                ? "bg-brand-blue text-neutral-white"
                : item.badge === "Secretaria"
                  ? "bg-feedback-warning/20 text-feedback-warning border border-feedback-warning/30"
                  : "bg-brand-dark-surface text-brand-cyan"
            }`}
          >
            {item.badge}
          </span>
        {/if}
      </a>
    {/each}
  </nav>

  <!-- Rodapé Institucional -->
  <div
    class="p-4 border-t border-brand-dark-surface/80 text-[11px] text-neutral-gray-400 flex items-center justify-between"
  >
    <div class="flex items-center gap-1.5">
      <ShieldCheck class="h-3.5 w-3.5 text-brand-cyan" />
      <span>MEC Compliance v1.0</span>
    </div>
    <span class="text-[10px] text-neutral-gray-500">Impacta 2026</span>
  </div>
</aside>
