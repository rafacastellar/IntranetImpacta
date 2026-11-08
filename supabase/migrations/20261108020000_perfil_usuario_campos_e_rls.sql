-- ========================================================
-- Migração: Campos de Perfil de Usuário e Política RLS de Edição
-- ========================================================

-- 1. Novos campos de perfil acadêmico e contato
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS telefone VARCHAR(30);
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS titulacao VARCHAR(50) DEFAULT 'Mestre';
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS lattes_url TEXT;
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS notif_email BOOLEAN DEFAULT TRUE;
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS notif_substituicoes BOOLEAN DEFAULT TRUE;
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS notif_reunioes BOOLEAN DEFAULT TRUE;

-- 2. Permissão de atualização do próprio perfil via RLS
DROP POLICY IF EXISTS "Atualizacao do proprio perfil de usuario" ON usuarios;
CREATE POLICY "Atualizacao do proprio perfil de usuario"
    ON usuarios FOR UPDATE TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- 3. Atualiza dados iniciais do usuário de teste (Carlos Silveira)
UPDATE usuarios
SET
    telefone = '(11) 98765-4321',
    titulacao = 'Doutor',
    bio = 'Doutor em Ciência da Computação pela USP com foco em Engenharia de Software, Inteligência Artificial e Arquiteturas Distribuídas. Docente e coordenador na Faculdade Impacta de Tecnologia, membro titular do NDE.',
    lattes_url = 'http://lattes.cnpq.br/1234567890123456',
    linkedin_url = 'https://linkedin.com/in/prof-carlos-silveira',
    notif_email = TRUE,
    notif_substituicoes = TRUE,
    notif_reunioes = TRUE
WHERE email = 'carlos.silveira@impacta.edu.br';

