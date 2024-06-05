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
INSERT INTO usuario (cedula, rol_id, contrasena, p_nombre, s_nombre, p_apellido, s_apellido, f_nacim, pais, provincia, distrito, domicilio) VALUES
    (1234567892, 2, 'd7a395614eb5f88f595d4ada638948f9', 'Pedro', 'Jose', 'Martinez', 'Rodriguez', '1975-08-12', 'Costa Rica', 'Heredia', 'Central', 'Calle 10, Casa 20'),
    (1234567893, 3, 'd7a395614eb5f88f595d4ada638948f9', 'Ana', 'Maria', 'Gutierrez', 'Fernandez', '1965-11-05', 'Costa Rica', 'Cartago', 'Oriental', 'Avenida 5, Casa 15'),
    (1234567894, 4, 'b60f15385b905be9c977c59aa3420fd2', 'Luis', 'Alberto', 'Ramirez', 'Sanchez', '1990-01-15', 'Costa Rica', 'Puntarenas', 'Central', 'Calle 20, Casa 30'),
    (1234567895, 4, 'b60f15385b905be9c977c59aa3420fd2', 'Marta', 'Isabel', 'Castro', 'Jimenez', '1995-03-22', 'Costa Rica', 'Limon', 'Central', 'Avenida 3, Casa 8');

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
