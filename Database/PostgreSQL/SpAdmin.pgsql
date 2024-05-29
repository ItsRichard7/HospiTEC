/*-------------------------------------
|                                     |
|       Store Procedures Admin        |
|                                     |
-------------------------------------*/

-- Procedimiento almacenado para obtener los salones 
CREATE OR REPLACE FUNCTION up_obtener_salones()
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

-- Comando de Ejecucion: SELECT * FROM up_obtener_salones();




  