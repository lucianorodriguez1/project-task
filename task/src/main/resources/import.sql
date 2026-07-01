-- 1. Soporte de Redes (Pendiente - Alta)
INSERT INTO tasks (title, description, status, priority, due_date, creation_date)
VALUES ('Corte de conectividad en Laboratorio 3', 'Revisar el switch principal del rack del tercer piso, varios puestos se quedaron sin IP asignada por DHCP.', 'PENDING', 'HIGH', CURRENT_TIMESTAMP + INTERVAL '1 day', CURRENT_TIMESTAMP);

-- 2. Mantenimiento de Hardware (En Curso - Media)
INSERT INTO tasks (title, description, status, priority, due_date, creation_date)
VALUES ('Limpieza preventiva Servidor de Archivos', 'Realizar limpieza física, cambio de pasta térmica y verificación de coolers del servidor de almacenamiento local.', 'IN_PROGRESS', 'MEDIUM', CURRENT_TIMESTAMP + INTERVAL '3 days', CURRENT_TIMESTAMP);

-- 3. Software/Sistemas (Finalizada - Alta)
INSERT INTO tasks (title, description, status, priority, due_date, creation_date)
VALUES ('Migración de base de datos SQL Server', 'Pasar las tablas del sistema de alumnos al nuevo esquema de producción y verificar consistencia de datos.', 'COMPLETED', 'HIGH', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP - INTERVAL '2 days');

-- 4. Soporte a Usuarios (Pendiente - Baja)
INSERT INTO tasks (title, description, status, priority, due_date, creation_date)
VALUES ('Configurar impresoras en oficina de RRHH', 'Instalar los drivers de la nueva impresora de red en las 3 terminales del equipo de recursos humanos.', 'PENDING', 'LOW', CURRENT_TIMESTAMP + INTERVAL '5 days', CURRENT_TIMESTAMP);

-- 5. Seguridad/Cuentas (En Curso - Alta)
INSERT INTO tasks (title, description, status, priority, due_date, creation_date)
VALUES ('Bloqueo de accesos por intento de intrusión', 'Se detectaron IPs sospechosas intentando entrar por SSH. Configurar reglas estrictas en el Firewall de la red.', 'IN_PROGRESS', 'HIGH', CURRENT_TIMESTAMP + INTERVAL '6 hours', CURRENT_TIMESTAMP);

-- 6. Inventario (Finalizada - Baja)
INSERT INTO tasks (title, description, status, priority, due_date, creation_date)
VALUES ('Inventariar periféricos nuevos', 'Cargar en la planilla de stock los 15 monitores y 20 kits de teclado/mouse que llegaron del proveedor.', 'COMPLETED', 'LOW', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP - INTERVAL '4 days');

-- 7. Licencias/Software (Pendiente - Media)
INSERT INTO tasks (title, description, status, priority, due_date, creation_date)
VALUES ('Renovación de licencias de Antivirus', 'Gestionar con compras el pago de la renovación anual de las licencias corporativas antes del vencimiento.', 'PENDING', 'MEDIUM', CURRENT_TIMESTAMP + INTERVAL '7 days', CURRENT_TIMESTAMP);

-- 8. Infraestructura (En Curso - Baja)
INSERT INTO tasks (title, description, status, priority, due_date, creation_date)
VALUES ('Armado de puesto para nuevo ingresante', 'Instalar el cableado de red, armar el escritorio y configurar el entorno Linux en la PC del nuevo analista.', 'IN_PROGRESS', 'LOW', CURRENT_TIMESTAMP + INTERVAL '2 days', CURRENT_TIMESTAMP);

-- 9. Backup/Seguridad (Finalizada - Alta)
INSERT INTO tasks (title, description, status, priority, due_date, creation_date)
VALUES ('Restauración de Backup de pruebas', 'Verificar la integridad de las copias de seguridad automatizadas restaurando una imagen en el entorno de staging.', 'COMPLETED', 'HIGH', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP - INTERVAL '1 day');

-- 10. Soporte a Usuarios (Pendiente - Media)
INSERT INTO tasks (title, description, status, priority, due_date, creation_date)
VALUES ('Capacitación sobre el nuevo sistema de tickets', 'Preparar el material y guiar brevemente al personal administrativo sobre el uso de la nueva mesa de ayuda.', 'PENDING', 'MEDIUM', CURRENT_TIMESTAMP + INTERVAL '4 days', CURRENT_TIMESTAMP);