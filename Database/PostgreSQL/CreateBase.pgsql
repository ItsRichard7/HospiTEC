-- Creación de la base de datos hospitec 
-- (Primero ejecutar esta línea individualmente)
-- CREATE DATABASE hospitec;

-- Ahora seleccionar en PostgreSQL la base que acabamos de crear 
-- y ejecutar el resto de comandos de aqui hacia abajo

-- Eliminar las tablas en caso de que ya estén creadas
DROP TABLE IF EXISTS procedimiento_reservacion;
DROP TABLE IF EXISTS reservacion_cama;
DROP TABLE IF EXISTS equipo_medico;
DROP TABLE IF EXISTS tipo_equipo;
DROP TABLE IF EXISTS cama;
DROP TABLE IF EXISTS salon;
DROP TABLE IF EXISTS tipo_salon;
DROP TABLE IF EXISTS historial_medico;
DROP TABLE IF EXISTS procedimiento_medico;
DROP TABLE IF EXISTS patologia;
DROP TABLE IF EXISTS fecha_ingreso;
DROP TABLE IF EXISTS telefono_usuario;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS rol_usuario;

-- Tabla para almacenar roles de usuario
CREATE TABLE rol_usuario(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY, -- Identificador numérico del rol
    rol_nombre VARCHAR(15) NOT NULL, -- Nombre del rol
    PRIMARY KEY(id)                 -- Definición de clave primaria
);

-- Tabla para almacenar información de usuarios
CREATE TABLE usuario(
    cedula NUMERIC(10) NOT NULL,    -- Número de cédula del usuario
    rol_id INTEGER NOT NULL,     -- ID del rol del usuario
    contrasena TEXT NOT NULL, -- Contraseña del usuario
    p_nombre VARCHAR(20) NOT NULL,  -- Primer nombre
    s_nombre VARCHAR(20),            -- Segundo nombre (opcional)
    p_apellido VARCHAR(20) NOT NULL,-- Primer apellido
    s_apellido VARCHAR(20),          -- Segundo apellido (opcional)
    f_nacim DATE NOT NULL,           -- Fecha de nacimiento
    pais VARCHAR(40) NOT NULL,       -- País de residencia
    provincia VARCHAR(20) NOT NULL,  -- Provincia de residencia
    distrito VARCHAR(40) NOT NULL,  -- Distrito de residencia
    domicilio VARCHAR(200) NOT NULL,-- Domicilio completo
    PRIMARY KEY(cedula),             -- Definición de clave primaria
    FOREIGN KEY(rol_id) REFERENCES rol_usuario(id) -- Clave foránea que vincula rol_id con rol_usuario
);

-- Tabla para almacenar números de teléfono de usuarios
CREATE TABLE telefono_usuario(
    telefono VARCHAR(10) NOT NULL,   -- Número de teléfono
    user_ced NUMERIC(10) NOT NULL,  -- Cédula del usuario
    PRIMARY KEY(telefono, user_ced), -- Definición de clave primaria compuesta
    FOREIGN KEY(user_ced) REFERENCES usuario(cedula) -- Clave foránea que vincula user_ced con usuario
);

-- Tabla para registrar fechas de ingreso de usuarios
CREATE TABLE fecha_ingreso(
    fecha DATE NOT NULL,            -- Fecha de ingreso
    user_ced NUMERIC(10) NOT NULL, -- Cédula del usuario
    PRIMARY KEY(fecha, user_ced),  -- Definición de clave primaria compuesta
    FOREIGN KEY(user_ced) REFERENCES usuario(cedula) -- Clave foránea que vincula user_ced con usuario
);

-- Tabla para almacenar información sobre patologías de usuarios
CREATE TABLE patologia(
    nombre VARCHAR(50) NOT NULL,     -- Nombre de la patología
    tratamiento VARCHAR(300) NOT NULL, -- Tratamiento de la patología
    user_ced NUMERIC(10) NOT NULL,  -- Cédula del usuario
    PRIMARY KEY(nombre, tratamiento, user_ced), -- Definición de clave primaria compuesta
    FOREIGN KEY(user_ced) REFERENCES usuario(cedula) -- Clave foránea que vincula user_ced con usuario
);

-- Tabla para almacenar tipos de procedimientos médicos
CREATE TABLE procedimiento_medico(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,        -- Identificador del procedimiento
    nombre VARCHAR(30) NOT NULL,   -- Nombre del procedimiento
    dias_recuperacion INTEGER NOT NULL, -- Días de recuperación del procedimiento
    PRIMARY KEY(id)                -- Definición de clave primaria
);

-- Tabla para registrar historial médico de usuarios
CREATE TABLE historial_medico(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY, -- Identificador de entrada del historial
    fecha DATE NOT NULL,           -- Fecha del procedimiento médico
    tratamiento VARCHAR(300) NOT NULL, -- Tratamiento médico
    user_ced NUMERIC(10) NOT NULL, -- Cédula del usuario
    id_procedimiento INTEGER NOT NULL, -- ID del procedimiento médico
    PRIMARY KEY(id), -- Definición de clave primaria compuesta
    FOREIGN KEY(user_ced) REFERENCES usuario(cedula), -- Clave foránea que vincula user_ced con usuario
    FOREIGN KEY(id_procedimiento) REFERENCES procedimiento_medico(id) -- Clave foránea que vincula id_procedimiento con procedimiento_medico
);

-- Tabla para almacenar tipos de salones
CREATE TABLE tipo_salon(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,       -- Identificador del tipo de salón
    tipo varchar(30) NOT NULL,    -- Tipo de salón
    PRIMARY KEY(id)               -- Definición de clave primaria
);

-- Tabla para registrar información de los salones
CREATE TABLE salon(
    numero INTEGER GENERATED BY DEFAULT AS IDENTITY,    -- Número de salón
    id_tipo INTEGER NOT NULL,  -- ID del tipo de salón
    nombre VARCHAR(30) NOT NULL,  -- Nombre del salón
    capacidad NUMERIC(2) NOT NULL,-- Capacidad del salón
    piso NUMERIC(1) NOT NULL,     -- Piso del salón
    PRIMARY KEY(numero),          -- Definición de clave primaria
    FOREIGN KEY(id_tipo) REFERENCES tipo_salon(id) -- Clave foránea que vincula id_tipo con tipo_salon
);

-- Tabla para registrar camas en los salones
CREATE TABLE cama(
    numero INTEGER GENERATED BY DEFAULT AS IDENTITY,      -- Número de cama
    numero_salon INTEGER NOT NULL,-- Número de salón al que pertenece la cama
    cuidados_intensivos BOOLEAN NOT NULL,-- Indicador de cuidados intensivos
    PRIMARY KEY(numero),             -- Definición de clave primaria
    FOREIGN KEY(numero_salon) REFERENCES salon(numero) -- Clave foránea que vincula numero_salon con salon
);

-- Tabla para almacenar tipos de equipos médicos
CREATE TABLE tipo_equipo(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,        -- Identificador del tipo de equipo médico
    tipo VARCHAR(30) NOT NULL,     -- Tipo de equipo médico
    cant_default NUMERIC(2) NOT NULL, -- Cantidad por defecto
    PRIMARY KEY(id)                -- Definición de clave primaria
);

-- Tabla para registrar equipos médicos
CREATE TABLE equipo_medico(
    placa VARCHAR(10) NOT NULL,    -- Placa del equipo médico
    id_tipo INTEGER NOT NULL,  -- Tipo del equipo médico
    num_cama INTEGER NOT NULL,  -- Número de cama a la que está asignado
    proveedor VARCHAR(30) NOT NULL,-- Proveedor del equipo médico
    PRIMARY KEY(placa),            -- Definición de clave primaria
    FOREIGN KEY(id_tipo) REFERENCES tipo_equipo(id),  --Clave foránea que vincula id_tipo con id 
    FOREIGN KEY(num_cama) REFERENCES cama(numero) -- Clave foránea que vincula num_cama con cama
);

-- Tabla para gestionar reservas de camas
CREATE TABLE reservacion_cama(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,        -- Identificador de la reserva
    user_ced NUMERIC(10) NOT NULL, -- Cédula del usuario
    num_cama INTEGER NOT NULL,  -- Número de cama reservada
    fecha_ingreso DATE NOT NULL,    -- Fecha de ingreso
    fecha_salida DATE NOT NULL,     -- Fecha de salida
    PRIMARY KEY(id),                -- Definición de clave primaria
    FOREIGN KEY(user_ced) REFERENCES usuario(cedula), -- Clave foránea que vincula user_ced con usuario
    FOREIGN KEY(num_cama) REFERENCES cama(numero)     -- Clave foránea que vincula num_cama con cama
);

-- Tabla para relacionar procedimientos médicos con reservas de camas
CREATE TABLE procedimiento_reservacion(
    id_procedimiento INTEGER NOT NULL, -- ID del procedimiento médico
    id_reservacion INTEGER NOT NULL,   -- ID de la reserva de cama
    PRIMARY KEY(id_procedimiento, id_reservacion), -- Definición de clave primaria compuesta
    FOREIGN KEY(id_procedimiento) REFERENCES procedimiento_medico(id), -- Clave foránea que vincula id_procedimiento con procedimiento_medico
    FOREIGN KEY(id_reservacion) REFERENCES reservacion_cama(id)       -- Clave foránea que vincula id_reservacion con reservacion_cama
);