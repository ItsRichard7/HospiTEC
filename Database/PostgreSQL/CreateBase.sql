-- Creación de la base de datos hospitec
CREATE DATABASE hospitec;

-- Tabla para almacenar roles de usuario
DROP TABLE IF EXISTS rol_usuario;
CREATE TABLE rol_usuario(
    id NUMERIC(1) NOT NULL,         -- Identificador numérico del rol
    rol_nombre VARCHAR(15) NOT NULL, -- Nombre del rol
    PRIMARY KEY(id)                 -- Definición de clave primaria
);

-- Tabla para almacenar información de usuarios
DROP TABLE IF EXISTS usuario;
CREATE TABLE usuario(
    cedula NUMERIC(10) NOT NULL,    -- Número de cédula del usuario
    rol_id NUMERIC(1) NOT NULL,     -- ID del rol del usuario
    contrasena VARCHAR(32) NOT NULL, -- Contraseña del usuario
    p_nombre VARCHAR(20) NOT NULL,  -- Primer nombre
    s_nombre VARCHAR(20),            -- Segundo nombre (opcional)
    p_apellido VARCHAR(20) NOT NULL,-- Primer apellido
    s_apellido VARCHAR(20),          -- Segundo apellido (opcional)
    f_nacim DATE NOT NULL,           -- Fecha de nacimiento
    pais VARCHAR(20) NOT NULL,       -- País de residencia
    provincia VARCHAR(20) NOT NULL,  -- Provincia de residencia
    distrito VARCHAR(40) NOT NULL,  -- Distrito de residencia
    domicilio VARCHAR(200) NOT NULL,-- Domicilio completo
    PRIMARY KEY(cedula),             -- Definición de clave primaria
    FOREIGN KEY(rol_id) REFERENCES rol_usuario(id) -- Clave foránea que vincula rol_id con rol_usuario
);

-- Tabla para almacenar números de teléfono de usuarios
DROP TABLE IF EXISTS telefono_usuario;
CREATE TABLE telefono_usuario(
    telefono VARCHAR(10) NOT NULL,   -- Número de teléfono
    user_ced NUMERIC(10) NOT NULL,  -- Cédula del usuario
    PRIMARY KEY(telefono, user_ced), -- Definición de clave primaria compuesta
    FOREIGN KEY(user_ced) REFERENCES usuario(cedula) -- Clave foránea que vincula user_ced con usuario
);

-- Tabla para registrar fechas de ingreso de usuarios
DROP TABLE IF EXISTS fecha_ingreso;
CREATE TABLE fecha_ingreso(
    fecha DATE NOT NULL,            -- Fecha de ingreso
    user_ced NUMERIC(10) NOT NULL, -- Cédula del usuario
    PRIMARY KEY(fecha, user_ced),  -- Definición de clave primaria compuesta
    FOREIGN KEY(user_ced) REFERENCES usuario(cedula) -- Clave foránea que vincula user_ced con usuario
);

-- Tabla para almacenar información sobre patologías de usuarios
DROP TABLE IF EXISTS patologia;
CREATE TABLE patologia(
    nombre VARCHAR(50) NOT NULL,     -- Nombre de la patología
    tratamiento VARCHAR(300) NOT NULL, -- Tratamiento de la patología
    user_ced NUMERIC(10) NOT NULL,  -- Cédula del usuario
    PRIMARY KEY(nombre, tratamiento, user_ced), -- Definición de clave primaria compuesta
    FOREIGN KEY(user_ced) REFERENCES usuario(cedula) -- Clave foránea que vincula user_ced con usuario
);

-- Tabla para almacenar tipos de procedimientos médicos
DROP TABLE IF EXISTS procedimiento_medico;
CREATE TABLE procedimiento_medico(
    id NUMERIC(1) NOT NULL,        -- Identificador del procedimiento
    nombre VARCHAR(20) NOT NULL,   -- Nombre del procedimiento
    dias_recuperacion INT NOT NULL, -- Días de recuperación del procedimiento
    PRIMARY KEY(id)                -- Definición de clave primaria
);

-- Tabla para registrar historial médico de usuarios
DROP TABLE IF EXISTS historial_medico;
CREATE TABLE historial_medico(
    fecha DATE NOT NULL,           -- Fecha del procedimiento médico
    tratamiento VARCHAR(300) NOT NULL, -- Tratamiento médico
    user_ced NUMERIC(10) NOT NULL, -- Cédula del usuario
    id_procedimiento NUMERIC(1) NOT NULL, -- ID del procedimiento médico
    PRIMARY KEY(fecha, tratamiento, user_ced, id_procedimiento), -- Definición de clave primaria compuesta
    FOREIGN KEY(user_ced) REFERENCES usuario(cedula), -- Clave foránea que vincula user_ced con usuario
    FOREIGN KEY(id_procedimiento) REFERENCES procedimiento_medico(id) -- Clave foránea que vincula id_procedimiento con procedimiento_medico
);

-- Tabla para almacenar tipos de salones
DROP TABLE IF EXISTS tipo_salon;
CREATE TABLE tipo_salon(
    id numeric(1) NOT NULL,       -- Identificador del tipo de salón
    tipo varchar(20) NOT NULL,    -- Tipo de salón
    PRIMARY KEY(id)               -- Definición de clave primaria
);

-- Tabla para registrar información de los salones
DROP TABLE IF EXISTS salon;
CREATE TABLE salon(
    numero NUMERIC(2) NOT NULL,    -- Número de salón
    id_tipo NUMERIC(1) NOT NULL,  -- ID del tipo de salón
    nombre VARCHAR(30) NOT NULL,  -- Nombre del salón
    capacidad NUMERIC(2) NOT NULL,-- Capacidad del salón
    piso NUMERIC(1) NOT NULL,     -- Piso del salón
    PRIMARY KEY(numero),          -- Definición de clave primaria
    FOREIGN KEY(id_tipo) REFERENCES tipo_salon(id) -- Clave foránea que vincula id_tipo con tipo_salon
);

-- Tabla para registrar camas en los salones
DROP TABLE IF EXISTS cama;
CREATE TABLE cama(
    numero NUMERIC(4) NOT NULL,      -- Número de cama
    numero_salon NUMERIC(2) NOT NULL,-- Número de salón al que pertenece la cama
    cuidados_intensivos BIT NOT NULL,-- Indicador de cuidados intensivos
    PRIMARY KEY(numero),             -- Definición de clave primaria
    FOREIGN KEY(numero_salon) REFERENCES salon(numero) -- Clave foránea que vincula numero_salon con salon
);

-- Tabla para almacenar tipos de equipos médicos
DROP TABLE IF EXISTS tipo_equipo;
CREATE TABLE tipo_equipo(
    id NUMERIC(1) NOT NULL,        -- Identificador del tipo de equipo médico
    tipo VARCHAR(20) NOT NULL,     -- Tipo de equipo médico
    cant_default NUMERIC(2) NOT NULL, -- Cantidad por defecto
    PRIMARY KEY(id)                -- Definición de clave primaria
);

-- Tabla para registrar equipos médicos
DROP TABLE IF EXISTS equipo_medico;
CREATE TABLE equipo_medico(
    placa VARCHAR(10) NOT NULL,    -- Placa del equipo médico
    num_cama NUMERIC(4) NOT NULL,  -- Número de c



