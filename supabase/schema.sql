-- Pesquisa PTS CER - Supabase Schema
-- Execute este SQL no Supabase SQL Editor para criar a tabela

CREATE TABLE IF NOT EXISTS surveys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  survey_type TEXT NOT NULL CHECK (survey_type IN ('adult', 'child')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'completed')),

  -- Profissional que criou a pesquisa (Supabase Auth)
  created_by UUID REFERENCES auth.users(id),

  -- Identificação
  user_name TEXT,
  birth_date TEXT,
  age TEXT,
  diagnosis TEXT,
  modality TEXT[] DEFAULT '{}',
  application_date TEXT,
  professional TEXT,
  caregiver_contact TEXT,

  -- Dados completos da pesquisa (JSON para flexibilidade)
  survey_data JSONB NOT NULL DEFAULT '{}',

  -- Dados do PTS gerado pela IA
  pts_data JSONB DEFAULT '{}',

  -- Metadados
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index para busca por nome e tipo
CREATE INDEX IF NOT EXISTS idx_surveys_user_name ON surveys (user_name);
CREATE INDEX IF NOT EXISTS idx_surveys_survey_type ON surveys (survey_type);
CREATE INDEX IF NOT EXISTS idx_surveys_created_at ON surveys (created_at DESC);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS surveys_updated_at ON surveys;
CREATE TRIGGER surveys_updated_at
  BEFORE UPDATE ON surveys
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- RLS (Row Level Security)
ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;

-- Policy: usuarios autenticados podem ver apenas suas proprias pesquisas
CREATE POLICY "Users can view own surveys"
  ON surveys FOR SELECT
  USING (auth.uid() = created_by);

-- Policy: usuarios autenticados podem inserir pesquisas
CREATE POLICY "Users can insert own surveys"
  ON surveys FOR INSERT
  WITH CHECK (auth.uid() = created_by);

-- Policy: usuarios autenticados podem atualizar suas proprias pesquisas
CREATE POLICY "Users can update own surveys"
  ON surveys FOR UPDATE
  USING (auth.uid() = created_by);

-- Policy: service_role bypassa RLS (para API routes server-side)
-- Nota: service_role key ja bypassa RLS por padrao no Supabase

-- Index para busca por criador
CREATE INDEX IF NOT EXISTS idx_surveys_created_by ON surveys (created_by);
