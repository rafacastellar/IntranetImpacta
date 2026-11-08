export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      atas: {
        Row: {
          arquivo_url: string | null
          autor_id: string
          conteudo_realizado: string | null
          criado_em: string | null
          id: number
          pauta_previa: string | null
          publicado_em: string | null
          reuniao_id: number
          status: string | null
          versao: number | null
        }
        Insert: {
          arquivo_url?: string | null
          autor_id: string
          conteudo_realizado?: string | null
          criado_em?: string | null
          id?: number
          pauta_previa?: string | null
          publicado_em?: string | null
          reuniao_id: number
          status?: string | null
          versao?: number | null
        }
        Update: {
          arquivo_url?: string | null
          autor_id?: string
          conteudo_realizado?: string | null
          criado_em?: string | null
          id?: number
          pauta_previa?: string | null
          publicado_em?: string | null
          reuniao_id?: number
          status?: string | null
          versao?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "atas_autor_id_fkey"
            columns: ["autor_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "atas_reuniao_id_fkey"
            columns: ["reuniao_id"]
            isOneToOne: true
            referencedRelation: "reunioes"
            referencedColumns: ["id"]
          },
        ]
      }
      aviso_turmas: {
        Row: {
          aviso_id: number
          turma_id: number
        }
        Insert: {
          aviso_id: number
          turma_id: number
        }
        Update: {
          aviso_id?: number
          turma_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "aviso_turmas_aviso_id_fkey"
            columns: ["aviso_id"]
            isOneToOne: false
            referencedRelation: "avisos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aviso_turmas_turma_id_fkey"
            columns: ["turma_id"]
            isOneToOne: false
            referencedRelation: "turmas"
            referencedColumns: ["id"]
          },
        ]
      }
      avisos: {
        Row: {
          ativo: boolean | null
          autor_id: string
          categoria_id: number
          conteudo: string
          data_expiracao: string | null
          data_publicacao: string | null
          id: number
          prioridade: string | null
          titulo: string
        }
        Insert: {
          ativo?: boolean | null
          autor_id: string
          categoria_id: number
          conteudo: string
          data_expiracao?: string | null
          data_publicacao?: string | null
          id?: number
          prioridade?: string | null
          titulo: string
        }
        Update: {
          ativo?: boolean | null
          autor_id?: string
          categoria_id?: number
          conteudo?: string
          data_expiracao?: string | null
          data_publicacao?: string | null
          id?: number
          prioridade?: string | null
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "avisos_autor_id_fkey"
            columns: ["autor_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "avisos_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias_aviso"
            referencedColumns: ["id"]
          },
        ]
      }
      categorias_aviso: {
        Row: {
          cor_hex: string | null
          id: number
          nome: string
        }
        Insert: {
          cor_hex?: string | null
          id?: number
          nome: string
        }
        Update: {
          cor_hex?: string | null
          id?: number
          nome?: string
        }
        Relationships: []
      }
      categorias_documento: {
        Row: {
          descricao: string | null
          id: number
          nome: string
        }
        Insert: {
          descricao?: string | null
          id?: number
          nome: string
        }
        Update: {
          descricao?: string | null
          id?: number
          nome?: string
        }
        Relationships: []
      }
      comunicado_leituras: {
        Row: {
          comunicado_id: number
          lido_em: string | null
          usuario_id: string
        }
        Insert: {
          comunicado_id: number
          lido_em?: string | null
          usuario_id: string
        }
        Update: {
          comunicado_id?: number
          lido_em?: string | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comunicado_leituras_comunicado_id_fkey"
            columns: ["comunicado_id"]
            isOneToOne: false
            referencedRelation: "comunicados_direcionados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comunicado_leituras_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      comunicados_direcionados: {
        Row: {
          alvo_tipo: string
          curso_id_alvo: number | null
          data_envio: string | null
          id: number
          mensagem: string
          perfil_id_alvo: number | null
          remetente_id: string
          titulo: string
          turma_id_alvo: number | null
        }
        Insert: {
          alvo_tipo: string
          curso_id_alvo?: number | null
          data_envio?: string | null
          id?: number
          mensagem: string
          perfil_id_alvo?: number | null
          remetente_id: string
          titulo: string
          turma_id_alvo?: number | null
        }
        Update: {
          alvo_tipo?: string
          curso_id_alvo?: number | null
          data_envio?: string | null
          id?: number
          mensagem?: string
          perfil_id_alvo?: number | null
          remetente_id?: string
          titulo?: string
          turma_id_alvo?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "comunicados_direcionados_curso_id_alvo_fkey"
            columns: ["curso_id_alvo"]
            isOneToOne: false
            referencedRelation: "cursos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comunicados_direcionados_perfil_id_alvo_fkey"
            columns: ["perfil_id_alvo"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comunicados_direcionados_remetente_id_fkey"
            columns: ["remetente_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comunicados_direcionados_turma_id_alvo_fkey"
            columns: ["turma_id_alvo"]
            isOneToOne: false
            referencedRelation: "turmas"
            referencedColumns: ["id"]
          },
        ]
      }
      cursos: {
        Row: {
          ativo: boolean | null
          codigo: string
          id: number
          nome: string
        }
        Insert: {
          ativo?: boolean | null
          codigo: string
          id?: number
          nome: string
        }
        Update: {
          ativo?: boolean | null
          codigo?: string
          id?: number
          nome?: string
        }
        Relationships: []
      }
      disciplinas: {
        Row: {
          carga_horaria: number
          id: number
          nome: string
        }
        Insert: {
          carga_horaria: number
          id?: number
          nome: string
        }
        Update: {
          carga_horaria?: number
          id?: number
          nome?: string
        }
        Relationships: []
      }
      documentos_politicas: {
        Row: {
          arquivo_url: string | null
          ativo: boolean | null
          autor_id: string
          categoria_id: number
          conteudo_html: string | null
          criado_em: string | null
          id: number
          palavras_chave: string[] | null
          resumo: string | null
          titulo: string
        }
        Insert: {
          arquivo_url?: string | null
          ativo?: boolean | null
          autor_id: string
          categoria_id: number
          conteudo_html?: string | null
          criado_em?: string | null
          id?: number
          palavras_chave?: string[] | null
          resumo?: string | null
          titulo: string
        }
        Update: {
          arquivo_url?: string | null
          ativo?: boolean | null
          autor_id?: string
          categoria_id?: number
          conteudo_html?: string | null
          criado_em?: string | null
          id?: number
          palavras_chave?: string[] | null
          resumo?: string | null
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "documentos_politicas_autor_id_fkey"
            columns: ["autor_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documentos_politicas_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias_documento"
            referencedColumns: ["id"]
          },
        ]
      }
      eventos_calendario: {
        Row: {
          curso_id: number | null
          data_fim: string
          data_inicio: string
          descricao: string | null
          id: number
          tipo_evento: string
          titulo: string
        }
        Insert: {
          curso_id?: number | null
          data_fim: string
          data_inicio: string
          descricao?: string | null
          id?: number
          tipo_evento: string
          titulo: string
        }
        Update: {
          curso_id?: number | null
          data_fim?: string
          data_inicio?: string
          descricao?: string | null
          id?: number
          tipo_evento?: string
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "eventos_calendario_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos"
            referencedColumns: ["id"]
          },
        ]
      }
      nde_membros: {
        Row: {
          ativo: boolean | null
          cargo: string
          curso_id: number
          data_fim: string | null
          data_inicio: string
          id: number
          usuario_id: string
        }
        Insert: {
          ativo?: boolean | null
          cargo: string
          curso_id: number
          data_fim?: string | null
          data_inicio: string
          id?: number
          usuario_id: string
        }
        Update: {
          ativo?: boolean | null
          cargo?: string
          curso_id?: number
          data_fim?: string | null
          data_inicio?: string
          id?: number
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nde_membros_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nde_membros_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      perfis: {
        Row: {
          descricao: string | null
          id: number
          nome: string
        }
        Insert: {
          descricao?: string | null
          id?: number
          nome: string
        }
        Update: {
          descricao?: string | null
          id?: number
          nome?: string
        }
        Relationships: []
      }
      professor_turmas: {
        Row: {
          turma_id: number
          usuario_id: string
        }
        Insert: {
          turma_id: number
          usuario_id: string
        }
        Update: {
          turma_id?: number
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "professor_turmas_turma_id_fkey"
            columns: ["turma_id"]
            isOneToOne: false
            referencedRelation: "turmas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "professor_turmas_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      reuniao_participantes: {
        Row: {
          reuniao_id: number
          usuario_id: string
        }
        Insert: {
          reuniao_id: number
          usuario_id: string
        }
        Update: {
          reuniao_id?: number
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reuniao_participantes_reuniao_id_fkey"
            columns: ["reuniao_id"]
            isOneToOne: false
            referencedRelation: "reunioes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reuniao_participantes_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      reunioes: {
        Row: {
          curso_id: number | null
          data_hora_fim: string
          data_hora_inicio: string
          descricao: string | null
          id: number
          local_link: string | null
          organizador_id: string
          status: string | null
          tipo_reuniao: string
          titulo: string
        }
        Insert: {
          curso_id?: number | null
          data_hora_fim: string
          data_hora_inicio: string
          descricao?: string | null
          id?: number
          local_link?: string | null
          organizador_id: string
          status?: string | null
          tipo_reuniao: string
          titulo: string
        }
        Update: {
          curso_id?: number | null
          data_hora_fim?: string
          data_hora_inicio?: string
          descricao?: string | null
          id?: number
          local_link?: string | null
          organizador_id?: string
          status?: string | null
          tipo_reuniao?: string
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "reunioes_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reunioes_organizador_id_fkey"
            columns: ["organizador_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      substituicoes_aula: {
        Row: {
          data_substituicao: string
          horario: string
          id: number
          motivo: string | null
          professor_substituto_id: string | null
          professor_titular_id: string
          sala: string | null
          status: string | null
          turma_id: number
        }
        Insert: {
          data_substituicao: string
          horario: string
          id?: number
          motivo?: string | null
          professor_substituto_id?: string | null
          professor_titular_id: string
          sala?: string | null
          status?: string | null
          turma_id: number
        }
        Update: {
          data_substituicao?: string
          horario?: string
          id?: number
          motivo?: string | null
          professor_substituto_id?: string | null
          professor_titular_id?: string
          sala?: string | null
          status?: string | null
          turma_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "substituicoes_aula_professor_substituto_id_fkey"
            columns: ["professor_substituto_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "substituicoes_aula_professor_titular_id_fkey"
            columns: ["professor_titular_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "substituicoes_aula_turma_id_fkey"
            columns: ["turma_id"]
            isOneToOne: false
            referencedRelation: "turmas"
            referencedColumns: ["id"]
          },
        ]
      }
      turma_disciplinas: {
        Row: {
          disciplina_id: number
          turma_id: number
        }
        Insert: {
          disciplina_id: number
          turma_id: number
        }
        Update: {
          disciplina_id?: number
          turma_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "turma_disciplinas_disciplina_id_fkey"
            columns: ["disciplina_id"]
            isOneToOne: false
            referencedRelation: "disciplinas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "turma_disciplinas_turma_id_fkey"
            columns: ["turma_id"]
            isOneToOne: false
            referencedRelation: "turmas"
            referencedColumns: ["id"]
          },
        ]
      }
      turmas: {
        Row: {
          ativo: boolean | null
          codigo: string
          curso_id: number
          id: number
          semestre_letivo: string
          turno: string
        }
        Insert: {
          ativo?: boolean | null
          codigo: string
          curso_id: number
          id?: number
          semestre_letivo: string
          turno: string
        }
        Update: {
          ativo?: boolean | null
          codigo?: string
          curso_id?: number
          id?: number
          semestre_letivo?: string
          turno?: string
        }
        Relationships: [
          {
            foreignKeyName: "turmas_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos"
            referencedColumns: ["id"]
          },
        ]
      }
      usuario_cursos: {
        Row: {
          curso_id: number
          usuario_id: string
        }
        Insert: {
          curso_id: number
          usuario_id: string
        }
        Update: {
          curso_id?: number
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usuario_cursos_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usuario_cursos_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      usuario_perfis: {
        Row: {
          atribuido_em: string | null
          perfil_id: number
          usuario_id: string
        }
        Insert: {
          atribuido_em?: string | null
          perfil_id: number
          usuario_id: string
        }
        Update: {
          atribuido_em?: string | null
          perfil_id?: number
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usuario_perfis_perfil_id_fkey"
            columns: ["perfil_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usuario_perfis_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          ativo: boolean | null
          criado_em: string | null
          email: string
          id: string
          nome: string
          perfil_id: number
          senha: string | null
        }
        Insert: {
          ativo?: boolean | null
          criado_em?: string | null
          email: string
          id: string
          nome: string
          perfil_id: number
          senha?: string | null
        }
        Update: {
          ativo?: boolean | null
          criado_em?: string | null
          email?: string
          id?: string
          nome?: string
          perfil_id?: number
          senha?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_perfil_id_fkey"
            columns: ["perfil_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
