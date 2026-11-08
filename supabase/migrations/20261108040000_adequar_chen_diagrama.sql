-- ========================================================
-- Migração: Adequação Estrita ao Modelo Conceitual (Diagrama de Chen)
-- ========================================================

-- Módulo 1: Adiciona o atributo 'senha' à entidade 'usuarios' conforme o Diagrama de Chen
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS senha VARCHAR(255);

-- Atualiza a senha do usuário de teste
UPDATE usuarios
SET senha = 'Impacta@2026Password'
WHERE email = 'carlos.silveira@impacta.edu.br';

