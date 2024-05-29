CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO rol_usuario (rol_nombre) VALUES
        ('Administrador'),
        ('Médico'),
        ('Paciente');

INSERT INTO usuario (cedula, rol_id, contrasena, p_nombre, s_nombre, p_apellido, s_apellido, f_nacim, pais, provincia, distrito, domicilio) VALUES
    (1234567890, 1, crypt('admin123', gen_salt('md5')), 'Carlos', 'Eduardo', 'Rodriguez', 'Segura', '2003-04-25', 'Costa Rica', 'San Jose', 'Central', 'Av 1, Calle 2, Casa 3'),
    (1234567891, 1, crypt('admin123', gen_salt('md5')), 'Ricardo', 'Antonio', 'Borbón', 'Mena', '2002-06-11', 'Costa Rica', 'Cartago', 'Oriental', 'Av 4, Calle 5, Casa 10');

INSERT INTO telefono_usuario(user_ced, telefono) VALUES
    (1234567890, '25415697'),
    (1234567891, '25648795'),
    (1234567891, '86954426');

INSERT INTO procedimiento_medico (nombre, dias_recuperacion) VALUES
    ('Apendicectomía', 7),
    ('Biopsia de mama', 3),
    ('Cirugía de cataratas', 1),
    ('Cesárea', 14),
    ('Histerectomía', 21),
    ('Cirugía para lumbalgia', 10),
    ('Mastectomía', 14),
    ('Amigdalectomía', 5);

INSERT INTO tipo_salon (tipo) VALUES 
    ('Propósito General'),
    ('Medicina de Hombres'),
    ('Medicina de Mujeres'),
    ('Medicina de Niños');

INSERT INTO salon (id_tipo, nombre, capacidad, piso) VALUES 
    (1, 'Sala de Propósito General 1', 10, 1),
    (1, 'Sala de Propósito General 2', 12, 1),
    (2, 'Sala de Medicina de Hombres 1', 8, 2),
    (2, 'Sala de Medicina de Hombres 2', 10, 2),
    (3, 'Sala de Medicina de Mujeres 1', 9, 3),
    (3, 'Sala de Medicina de Mujeres 2', 11, 3),
    (4, 'Sala de Medicina de Niños 1', 6, 4),
    (4, 'Sala de Medicina de Niños 2', 8, 4);

-- Salón 1
INSERT INTO cama (numero_salon, cuidados_intensivos) VALUES 
    (1, TRUE),
    (1, FALSE),
    (2, TRUE),
    (2, FALSE),
    (3, TRUE),
    (3, FALSE),
    (4, TRUE),
    (4, FALSE),
    (5, TRUE),
    (5, FALSE),
    (6, TRUE),
    (6, FALSE),
    (7, TRUE),
    (7, FALSE),
    (8, TRUE),
    (8, FALSE);

INSERT INTO tipo_equipo (tipo, cant_default) VALUES 
    ('Luces Quirúrgicas', 2),
    ('Ultrasonidos', 1),
    ('Esterilizadores', 4),
    ('Desfibriladores', 4),
    ('Monitores', 3),
    ('Respiradores Artificiales', 1),
    ('Electrocardiógrafos', 1);

-- Equipos médicos asignados a camas en el salón 1
INSERT INTO equipo_medico (placa, id_tipo, num_cama, proveedor) VALUES 
    ('LUCQUI01', 1, 1, 'MedicalTech Inc.'),
    ('LUCQUI02', 1, 2, 'MedicalTech Inc.'),
    ('ULTRAS01', 2, 3, 'Health Solutions Co.'),
    ('ESTERI01', 3, 4, 'MediCare Equipments'),
    ('ESTERI02', 3, 5, 'MediSupply Ltd.'),
    ('ESTERI03', 3, 6, 'Advanced Medical Devices'),
    ('ESTERI04', 3, 7, 'MediTech Solutions'),
    ('DESFIB01', 4, 8, 'MediTech Innovations'),
    ('DESFIB02', 4, 9, 'Healthcare Systems Inc.'),
    ('DESFIB03', 4, 10, 'MediPro Technologies'),
    ('DESFIB04', 4, 11, 'Medical Equipment Co.'),
    ('MONITO01', 5, 12, 'MediGadget Solutions'),
    ('MONITO02', 5, 13, 'Healthcare Innovations Ltd.'),
    ('MONITO03', 5, 14, 'MediGadget Solutions'),
    ('RESART01', 6, 15, 'Advanced Medical Devices'),
    ('ELECAR01', 7, 16, 'MediTech Solutions');

/*
SELECT * FROM rol_usuario;
SELECT * FROM usuario;
SELECT * FROM telefono_usuario;
SELECT * FROM fecha_ingreso;
SELECT * FROM patologia;
SELECT * FROM procedimiento_medico;
SELECT * FROM historial_medico;
SELECT * FROM tipo_salon;
SELECT * FROM salon;
SELECT * FROM cama;
SELECT * FROM tipo_equipo;
SELECT * FROM equipo_medico;
SELECT * FROM reservacion_cama;
SELECT * FROM procedimiento_reservacion;
*/

-- Inserts para pruebas
/*
INSERT INTO usuario (cedula, rol_id, contrasena, p_nombre, s_nombre, p_apellido, s_apellido, f_nacim, pais, provincia, distrito, domicilio) VALUES
    (1234567892, 2, crypt('medico123', gen_salt('md5')), 'Pedro', 'Jose', 'Martinez', 'Rodriguez', '1975-08-12', 'Costa Rica', 'Heredia', 'Central', 'Calle 10, Casa 20'),
    (1234567893, 2, crypt('medico123', gen_salt('md5')), 'Ana', 'Maria', 'Gutierrez', 'Fernandez', '1965-11-05', 'Costa Rica', 'Cartago', 'Oriental', 'Avenida 5, Casa 15'),
    (1234567894, 3, crypt('paciente123', gen_salt('md5')), 'Luis', 'Alberto', 'Ramirez', 'Sanchez', '1990-01-15', 'Costa Rica', 'Puntarenas', 'Central', 'Calle 20, Casa 30'),
    (1234567895, 3, crypt('paciente123', gen_salt('md5')), 'Marta', 'Isabel', 'Castro', 'Jimenez', '1995-03-22', 'Costa Rica', 'Limon', 'Central', 'Avenida 3, Casa 8');

INSERT INTO telefono_usuario(user_ced, telefono) VALUES
    (1234567892, '86954235'),
    (1234567893, '88795234'),
    (1234567894, '21456874'),
    (1234567895, '61439456');

INSERT INTO fecha_ingreso(user_ced, fecha) VALUES
    (1234567892, '2000-05-01'),
    (1234567893, '1986-11-25');

INSERT INTO patologia (nombre, tratamiento, user_ced) VALUES
    ('Hipertensión', 'Medicación para controlar la presión arterial y cambios en el estilo de vida.', 1234567894),
    ('Diabetes tipo 2', 'Control de la dieta y medicamentos para mantener los niveles de azúcar en sangre.', 1234567894),
    ('Asma', 'Inhaladores para aliviar los síntomas y evitar los desencadenantes del asma.', 1234567895),
    ('Dermatitis', 'Cremas y medicamentos para controlar la inflamación y la picazón en la piel.', 1234567895);

INSERT INTO historial_medico (fecha, tratamiento, user_ced, id_procedimiento) VALUES
    ('2024-05-01', 'Medicación para controlar la presión arterial.', 1234567894, 1), -- Apendicectomía
    ('2024-05-05', 'Control y seguimiento de los niveles de azúcar en sangre.', 1234567894, 2), -- Biopsia de mama
    ('2024-04-20', 'Control y seguimiento de los síntomas de asma.', 1234567895, 3), -- Cirugía de cataratas
    ('2024-04-25', 'Seguimiento postoperatorio de la cesárea.', 1234567895, 4); -- Cesárea

-- Reservaciones para el usuario con cédula 1234567894
INSERT INTO reservacion_cama (user_ced, num_cama, fecha_ingreso, fecha_salida) VALUES 
    (1234567894, 1, '2024-06-01', '2024-06-05'),
    (1234567894, 4, '2024-06-10', '2024-06-15'),
    (1234567895, 2, '2024-06-03', '2024-06-08'),
    (1234567895, 7, '2024-06-20', '2024-06-25');

INSERT INTO procedimiento_reservacion (id_procedimiento, id_reservacion) VALUES 
    (3, 1),
    (7, 1), 
    (5, 2),
    (8, 2),
    (2, 3),
    (4, 3),
    (1, 4),
    (6, 4);
*/
