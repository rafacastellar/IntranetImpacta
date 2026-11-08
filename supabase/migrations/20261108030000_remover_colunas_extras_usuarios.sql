-- ========================================================
-- Migração: Remover colunas extras da tabela usuarios
-- A tabela usuarios mantém exclusivamente sua estrutura canônica:
-- id, nome, email, perfil_id, ativo, criado_em
-- ========================================================

ALTER TABLE usuarios
    DROP COLUMN IF EXISTS telefone,
    DROP COLUMN IF EXISTS titulacao,
    DROP COLUMN IF EXISTS lattes_url,
    DROP COLUMN IF EXISTS linkedin_url,
    DROP COLUMN IF EXISTS bio,
    DROP COLUMN IF EXISTS notif_email,
    DROP COLUMN IF EXISTS notif_substituicoes,
    DROP COLUMN IF EXISTS notif_reunioes;

-- Garante que a política RLS para atualização do próprio registro continue ativa
DROP POLICY IF EXISTS "Atualizacao do proprio perfil de usuario" ON usuarios;
CREATE POLICY "Atualizacao do proprio perfil de usuario"
    ON usuarios FOR UPDATE TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

