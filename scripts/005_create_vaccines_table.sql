-- Criando tabela de vacinas e configurações do sistema

-- Tabela de vacinas
CREATE TABLE IF NOT EXISTS vaccines (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pet_id UUID REFERENCES pets(id) ON DELETE CASCADE,
    vaccine_name VARCHAR(255) NOT NULL,
    vaccine_date DATE NOT NULL,
    next_dose_date DATE,
    veterinarian VARCHAR(255) NOT NULL,
    batch_number VARCHAR(100),
    manufacturer VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de configurações da clínica
CREATE TABLE IF NOT EXISTS clinic_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    cnpj VARCHAR(20),
    description TEXT,
    opening_hours TIME DEFAULT '08:00:00',
    closing_hours TIME DEFAULT '18:00:00',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de configurações de notificação
CREATE TABLE IF NOT EXISTS notification_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email_appointments BOOLEAN DEFAULT true,
    sms_reminders BOOLEAN DEFAULT false,
    whatsapp_notifications BOOLEAN DEFAULT true,
    marketing_emails BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_vaccines_pet_id ON vaccines(pet_id);
CREATE INDEX IF NOT EXISTS idx_vaccines_date ON vaccines(vaccine_date);
CREATE INDEX IF NOT EXISTS idx_vaccines_next_dose ON vaccines(next_dose_date);

-- RLS para vacinas
ALTER TABLE vaccines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view vaccines" ON vaccines
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert vaccines" ON vaccines
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update vaccines" ON vaccines
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Users can delete vaccines" ON vaccines
    FOR DELETE USING (auth.role() = 'authenticated');

-- RLS para configurações
ALTER TABLE clinic_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage clinic settings" ON clinic_settings
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Users can manage notification settings" ON notification_settings
    FOR ALL USING (auth.role() = 'authenticated');

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_vaccines_updated_at BEFORE UPDATE ON vaccines
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clinic_settings_updated_at BEFORE UPDATE ON clinic_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notification_settings_updated_at BEFORE UPDATE ON notification_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
