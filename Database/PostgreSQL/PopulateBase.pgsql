-- Asegúrate de que la extensión pgcrypto esté habilitada para usar funciones criptográficas
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insertar roles en la tabla 'rol_usuario'
INSERT INTO rol_usuario (rol_nombre) VALUES
    ('Administrador'),
    ('Doctor'),
    ('Enfermero'),
    ('Paciente');

-- Insertar usuarios en la tabla 'usuario' con contraseñas encriptadas
INSERT INTO usuario (cedula, rol_id, contrasena, p_nombre, s_nombre, p_apellido, s_apellido, f_nacim, pais, provincia, distrito, domicilio) VALUES
    (1234567890, 1, '0192023a7bbd73250516f069df18b500', 'Carlos', 'Eduardo', 'Rodriguez', 'Segura', '2003-04-25', 'Costa Rica', 'San Jose', 'Central', 'Av 1, Calle 2, Casa 3'),
    (1234567891, 1, '0192023a7bbd73250516f069df18b500', 'Ricardo', 'Antonio', 'Borbón', 'Mena', '2002-06-11', 'Costa Rica', 'Cartago', 'Oriental', 'Av 4, Calle 5, Casa 10');

-- Insertar números de teléfono para los usuarios en la tabla 'telefono_usuario'
INSERT INTO telefono_usuario(user_ced, telefono) VALUES
    (1234567890, '25415697'),
    (1234567891, '25648795'),
    (1234567891, '86954426');

-- Insertar procedimientos médicos en la tabla 'procedimiento_medico'
INSERT INTO procedimiento_medico (nombre, dias_recuperacion) VALUES
    ('Apendicectomía', 7),
    ('Biopsia de mama', 3),
    ('Cirugía de cataratas', 1),
    ('Cesárea', 14),
    ('Histerectomía', 21),
    ('Cirugía para lumbalgia', 10),
    ('Mastectomía', 14),
    ('Amigdalectomía', 5);

-- Insertar tipos de salas en la tabla 'tipo_salon'
INSERT INTO tipo_salon (tipo) VALUES 
    ('Propósito General'),
    ('Medicina de Hombres'),
    ('Medicina de Mujeres'),
    ('Medicina de Niños');

-- Insertar salas en la tabla 'salon'
INSERT INTO salon (id_tipo, nombre, capacidad, piso) VALUES 
    (1, 'Sala de Propósito General 1', 10, 1),
    (1, 'Sala de Propósito General 2', 12, 1),
    (2, 'Sala de Medicina de Hombres 1', 8, 2),
    (2, 'Sala de Medicina de Hombres 2', 10, 2),
    (3, 'Sala de Medicina de Mujeres 1', 9, 3),
    (3, 'Sala de Medicina de Mujeres 2', 11, 3),
    (4, 'Sala de Medicina de Niños 1', 6, 4),
    (4, 'Sala de Medicina de Niños 2', 8, 4);

-- Insertar camas en la tabla 'cama' especificando si son para cuidados intensivos o no
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

-- Insertar tipos de equipos médicos en la tabla 'tipo_equipo'
INSERT INTO tipo_equipo (tipo, cant_default) VALUES 
    ('Luces Quirúrgicas', 2),
    ('Ultrasonidos', 1),
    ('Esterilizadores', 4),
    ('Desfibriladores', 4),
    ('Monitores', 3),
    ('Respiradores Artificiales', 1),
    ('Electrocardiógrafos', 1);

-- Insertar equipos médicos en la tabla 'equipo_medico'
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
