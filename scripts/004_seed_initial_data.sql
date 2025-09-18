-- Insert default services
INSERT INTO public.services (name, description, price, duration_minutes, category) VALUES
('Consulta Geral', 'Consulta veterinária geral', 80.00, 30, 'Consulta'),
('Vacinação', 'Aplicação de vacinas', 45.00, 15, 'Prevenção'),
('Castração', 'Procedimento de castração', 200.00, 60, 'Cirurgia'),
('Limpeza Dentária', 'Limpeza e tratamento dentário', 150.00, 45, 'Odontologia'),
('Exame de Sangue', 'Coleta e análise de sangue', 120.00, 20, 'Exame'),
('Ultrassom', 'Exame de ultrassom', 180.00, 30, 'Exame'),
('Raio-X', 'Exame radiográfico', 100.00, 20, 'Exame'),
('Banho e Tosa', 'Serviço de higiene e estética', 60.00, 60, 'Estética'),
('Cirurgia Geral', 'Procedimentos cirúrgicos gerais', 400.00, 120, 'Cirurgia'),
('Emergência', 'Atendimento de emergência', 150.00, 45, 'Emergência');

-- Insert sample inventory items
INSERT INTO public.inventory (name, description, category, sku, current_stock, minimum_stock, unit_price, supplier) VALUES
('Vacina V8', 'Vacina óctupla para cães', 'Medicamentos', 'VAC-V8-001', 50, 10, 35.00, 'Laboratório VetMed'),
('Vacina V10', 'Vacina déctupla para cães', 'Medicamentos', 'VAC-V10-001', 30, 5, 42.00, 'Laboratório VetMed'),
('Vacina Tríplice Felina', 'Vacina tríplice para gatos', 'Medicamentos', 'VAC-TF-001', 25, 5, 38.00, 'Laboratório VetMed'),
('Antibiótico Amoxicilina', 'Antibiótico para infecções', 'Medicamentos', 'ANT-AMX-001', 100, 20, 15.00, 'Farmácia Animal'),
('Anti-inflamatório', 'Medicamento anti-inflamatório', 'Medicamentos', 'ANT-INF-001', 80, 15, 25.00, 'Farmácia Animal'),
('Ração Premium Cães', 'Ração premium para cães adultos', 'Alimentação', 'RAC-PC-001', 20, 5, 85.00, 'Pet Food Ltda'),
('Ração Premium Gatos', 'Ração premium para gatos adultos', 'Alimentação', 'RAC-PG-001', 15, 3, 75.00, 'Pet Food Ltda'),
('Coleira Antipulgas', 'Coleira com repelente de pulgas', 'Acessórios', 'COL-AP-001', 40, 10, 28.00, 'Pet Shop Distribuidora'),
('Shampoo Medicinal', 'Shampoo para tratamento de pele', 'Higiene', 'SHA-MED-001', 25, 5, 32.00, 'Higiene Pet'),
('Luvas Descartáveis', 'Luvas de procedimento descartáveis', 'Material Médico', 'LUV-DESC-001', 500, 100, 0.50, 'Material Hospitalar');
