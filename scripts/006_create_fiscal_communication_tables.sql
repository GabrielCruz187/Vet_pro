-- Tabela para configurações fiscais
CREATE TABLE fiscal_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clinic_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  provider VARCHAR(50) NOT NULL, -- 'focus_nfe', 'bling', 'nfse_nacional'
  api_token TEXT,
  environment VARCHAR(20) DEFAULT 'sandbox', -- 'sandbox' ou 'production'
  cnpj VARCHAR(18),
  inscricao_municipal VARCHAR(50),
  inscricao_estadual VARCHAR(50),
  regime_tributario INTEGER DEFAULT 1, -- 1=Simples Nacional, 2=Simples Excesso, 3=Regime Normal
  certificado_digital TEXT, -- Base64 do certificado A1
  senha_certificado TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para notas fiscais
CREATE TABLE invoices_nfe (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clinic_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  numero_nfe INTEGER,
  serie_nfe INTEGER DEFAULT 1,
  chave_acesso VARCHAR(44),
  status VARCHAR(50) DEFAULT 'draft', -- draft, processing, authorized, cancelled, error
  tipo_operacao VARCHAR(20) DEFAULT 'saida', -- entrada, saida
  natureza_operacao VARCHAR(100) DEFAULT 'Prestação de serviços',
  valor_total DECIMAL(10,2) NOT NULL,
  valor_servicos DECIMAL(10,2) DEFAULT 0,
  valor_produtos DECIMAL(10,2) DEFAULT 0,
  valor_desconto DECIMAL(10,2) DEFAULT 0,
  valor_iss DECIMAL(10,2) DEFAULT 0,
  aliquota_iss DECIMAL(5,2) DEFAULT 0,
  codigo_servico VARCHAR(10), -- Código do serviço municipal
  observacoes TEXT,
  xml_nfe TEXT,
  pdf_url TEXT,
  protocolo_autorizacao VARCHAR(50),
  data_autorizacao TIMESTAMP WITH TIME ZONE,
  motivo_cancelamento TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Itens da nota fiscal
CREATE TABLE invoice_items_nfe (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID REFERENCES invoices_nfe(id) ON DELETE CASCADE,
  tipo VARCHAR(20) NOT NULL, -- 'service' ou 'product'
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  inventory_id UUID REFERENCES inventory(id) ON DELETE SET NULL,
  descricao VARCHAR(255) NOT NULL,
  quantidade DECIMAL(10,3) NOT NULL DEFAULT 1,
  valor_unitario DECIMAL(10,2) NOT NULL,
  valor_total DECIMAL(10,2) NOT NULL,
  codigo_ncm VARCHAR(10),
  cfop VARCHAR(4) DEFAULT '5933', -- CFOP padrão para serviços
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para templates de comunicação
CREATE TABLE communication_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clinic_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL, -- 'email', 'sms', 'whatsapp'
  category VARCHAR(50) NOT NULL, -- 'appointment_reminder', 'vaccine_alert', 'birthday', 'follow_up'
  subject VARCHAR(200), -- Para emails
  content TEXT NOT NULL,
  variables JSONB, -- Variáveis disponíveis no template
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para configurações de comunicação
CREATE TABLE communication_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clinic_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  email_provider VARCHAR(50), -- 'smtp', 'sendgrid', 'mailgun'
  email_config JSONB, -- Configurações do provedor de email
  sms_provider VARCHAR(50), -- 'twilio', 'zenvia', 'totalvoice'
  sms_config JSONB, -- Configurações do provedor de SMS
  whatsapp_provider VARCHAR(50), -- 'twilio', 'zenvia', 'evolution_api'
  whatsapp_config JSONB, -- Configurações do WhatsApp
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para histórico de comunicações enviadas
CREATE TABLE communication_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clinic_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  pet_id UUID REFERENCES pets(id) ON DELETE SET NULL,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  template_id UUID REFERENCES communication_templates(id) ON DELETE SET NULL,
  type VARCHAR(20) NOT NULL, -- 'email', 'sms', 'whatsapp'
  category VARCHAR(50) NOT NULL,
  recipient VARCHAR(255) NOT NULL, -- Email, telefone ou WhatsApp
  subject VARCHAR(200),
  content TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- pending, sent, delivered, failed
  provider_id VARCHAR(100), -- ID do provedor externo
  error_message TEXT,
  sent_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para agendamento de comunicações automáticas
CREATE TABLE scheduled_communications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clinic_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  pet_id UUID REFERENCES pets(id) ON DELETE SET NULL,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  vaccine_id UUID REFERENCES vaccines(id) ON DELETE SET NULL,
  template_id UUID REFERENCES communication_templates(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL,
  category VARCHAR(50) NOT NULL,
  recipient VARCHAR(255) NOT NULL,
  scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, sent, cancelled, failed
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_invoices_nfe_clinic_id ON invoices_nfe(clinic_id);
CREATE INDEX idx_invoices_nfe_client_id ON invoices_nfe(client_id);
CREATE INDEX idx_invoices_nfe_status ON invoices_nfe(status);
CREATE INDEX idx_invoices_nfe_created_at ON invoices_nfe(created_at);

CREATE INDEX idx_communication_history_clinic_id ON communication_history(clinic_id);
CREATE INDEX idx_communication_history_client_id ON communication_history(client_id);
CREATE INDEX idx_communication_history_type ON communication_history(type);
CREATE INDEX idx_communication_history_status ON communication_history(status);
CREATE INDEX idx_communication_history_created_at ON communication_history(created_at);

CREATE INDEX idx_scheduled_communications_clinic_id ON scheduled_communications(clinic_id);
CREATE INDEX idx_scheduled_communications_scheduled_for ON scheduled_communications(scheduled_for);
CREATE INDEX idx_scheduled_communications_status ON scheduled_communications(status);

-- Triggers para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_fiscal_settings_updated_at BEFORE UPDATE ON fiscal_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_invoices_nfe_updated_at BEFORE UPDATE ON invoices_nfe FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_communication_templates_updated_at BEFORE UPDATE ON communication_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_communication_settings_updated_at BEFORE UPDATE ON communication_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_scheduled_communications_updated_at BEFORE UPDATE ON scheduled_communications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
