/*-------------------------------------
|                                     |
|      Store Procedures Medico        |
|                                     |
-------------------------------------*/

-- >>> Store procedure para insertar un nuevo paciente (ya implementado en SpLogin) (up_insertar_usuario)<<<

-- >>> Store procedure para insertar patologias de un paciente <<<
CREATE OR REPLACE PROCEDURE up_insertar_patologia(
    p_nombre VARCHAR(50),
    p_tratamiento VARCHAR(300),
    p_user_ced NUMERIC(10)
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO patologia(
        nombre, tratamiento, user_ced)
    VALUES(
        p_nombre, p_tratamiento, p_user_ced);
END;
$$;
-- Comando de Ejecucion: CALL up_insertar_patologia('Diabetes', 'Insulina y dieta', 1234567894);

-- >>> Funcion para obtener el historial medico de un paciente <<<
CREATE OR REPLACE FUNCTION fn_obtener_historial(
    p_user_ced NUMERIC(10)
)
RETURNS TABLE(
    id INTEGER,
    fecha DATE,
    id_procedimiento INTEGER,
    nombre_procedimiento VARCHAR(20),
    tratamiento VARCHAR(300)
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT a.id, a.fecha, a.id_procedimiento, b.nombre, a.tratamiento
    FROM historial_medico AS a JOIN procedimiento_medico AS b ON a.id_procedimiento = b.id
    WHERE user_ced = p_user_ced
    ORDER BY fecha;
END;
$$;
-- Comando de Ejecucion: SELECT * FROM fn_obtener_historial(1234567894);

-- >>> Store Procedure para ingresar un historial medico <<<
CREATE OR REPLACE PROCEDURE up_ingresar_historial_medico(
    p_user_ced NUMERIC(10),
    p_fecha DATE,
    p_id_procedimiento INTEGER,
    p_tratamiento VARCHAR(300)
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO historial_medico(user_ced, fecha, id_procedimiento, tratamiento)
    VALUES(p_user_ced, p_fecha, p_id_procedimiento, p_tratamiento);
END;
$$;
-- Comando de Ejecucion: CALL up_ingresar_historial_medico('1234567894', '1980-01-20', 3, 'Se realizo sin complicaciones la cirugia');

-- >>> Store Procedure para editar un historial medico <<<
CREATE OR REPLACE PROCEDURE up_editar_historial(
    p_id INTEGER,
    p_user_ced NUMERIC(10),
    p_fecha DATE,
    p_id_procedimiento INTEGER,
    p_tratamiento VARCHAR(300)
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE historial_medico
    SET fecha = p_fecha,
        tratamiento = p_tratamiento,
        user_ced = p_user_ced,
        id_procedimiento = p_id_procedimiento
    WHERE id = p_id;
END;
$$;
-- Comando de Ejecucion: CALL up_editar_historial(5, '1234567894', '1990-01-20', 3, 'Se realizo sin complicaciones la cirugia');
