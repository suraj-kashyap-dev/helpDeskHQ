INSERT INTO organizations (name, domain, subscription_type, settings, created_at, updated_at) VALUES
('Tech Innovators Inc.', 'techinnovators.com', 'Premium', '{"theme":"dark","language":"en"}', '2023-01-01 12:00:00', '2023-01-01 12:00:00'),
('Green Future', 'greenfuture.org', 'Standard', '{"theme":"light","language":"en"}', '2023-02-15 15:30:00', '2023-02-15 15:30:00'),
('CloudOps Ltd.', 'cloudops.io', 'Enterprise', '{"theme":"dark","language":"fr"}', '2023-03-10 10:00:00', '2023-03-10 10:00:00'),
('EduTech Solutions', 'edutechsolutions.com', 'Standard', '{"theme":"light","language":"es"}', '2023-04-22 09:45:00', '2023-04-22 09:45:00'),
('HealthFirst', 'healthfirst.co', 'Premium', '{"theme":"light","language":"en"}', '2023-05-05 08:20:00', '2023-05-05 08:20:00'),
('Urban Creatives', 'urbancreatives.net', 'Free', '{"theme":"dark","language":"en"}', '2023-06-15 16:10:00', '2023-06-15 16:10:00'),
('NextGen AI', 'nextgenai.tech', 'Enterprise', '{"theme":"dark","language":"jp"}', '2023-07-01 11:00:00', '2023-07-01 11:00:00'),
('Sustainable Living', 'sustainableliving.com', 'Standard', '{"theme":"light","language":"en"}', '2023-08-18 14:00:00', '2023-08-18 14:00:00'),
('AutoTech Group', 'autotech.com', 'Premium', '{"theme":"dark","language":"de"}', '2023-09-10 13:30:00', '2023-09-10 13:30:00'),
('Startup Hub', 'startuphub.org', 'Free', '{"theme":"light","language":"en"}', '2023-10-01 18:45:00', '2023-10-01 18:45:00');



INSERT INTO projects (workspace_id, name, description, status, settings, start_date, end_date, created_at, updated_at)
VALUES
(1, 'E-Commerce Platform', 'Developing an e-commerce platform for global users', 'ACTIVE', '{"theme":"dark","language":"en"}', '2024-01-01 10:00:00', '2024-12-31 18:00:00', '2024-01-01 10:00:00', '2024-01-01 10:00:00'),
(2, 'CRM System', 'Customer relationship management system for B2B clients', 'PROGRESS', '{"theme":"light","notifications":true}', '2024-02-01 09:00:00', '2024-10-01 17:00:00', '2024-02-01 09:00:00', '2024-02-01 09:00:00'),
(3, 'Inventory Management', 'Streamlined inventory system for warehouses', 'COMPLETED', '{"currency":"USD","region":"NA"}', '2023-03-01 08:00:00', '2023-09-01 16:00:00', '2023-03-01 08:00:00', '2023-09-01 16:00:00'),
(4, 'AI Chatbot', 'Developing an AI-powered chatbot for customer support', 'ACTIVE', '{"ai_version":"2.1","language":"multi"}', '2024-06-01 10:00:00', '2024-12-31 20:00:00', '2024-06-01 10:00:00', '2024-06-01 10:00:00'),
(1, 'Website Redesign', 'Revamping the corporate website', 'ON_HOLD', '{"theme":"modern","color":"blue"}', '2024-01-15 11:00:00', '2024-05-15 18:00:00', '2024-01-15 11:00:00', '2024-01-15 11:00:00'),
(5, 'Mobile App', 'Cross-platform mobile application for e-commerce', 'ACTIVE', '{"platforms":["iOS","Android"]}', '2024-04-01 12:00:00', '2024-12-01 18:00:00', '2024-04-01 12:00:00', '2024-04-01 12:00:00'),
(3, 'Data Analytics Dashboard', 'Interactive dashboard for data analytics', 'PROGRESS', '{"charts":["bar","line"],"export":true}', '2024-05-01 09:00:00', '2024-11-01 17:00:00', '2024-05-01 09:00:00', '2024-05-01 09:00:00'),
(4, 'HR Management System', 'Centralized HR management system', 'COMPLETED', '{"modules":["recruitment","payroll"]}', '2023-02-01 08:00:00', '2023-08-01 17:00:00', '2023-02-01 08:00:00', '2023-08-01 17:00:00'),
(2, 'Marketing Campaign Tool', 'Automated tool for managing marketing campaigns', 'ACTIVE', '{"email_campaigns":true,"tracking":true}', '2024-07-01 10:00:00', '2024-12-01 18:00:00', '2024-07-01 10:00:00', '2024-07-01 10:00:00'),
(1, 'ERP System', 'Enterprise resource planning system for SMEs', 'ON_HOLD', '{"modules":["inventory","sales"]}', '2023-05-01 08:00:00', '2024-05-01 17:00:00', '2023-05-01 08:00:00', '2023-05-01 08:00:00');
