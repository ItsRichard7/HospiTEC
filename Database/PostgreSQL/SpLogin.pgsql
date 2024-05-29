/*-------------------------------------
|                                     |
|       Store Procedures Login        |
|                                     |
-------------------------------------*/

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
        provincia, distrito, domicilio
    )
    VALUES(
        cedula, 3, contrasena, 
        p_nombre, s_nombre, p_apellido, 
        s_apellido, f_nacim, pais, 
        provincia, distrito, domicilio
    );
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