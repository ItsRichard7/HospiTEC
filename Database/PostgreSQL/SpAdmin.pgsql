/*-------------------------------------
|                                     |
|       Store Procedures Admin        |
|                                     |
-------------------------------------*/

-- >>> Función para obtener la información de los salones <<<
CREATE OR REPLACE FUNCTION fn_obtener_salones()
RETURNS TABLE (
    numero INTEGER,
    tipo VARCHAR(30),
    nombre VARCHAR(30),
    capacidad NUMERIC(2),
    piso NUMERIC(1)
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT A.numero, B.tipo, A.nombre, A.capacidad, A.piso
    FROM salon AS A JOIN tipo_salon AS B ON A.id_tipo = B.id;
END;
$$;
-- Comando de Ejecucion: SELECT * FROM fn_obtener_salones();

-- >>> Procedimiento almacenado para agregar un salón <<<
CREATE OR REPLACE PROCEDURE up_insertar_salon(
    p_id_tipo INTEGER,
    p_nombre VARCHAR(30),
    p_capacidad NUMERIC(2),
    p_piso NUMERIC(1)
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO salon (id_tipo, nombre, capacidad, piso)
    VALUES (p_id_tipo, p_nombre, p_capacidad, p_piso);
END;
$$;
-- Comando de Ejecucion: CALL up_insertar_salon(1, 'Sala de Emergencias', 20, 1);

-- >>> Procedimiento almacenado para modificar un salón <<<
CREATE OR REPLACE PROCEDURE up_modificar_salon(
    p_numero INTEGER,
    p_id_tipo INTEGER,
    p_nombre VARCHAR(30),
    p_capacidad NUMERIC(2),
    p_piso NUMERIC(1)
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE salon
    SET id_tipo = p_id_tipo,
        nombre = p_nombre,
        capacidad = p_capacidad,
        piso = p_piso
    WHERE numero = p_numero;
END;
$$;
-- Comando de Ejecucion: CALL up_modificar_salon(9, 1, 'Sala de Emergencias', 10, 1);

-- >>> Procedimiento almacenado para eliminar un salón <<<
CREATE OR REPLACE PROCEDURE up_eliminar_salon(
    p_numero INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM salon
    WHERE numero = p_numero;
END;
$$;
-- Comando de Ejecucion: CALL up_eliminar_salon(9);

-- >>> Función para obtener los equipos medicos <<<
CREATE OR REPLACE FUNCTION fn_obtener_equipos_medicos()
RETURNS TABLE(
    p_placa VARCHAR(10),
    p_id_tipo INTEGER,
    p_nombre_tipo VARCHAR(20),
    p_cant_default NUMERIC(2),
    p_proveedor VARCHAR(30)
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT a.placa, a.id_tipo, b.tipo, b.cant_default, a.proveedor
    FROM equipo_medico AS a JOIN tipo_equipo AS b ON a.id_tipo = b.id;
END;
$$;
-- Comando de Ejecucion: SELECT * FROM fn_obtener_equipos_medicos()

-- >>> Procedimiento almacenado para agregar un equipo medico <<<
CREATE OR REPLACE PROCEDURE up_insertar_equipo_medico(
    p_placa VARCHAR(10),
    p_id_tipo INTEGER,
    p_num_cama INTEGER,
    p_proveedor VARCHAR(30)
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO equipo_medico (placa, id_tipo, num_cama, proveedor)
    VALUES (p_placa, p_id_tipo, p_num_cama, p_proveedor);
END;
$$;
-- Comando de Ejecucion: CALL up_insertar_equipo_medico('ELECAR02', 7, 1, 'MediTech Solutions');

-- >>> Trigger usado para aumentar la cantidad disponible de equipos al insertar uno nuevo
CREATE OR REPLACE FUNCTION fn_incrementar_cant_disponible()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE tipo_equipo
    SET cant_default = cant_default + 1
    WHERE id = NEW.id_tipo;
    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_after_insert_equipo_medico
AFTER INSERT ON equipo_medico
FOR EACH ROW
EXECUTE FUNCTION fn_incrementar_cant_disponible();
-- Comando de Ejecucion: CALL up_insertar_equipo_medico('RESART02', 6, 1, 'MediTech Solutions');

-- >>> Procedimiento almacenado para modificar un equipo medico <<<
CREATE OR REPLACE PROCEDURE up_modificar_equipo_medico(
    p_placa VARCHAR(10),
    p_id_tipo INTEGER,
    p_num_cama INTEGER,
    p_proveedor VARCHAR(30)
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE equipo_medico
    SET id_tipo = p_id_tipo,
        num_cama = p_num_cama,
        proveedor = p_proveedor
    WHERE placa = p_placa;
END;
$$;
-- Comando de Ejecucion: CALL up_modificar_equipo_medico('ELECAR02', 7, 7, 'MediTech Solutions')

-- >>> Procedimiento almacenado para eliminar un equipo medico <<<
CREATE OR REPLACE PROCEDURE up_eliminar_equipo_medico(
    p_placa VARCHAR(10)
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM equipo_medico
    WHERE placa = p_placa;
END;
$$;
-- Comando de Ejecucion: CALL up_eliminar_equipo_medico('ELECAR02');

-- >>> Función para obtener la información de las camas <<<
CREATE OR REPLACE FUNCTION fn_obtener_camas()
RETURNS TABLE(
    numero INTEGER,
    numero_salon INTEGER,
    nombre_salon VARCHAR(30),
    cuidados_intensivos BOOLEAN,
    tipo_equipo TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT a.numero, a.numero_salon, b.nombre, a.cuidados_intensivos, STRING_AGG(d.tipo, ', ') AS tipo_equipo
    FROM cama AS a JOIN salon AS b ON a.numero_salon = b.numero
                   JOIN equipo_medico AS c ON a.numero = c.num_cama
                   JOIN tipo_equipo AS d ON c.id_tipo = d.id
    GROUP BY a.numero, a.numero_salon, b.nombre, a.cuidados_intensivos
    ORDER BY a.numero, a.numero_salon;
END;
$$;
-- Comando de Ejecucion: SELECT * FROM fn_obtener_camas();

-- >>> Procedimiento almacenado para agregar una cama <<<
CREATE OR REPLACE PROCEDURE up_insertar_cama(
    p_numero_salon INTEGER,
    p_cuidados_intensivos BOOLEAN
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO cama (numero_salon, cuidados_intensivos)
    VALUES (p_numero_salon, p_cuidados_intensivos);
END;
$$;
-- Comando de Ejecucion: CALL up_insertar_cama(1, TRUE);

-- >>> Procedimiento almacenado para modificar una cama <<<
CREATE OR REPLACE PROCEDURE up_modificar_cama(
    p_numero INTEGER,
    p_numero_salon INTEGER,
    p_cuidados_intensivos BOOLEAN
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE cama
    SET numero_salon = p_numero_salon,
        cuidados_intensivos = p_cuidados_intensivos
    WHERE numero = p_numero;
END;
$$;
-- Comando de Ejecucion: CALL up_modificar_cama(17, 5, TRUE);

-- >>> Procedimiento almacenado para eliminar una cama <<<
CREATE OR REPLACE PROCEDURE up_eliminar_cama(
    p_numero INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM cama
    WHERE numero = p_numero;
END;
$$;
-- Comando de Ejecucion: CALL up_eliminar_cama(17);

-- >>> Función para obtener la información de los procedimientos medicos <<<
CREATE OR REPLACE FUNCTION fn_obtener_procedimientos()
RETURNS TABLE(
    p_id INTEGER,
    p_nombre VARCHAR(30),
    p_dias_recuperacion INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT id, nombre, dias_recuperacion
    FROM procedimiento_medico;
END;
$$;
-- Comando de Ejecucion: SELECT * FROM fn_obtener_procedimientos();

-- >>> Procedimiento almacenado para agregar un procedimiento medico <<<
CREATE OR REPLACE PROCEDURE up_insertar_procedimiento(
    p_nombre VARCHAR(30),
    p_dias_recuperacion INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO procedimiento_medico (nombre, dias_recuperacion)
    VALUES (p_nombre, p_dias_recuperacion);
END;
$$;
-- Comando de Ejecucion: CALL up_insertar_procedimiento('Quimioterapia', 15);

-- >>> Procedimiento almacenado para modificar un procedimiento medico <<<
CREATE OR REPLACE PROCEDURE up_modificar_procedimiento(
    p_id INTEGER,
    p_nombre VARCHAR(30),
    p_dias_recuperacion INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE procedimiento_medico
    SET nombre = p_nombre,
        dias_recuperacion = p_dias_recuperacion
    WHERE id = p_id;
END;
$$;
-- Comando de Ejecucion: CALL up_modificar_procedimiento(9, 'Quimioterapia', 30);

-- >>> Procedimiento almacenado para eliminar un procedimiento medico <<<
CREATE OR REPLACE PROCEDURE up_eliminar_procedimiento(
    p_id INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM procedimiento_medico
    WHERE id = p_id;
END;
$$;
-- Comando de Ejecucion: CALL up_eliminar_procedimiento(9);

-- >>> Función para obtener la información del personal médico <<<
CREATE OR REPLACE FUNCTION fn_obtener_personal()
RETURNS TABLE(
    cedula NUMERIC(10),
    rol_nombre VARCHAR(15),
    p_nombre VARCHAR(20),
    s_nombre VARCHAR(20),
    p_apellido VARCHAR(20),
    s_apellido VARCHAR(20),
    f_nacim DATE,
    edad INTEGER,
    fecha_ingreso DATE,
    pais VARCHAR(20),
    provincia VARCHAR(20),
    distrito VARCHAR(40),
    domicilio VARCHAR(200)
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT a.cedula,
           b.rol_nombre,
           a.p_nombre,
           a.s_nombre,
           a.p_apellido,
           a.s_apellido,
           a.f_nacim,
           EXTRACT(YEAR FROM AGE(CURRENT_DATE, A.f_nacim))::INTEGER AS edad, -- Convertir a INTEGER explícitamente
           c.fecha,
           a.pais,
           a.provincia,
           a.distrito,
           a.domicilio
    FROM usuario AS a JOIN rol_usuario AS b ON a.rol_id = b.id
                      JOIN fecha_ingreso AS c ON a.cedula = c.user_ced
    WHERE a.rol_id IN (2,3);
END;
$$;
-- Comando de Ejecución: SELECT * FROM fn_obtener_personal();

-- >>> Procedimiento almacenado para agregar una persona del personal médico (ya implementado en SpLogin) (up_insertar_usuario)<<<

-- >>> Trigger para colocar la fecha de ingreso al insertar alguien nuevo del persona médico
CREATE OR REPLACE FUNCTION fn_insertar_fecha_ingreso()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO fecha_ingreso (fecha, user_ced)
    VALUES (CURRENT_DATE, NEW.cedula);
    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER trg_insertar_fecha_ingreso
AFTER INSERT ON usuario
FOR EACH ROW
WHEN (NEW.rol_id IN (2, 3))
EXECUTE FUNCTION fn_insertar_fecha_ingreso();

/* Comando de Ejecucion: 
CALL up_insertar_usuario(
     402680964,  -- cedula
     2, -- rol_id
    'd7a395614eb5f88f595d4ada638948f9',  -- contrasena
    'María',  -- p_nombre
    'Luisa',  -- s_nombre
    'Ávila',  -- p_apellido
    'González',  -- s_apellido
    '1971-06-11',  -- f_nacim
    'Costa Rica',  -- pais
    'San José',  -- provincia
    'Central',  -- distrito
    '100m sur del teatro Melico Salazar'  -- domicilio
);
*/

-- >>> Procedimiento almacenado para modificar una persona del personal médico <<<
CREATE OR REPLACE PROCEDURE up_modificar_personal(
    p_cedula NUMERIC(10),
    p_rol_id INTEGER,
    p_contrasena TEXT,
    p_p_nombre VARCHAR(20),
    p_s_nombre VARCHAR(20),
    p_p_apellido VARCHAR(20),
    p_s_apellido VARCHAR(20),
    p_f_nacim DATE,
    p_pais VARCHAR(20),
    p_provincia VARCHAR(20),
    p_distrito VARCHAR(40),
    p_domicilio VARCHAR(200),
    p_fecha_ingreso DATE
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE usuario
    SET rol_id = p_rol_id,
        contrasena = p_contrasena,
        p_nombre = p_p_nombre,
        s_nombre = p_s_nombre,
        p_apellido = p_p_apellido,
        s_apellido = p_s_apellido,
        f_nacim = p_f_nacim,
        pais = p_pais,
        provincia = p_provincia,
        distrito = p_distrito,
        domicilio = p_domicilio
    WHERE cedula = p_cedula;

    UPDATE fecha_ingreso
    SET fecha = p_fecha_ingreso
    WHERE user_ced = p_cedula;
END;
$$;

/* Comando de Ejecución
CALL up_modificar_personal(
     402680964,  -- cedula
     2, -- rol_id
    'd7a395614eb5f88f595d4ada638948f9',  -- contrasena
    'María',  -- p_nombre
    'Luisa',  -- s_nombre
    'Ávila',  -- p_apellido
    'González',  -- s_apellido
    '1971-06-11',  -- f_nacim
    'Costa Rica',  -- pais
    'San José',  -- provincia
    'Central',  -- distrito
    '100m sur del teatro Melico Salazar',  -- domicilio
    '1988-06-02' -- fecha de ingreso
);
*/

-- >>> Procedimiento almacenado para eliminar una persona del personal médico <<<
CREATE OR REPLACE PROCEDURE up_eliminar_personal(
    p_cedula NUMERIC(10)
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM usuario
    WHERE cedula = p_cedula;
END;
$$;
-- Comando de Ejecucion: CALL up_eliminar_personal(402680964);





  