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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      artigo_itens: {
        Row: {
          artigo_id: string | null
          created_at: string
          deleted_at: boolean | null
          documento_fiscal_id: string
          id: string
          quantidade: number | null
        }
        Insert: {
          artigo_id?: string | null
          created_at?: string
          deleted_at?: boolean | null
          documento_fiscal_id?: string
          id?: string
          quantidade?: number | null
        }
        Update: {
          artigo_id?: string | null
          created_at?: string
          deleted_at?: boolean | null
          documento_fiscal_id?: string
          id?: string
          quantidade?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "artigo_itens_artigo_id_fkey"
            columns: ["artigo_id"]
            isOneToOne: false
            referencedRelation: "artigos_tipo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artigo_itens_documento_fiscal_id_fkey"
            columns: ["documento_fiscal_id"]
            isOneToOne: false
            referencedRelation: "documentos_fiscal"
            referencedColumns: ["id"]
          },
        ]
      }
      artigos: {
        Row: {
          artigo_tipo_id: string | null
          created_at: string
          deleted_at: boolean | null
          descricao: string | null
          id: string
          nome: string
          preco: number | null
        }
        Insert: {
          artigo_tipo_id?: string | null
          created_at?: string
          deleted_at?: boolean | null
          descricao?: string | null
          id?: string
          nome: string
          preco?: number | null
        }
        Update: {
          artigo_tipo_id?: string | null
          created_at?: string
          deleted_at?: boolean | null
          descricao?: string | null
          id?: string
          nome?: string
          preco?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "artigos_artigo_tipo_id_fkey"
            columns: ["artigo_tipo_id"]
            isOneToOne: false
            referencedRelation: "artigos_tipo"
            referencedColumns: ["id"]
          },
        ]
      }
      artigos_tipo: {
        Row: {
          created_at: string
          deleted_at: boolean | null
          descricao: string
          id: string
        }
        Insert: {
          created_at?: string
          deleted_at?: boolean | null
          descricao: string
          id?: string
        }
        Update: {
          created_at?: string
          deleted_at?: boolean | null
          descricao?: string
          id?: string
        }
        Relationships: []
      }
      clientes: {
        Row: {
          contactos: string[] | null
          created_at: string
          deleted_at: boolean | null
          email: string | null
          endereco: string | null
          id: string
          nif: string
          nome: string
        }
        Insert: {
          contactos?: string[] | null
          created_at?: string
          deleted_at?: boolean | null
          email?: string | null
          endereco?: string | null
          id?: string
          nif: string
          nome: string
        }
        Update: {
          contactos?: string[] | null
          created_at?: string
          deleted_at?: boolean | null
          email?: string | null
          endereco?: string | null
          id?: string
          nif?: string
          nome?: string
        }
        Relationships: []
      }
      documentos_fiscal: {
        Row: {
          cliente_id: string
          created_at: string
          data_emissao: string | null
          deleted_at: boolean | null
          desconto: number | null
          documento_tipo: Database["public"]["Enums"]["documento_tipo"]
          empresa_id: string
          estado: Database["public"]["Enums"]["documento_fiscal_estados"] | null
          id: string
          imposto: number | null
          moeda_id: string | null
          numero: number
          observacao: string | null
          subtotal: number | null
          total: number | null
        }
        Insert: {
          cliente_id?: string
          created_at?: string
          data_emissao?: string | null
          deleted_at?: boolean | null
          desconto?: number | null
          documento_tipo: Database["public"]["Enums"]["documento_tipo"]
          empresa_id?: string
          estado?:
            | Database["public"]["Enums"]["documento_fiscal_estados"]
            | null
          id?: string
          imposto?: number | null
          moeda_id?: string | null
          numero: number
          observacao?: string | null
          subtotal?: number | null
          total?: number | null
        }
        Update: {
          cliente_id?: string
          created_at?: string
          data_emissao?: string | null
          deleted_at?: boolean | null
          desconto?: number | null
          documento_tipo?: Database["public"]["Enums"]["documento_tipo"]
          empresa_id?: string
          estado?:
            | Database["public"]["Enums"]["documento_fiscal_estados"]
            | null
          id?: string
          imposto?: number | null
          moeda_id?: string | null
          numero?: number
          observacao?: string | null
          subtotal?: number | null
          total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "documentos_fiscal_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documentos_fiscal_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documentos_fiscal_moeda_id_fkey"
            columns: ["moeda_id"]
            isOneToOne: false
            referencedRelation: "moedas"
            referencedColumns: ["id"]
          },
        ]
      }
      empresas: {
        Row: {
          contactos: string[] | null
          created_at: string
          deleted_at: boolean | null
          email: string
          endereco: string | null
          id: string
          logo_url: string | null
          nif: string
          nome: string
        }
        Insert: {
          contactos?: string[] | null
          created_at?: string
          deleted_at?: boolean | null
          email: string
          endereco?: string | null
          id?: string
          logo_url?: string | null
          nif: string
          nome: string
        }
        Update: {
          contactos?: string[] | null
          created_at?: string
          deleted_at?: boolean | null
          email?: string
          endereco?: string | null
          id?: string
          logo_url?: string | null
          nif?: string
          nome?: string
        }
        Relationships: []
      }
      funcionarios: {
        Row: {
          activo: boolean | null
          created_at: string
          deleted_at: boolean | null
          empresa_id: string
          funcao: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          activo?: boolean | null
          created_at?: string
          deleted_at?: boolean | null
          empresa_id?: string
          funcao?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          activo?: boolean | null
          created_at?: string
          deleted_at?: boolean | null
          empresa_id?: string
          funcao?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "funcionarios_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "funcionarios_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      moedas: {
        Row: {
          created_at: string
          deleted_at: boolean | null
          descricao: string | null
          id: string
          simbol: string
        }
        Insert: {
          created_at?: string
          deleted_at?: boolean | null
          descricao?: string | null
          id?: string
          simbol: string
        }
        Update: {
          created_at?: string
          deleted_at?: boolean | null
          descricao?: string | null
          id?: string
          simbol?: string
        }
        Relationships: []
      }
      pagamentos_tipo: {
        Row: {
          created_at: string
          deleted_at: boolean | null
          descricao: string | null
          id: string
        }
        Insert: {
          created_at?: string
          deleted_at?: boolean | null
          descricao?: string | null
          id?: string
        }
        Update: {
          created_at?: string
          deleted_at?: boolean | null
          descricao?: string | null
          id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          deleted_at: boolean | null
          email: string
          id: string
          updated_at: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          deleted_at?: boolean | null
          email: string
          id?: string
          updated_at?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          deleted_at?: boolean | null
          email?: string
          id?: string
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      documento_fiscal_estados: "RASCUNHO" | "EMITIDO" | "ANULADO"
      documento_tipo:
        | "FATURA"
        | "FATURA_PROFORMA"
        | "NOTA_CREDITO"
        | "NOTA_DEBITO"
        | "RECIBO"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      documento_fiscal_estados: ["RASCUNHO", "EMITIDO", "ANULADO"],
      documento_tipo: [
        "FATURA",
        "FATURA_PROFORMA",
        "NOTA_CREDITO",
        "NOTA_DEBITO",
        "RECIBO",
      ],
    },
  },
} as const
