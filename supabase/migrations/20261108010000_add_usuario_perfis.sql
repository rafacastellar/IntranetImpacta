-- Migração para permitir múltiplos perfis por usuário (N:N)
CREATE TABLE IF NOT EXISTS usuario_perfis (
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    perfil_id INT REFERENCES perfis(id) ON DELETE CASCADE,
    atribuido_em TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    PRIMARY KEY (usuario_id, perfil_id)
);

ALTER TABLE usuario_perfis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Leitura de usuario_perfis para autenticados"
    ON usuario_perfis FOR SELECT TO authenticated USING (true);

CREATE POLICY "Gerenciamento de usuario_perfis por service_role"
    ON usuario_perfis FOR ALL TO service_role USING (true);

