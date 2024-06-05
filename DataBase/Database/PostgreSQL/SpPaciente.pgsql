/*-------------------------------------
|                                     |
|      Store Procedures Paciente      |
|                                     |
-------------------------------------*/

-- >>> Funcion para obtener todas las reservaciones hechas por un usuario <<<
CREATE OR REPLACE FUNCTION fn_obtener_reservaciones_usuario(
    p_user_ced NUMERIC(10)
)
RETURNS TABLE(
    p_id INTEGER,
    p_num_cama INTEGER,
    p_fecha_ingreso DATE,
    p_fecha_salida DATE
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT id, num_cama, fecha_ingreso, fecha_salida
    FROM reservacion_cama
    WHERE user_ced = p_user_ced
    ORDER BY fecha_ingreso;
END;
$$;
-- Comando de ejecucion: SELECT * FROM fn_obtener_reservaciones_usuario(1234567894);

-- >>> Funcion para obtener todas las reservaciones de una cama <<<
CREATE OR REPLACE FUNCTION fn_obtener_reservaciones_cama(
    p_num_cama INTEGER
)
RETURNS TABLE(
    p_id INTEGER,
    p_user_ced NUMERIC(10),
    p_fecha_ingreso DATE,
    p_fecha_salida DATE
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT id, user_ced, fecha_ingreso, fecha_salida
    FROM reservacion_cama
    WHERE num_cama = p_num_cama
    ORDER BY fecha_ingreso;
END;
$$;
-- Comando de ejecucion: SELECT * FROM fn_obtener_reservaciones_cama(1);

-- >>> Funcion que verifique si una cama esta disponible <<<
CREATE OR REPLACE FUNCTION fn_verificar_disponibilidad_cama(
    p_num_cama INTEGER,
    p_fecha_ingreso DATE,
    p_fecha_salida DATE
)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
    disponibilidad INTEGER;
BEGIN
    -- Verifica si hay alguna reserva que se solape con las fechas proporcionadas
    IF EXISTS (
        SELECT 1
        FROM reservacion_cama
        WHERE num_cama = p_num_cama
        AND (
            (p_fecha_ingreso BETWEEN fecha_ingreso AND fecha_salida) OR
            (p_fecha_salida BETWEEN fecha_ingreso AND fecha_salida) OR
            (fecha_ingreso BETWEEN p_fecha_ingreso AND p_fecha_salida) OR
            (fecha_salida BETWEEN p_fecha_ingreso AND p_fecha_salida)
        )
    ) THEN
        disponibilidad := 0;  -- Hay una colisión de fechas, la cama no está disponible
    ELSE
        disponibilidad := 1;  -- No hay colisión de fechas, la cama está disponible
    END IF;

    RETURN disponibilidad;
END;
$$;
-- Comando de Ejecucion: SELECT * FROM fn_verificar_disponibilidad_cama(1, '2024-06-14', '2024-06-15');

-- >>> Procedure para insertar una reservacion de cama <<<
CREATE OR REPLACE FUNCTION fn_insertar_reservacion_cama(
    p_user_ced NUMERIC(10),
    p_num_cama INTEGER,
    p_fecha_ingreso DATE,
    p_fecha_salida DATE
)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
    v_id_reservacion INTEGER;
BEGIN
    -- Insertar la nueva reservación y obtener el ID generado
    INSERT INTO reservacion_cama(user_ced, num_cama, fecha_ingreso, fecha_salida)
    VALUES(p_user_ced, p_num_cama, p_fecha_ingreso, p_fecha_salida)
    RETURNING id INTO v_id_reservacion;
    
    -- Devolver el ID de la nueva reservación
    RETURN v_id_reservacion;
END;
$$;
-- Comando de Ejecucion: SELECT * FROM fn_insertar_reservacion_cama(1234567894, 1, '2024-06-02', '2024-06-10');

-- >>> Procedure para insertar procedimientos a realizar en una cita <<<
CREATE OR REPLACE PROCEDURE up_insertar_procedimiento_reservacion(
    p_id_procedimiento INTEGER,
    p_id_reservacion INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO procedimiento_reservacion(id_procedimiento, id_reservacion)
    VALUES(p_id_procedimiento, p_id_reservacion);
END;
$$;
-- Comando de ejecucion: CALL up_insertar_procedimiento_reservacion(10, 5);

-- >>> Funcion para obtener el historial medico (ya implementado en SpMedico) (fn_obtener_historial) <<<

-- >>> Procedure para insertar patologías (ya implementado en SpMedico) (up_insertar_patologia) <<<