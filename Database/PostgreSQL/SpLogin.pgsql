/*-------------------------------------
|                                     |
|       Store Procedures Login        |
|                                     |
-------------------------------------*/

-- >>> Función para verificar el inicio de sesión de un usuario <<<
-- Regresa 1 si las credenciales son correctas
-- Regresa 2 si la cedula no existe en la base
-- Regresa 3 si la contraseña es incorrecta
CREATE OR REPLACE FUNCTION fn_verificar_inicio_sesion(
    p_cedula NUMERIC(10),
    p_contrasena TEXT
)
RETURNS INT
LANGUAGE plpgsql
AS $$
DECLARE
    resultado INT;
BEGIN
    -- Verificar si el usuario existe
    IF NOT EXISTS (SELECT 1 FROM usuario WHERE cedula = p_cedula) THEN
        RETURN 2;  -- Usuario no existe
    END IF;

    -- Verificar la contraseña
    IF NOT EXISTS (SELECT 1 FROM usuario WHERE cedula = p_cedula AND contrasena = p_contrasena) THEN
        RETURN 3;  -- Contraseña incorrecta
    END IF;

    -- Credenciales correctas
    RETURN 1;
END;
$$;
-- Comando de Ejecucion: SELECT fn_verificar_inicio_sesion(1234567890, '0192023a7bbd73250516f069df18b500') AS resultado;

-- >>> Función para obtener la información de un usuario
CREATE OR REPLACE FUNCTION fn_obtener_info_usuario(
    p_cedula NUMERIC(10)
)
RETURNS TABLE(
    cedula NUMERIC(10),
    rol_id INTEGER, 
    p_nombre VARCHAR(20), 
    s_nombre VARCHAR(20),      
    p_apellido VARCHAR(20), 
    s_apellido VARCHAR(20),
    edad INTEGER,
    pais VARCHAR(20), 
    provincia VARCHAR(20),
    distrito VARCHAR(40), 
    domicilio VARCHAR(200)
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT u.cedula, 
           u.rol_id, 
           u.p_nombre, 
           u.s_nombre, 
           u.p_apellido, 
           u.s_apellido, 
           EXTRACT(YEAR FROM AGE(CURRENT_DATE, u.f_nacim))::INTEGER AS edad, -- Convertir a INTEGER explícitamente
           u.pais, 
           u.provincia, 
           u.distrito, 
           u.domicilio
    FROM usuario u
    WHERE u.cedula = p_cedula;
END;
$$;
-- Comando de Ejecucion: SELECT * from fn_obtener_info_usuario(1234567891);

-- >>> Procedimiento almacenado para insertar un nuevo usuario <<<
CREATE OR REPLACE PROCEDURE up_insertar_usuario(
    cedula NUMERIC(10), 
    contrasena TEXT, 
    p_nombre VARCHAR(20), 
    s_nombre VARCHAR(20),      
    p_apellido VARCHAR(20), 
    s_apellido VARCHAR(20),
    f_nacim DATE, 
    pais VARCHAR(20), 
    provincia VARCHAR(20), 
    distrito VARCHAR(40), 
    domicilio VARCHAR(200)
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO usuario(
        cedula, rol_id, contrasena, 
        p_nombre, s_nombre, p_apellido, 
        s_apellido, f_nacim, pais, 
        provincia, distrito, domicilio)
    VALUES(
        cedula, 3, contrasena, 
        p_nombre, s_nombre, p_apellido, 
        s_apellido, f_nacim, pais, 
        provincia, distrito, domicilio);
END;
$$;

/* Comando de Ejecucion: 
CALL up_insertar_usuario(
     118450968,  -- cedula
    '6273746050885a56795feb58ccdb4b21',  -- contrasena
    'Richi',  -- p_nombre
    'God',  -- s_nombre
    'Borbon',  -- p_apellido
    'Mena',  -- s_apellido
    '2002-06-11',  -- f_nacim
    'Costa Rica',  -- pais
    'San Jose',  -- provincia
    'San Marcos',  -- distrito
    'A la par de mi vecino'  -- domicilio
);
*/

-- >>> Store Procedure para modificar la contraseña de un usuario <<<
CREATE OR REPLACE PROCEDURE up_modificar_contrasena(
    p_cedula NUMERIC(10), 
    p_contrasena TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE usuario 
    SET contrasena = p_contrasena
    WHERE cedula = p_cedula;
END;
$$;
-- Comando de Ejecucion: CALL up_modificar_contrasena(118450968, '6273746050885a56795feb58ccdb4b21');