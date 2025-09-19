-- Templates padrão de comunicação
INSERT INTO communication_templates (clinic_id, name, type, category, subject, content, variables) VALUES
-- Templates de lembrete de consulta
((SELECT id FROM profiles LIMIT 1), 'Lembrete de Consulta - Email', 'email', 'appointment_reminder', 
 'Lembrete: Consulta agendada para {{pet_name}}', 
 'Olá {{client_name}},

Este é um lembrete de que você tem uma consulta agendada para {{pet_name}} em nossa clínica.

📅 Data: {{appointment_date}}
🕐 Horário: {{appointment_time}}
🏥 Clínica: {{clinic_name}}
📍 Endereço: {{clinic_address}}
👨‍⚕️ Veterinário: {{vet_name}}

Por favor, chegue com 15 minutos de antecedência.

Em caso de cancelamento, entre em contato conosco com pelo menos 24 horas de antecedência.

Atenciosamente,
Equipe {{clinic_name}}
📞 {{clinic_phone}}',
 '{"client_name": "Nome do cliente", "pet_name": "Nome do pet", "appointment_date": "Data da consulta", "appointment_time": "Horário da consulta", "clinic_name": "Nome da clínica", "clinic_address": "Endereço da clínica", "vet_name": "Nome do veterinário", "clinic_phone": "Telefone da clínica"}'::jsonb),

((SELECT id FROM profiles LIMIT 1), 'Lembrete de Consulta - SMS', 'sms', 'appointment_reminder', 
 NULL,
 'Lembrete: {{pet_name}} tem consulta em {{appointment_date}} às {{appointment_time}} na {{clinic_name}}. Chegue 15min antes. Cancelamentos: {{clinic_phone}}',
 '{"client_name": "Nome do cliente", "pet_name": "Nome do pet", "appointment_date": "Data da consulta", "appointment_time": "Horário da consulta", "clinic_name": "Nome da clínica", "clinic_phone": "Telefone da clínica"}'::jsonb),

-- Templates de alerta de vacinação
((SELECT id FROM profiles LIMIT 1), 'Alerta de Vacinação - Email', 'email', 'vaccine_alert',
 'Hora de vacinar {{pet_name}}!',
 'Olá {{client_name}},

É hora de manter {{pet_name}} protegido(a)! 

💉 Vacina: {{vaccine_name}}
📅 Vencimento: {{due_date}}
🐕 Pet: {{pet_name}} ({{pet_species}})

A vacinação em dia é essencial para a saúde do seu pet e prevenção de doenças.

Para agendar a vacinação, entre em contato conosco:
📞 {{clinic_phone}}
📧 {{clinic_email}}

Não deixe para depois, a saúde do {{pet_name}} é nossa prioridade!

Atenciosamente,
Equipe {{clinic_name}}',
 '{"client_name": "Nome do cliente", "pet_name": "Nome do pet", "pet_species": "Espécie do pet", "vaccine_name": "Nome da vacina", "due_date": "Data de vencimento", "clinic_name": "Nome da clínica", "clinic_phone": "Telefone da clínica", "clinic_email": "Email da clínica"}'::jsonb),

((SELECT id FROM profiles LIMIT 1), 'Alerta de Vacinação - SMS', 'sms', 'vaccine_alert',
 NULL,
 'Atenção! {{pet_name}} precisa da vacina {{vaccine_name}} até {{due_date}}. Agende: {{clinic_phone}} - {{clinic_name}}',
 '{"client_name": "Nome do cliente", "pet_name": "Nome do pet", "vaccine_name": "Nome da vacina", "due_date": "Data de vencimento", "clinic_name": "Nome da clínica", "clinic_phone": "Telefone da clínica"}'::jsonb),

-- Templates de aniversário
((SELECT id FROM profiles LIMIT 1), 'Aniversário do Pet - Email', 'email', 'birthday',
 'Parabéns! Hoje é aniversário do {{pet_name}}! 🎉',
 'Olá {{client_name}},

Hoje é um dia muito especial! 🎂

{{pet_name}} está fazendo {{pet_age}} anos! 🎉

Desejamos muita saúde, alegria e momentos felizes para vocês dois.

Como presente de aniversário, oferecemos 10% de desconto na próxima consulta ou procedimento. Válido até {{discount_expiry}}.

Para agendar, entre em contato:
📞 {{clinic_phone}}

Parabéns e muito amor para o {{pet_name}}!

Com carinho,
Equipe {{clinic_name}} ❤️',
 '{"client_name": "Nome do cliente", "pet_name": "Nome do pet", "pet_age": "Idade do pet", "discount_expiry": "Validade do desconto", "clinic_name": "Nome da clínica", "clinic_phone": "Telefone da clínica"}'::jsonb),

-- Templates de follow-up pós-consulta
((SELECT id FROM profiles LIMIT 1), 'Follow-up Pós-Consulta - Email', 'email', 'follow_up',
 'Como está o {{pet_name}}? Acompanhamento pós-consulta',
 'Olá {{client_name}},

Esperamos que {{pet_name}} esteja se recuperando bem após a consulta do dia {{appointment_date}}.

Como parte do nosso cuidado contínuo, gostaríamos de saber:
• Como {{pet_name}} está se sentindo?
• O tratamento está sendo seguido conforme orientado?
• Há alguma dúvida sobre os medicamentos ou cuidados?
• Notou alguma melhora ou mudança no comportamento?

Sua resposta é muito importante para nós. Se tiver qualquer dúvida ou preocupação, não hesite em entrar em contato:

📞 {{clinic_phone}}
📧 {{clinic_email}}

Estamos sempre aqui para cuidar do {{pet_name}}!

Atenciosamente,
Dr(a). {{vet_name}}
{{clinic_name}}',
 '{"client_name": "Nome do cliente", "pet_name": "Nome do pet", "appointment_date": "Data da consulta", "vet_name": "Nome do veterinário", "clinic_name": "Nome da clínica", "clinic_phone": "Telefone da clínica", "clinic_email": "Email da clínica"}'::jsonb);
