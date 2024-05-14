CREATE DATABASE hospitec; 

DROP TABLE IF EXISTS rol_usuario;
CREATE TABLE rol_usuario(
    id NUMERIC(1) NOT NULL,
    rol_nombre VARCHAR(15) NOT NULL,
    PRIMARY KEY(id)
);

DROP TABLE IF EXISTS usuario;
CREATE TABLE usuario(
    cedula NUMERIC(10) NOT NULL,
    rol_id NUMERIC(1) NOT NULL,
    contrasena VARCHAR(32) NOT NULL,
    p_nombre VARCHAR(20) NOT NULL,
    s_nombre VARCHAR(20),
    p_apellido VARCHAR(20) NOT NULL,
    s_apellido VARCHAR(20),
    f_nacim DATE NOT NULL,
    pais VARCHAR(20) NOT NULL,
    provincia VARCHAR(20) NOT NULL,
    distrito VARCHAR(40) NOT NULL,
    domicilio VARCHAR(200) NOT NULL,
    PRIMARY KEY(cedula),
    FOREIGN KEY(rol_id) REFERENCES rol_usuario(id)
);

DROP TABLE IF EXISTS telefono_usuario;
CREATE TABLE telefono_usuario(
    telefono VARCHAR(10) NOT NULL,
    user_ced NUMERIC(10) NOT NULL,
    PRIMARY KEY(telefono, user_ced),
    FOREIGN KEY(user_ced) REFERENCES usuario(cedula)
);

DROP TABLE IF EXISTS fecha_ingreso;
CREATE TABLE fecha_ingreso(
    fecha DATE NOT NULL,
    user_ced NUMERIC(10) NOT NULL,
    PRIMARY KEY(fecha, user_ced),
    FOREIGN KEY(user_ced) REFERENCES usuario(cedula)
);


DROP TABLE IF EXISTS patologia;
CREATE TABLE patologia(
    nombre VARCHAR(50) NOT NULL,
    tratamiento VARCHAR(300) NOT NULL,
    user_ced NUMERIC(10) NOT NULL,
    PRIMARY KEY(nombre, tratamiento, user_ced),
    FOREIGN KEY(user_ced) REFERENCES usuario(cedula)
);

DROP TABLE IF EXISTS procedimiento_medico;
CREATE TABLE procedimiento_medico(
    id NUMERIC(1) NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    dias_recuperacion INT NOT NULL,
    PRIMARY KEY(id)
);

DROP TABLE IF EXISTS historial_medico;
CREATE TABLE historial_medico(
    fecha DATE NOT NULL,
    tratamiento VARCHAR(300) NOT NULL,
    user_ced NUMERIC(10) NOT NULL,
    id_procedimiento NUMERIC(1) NOT NULL,
    PRIMARY KEY(fecha, tratamiento, user_ced, id_procedimiento),
    FOREIGN KEY(user_ced) REFERENCES usuario(cedula),
    FOREIGN KEY(id_procedimiento) REFERENCES procedimiento_medico(id)
);

DROP TABLE IF EXISTS tipo_salon;
CREATE TABLE tipo_salon(
    id numeric(1) NOT NULL,
    tipo varchar(20) NOT NULL,
    PRIMARY KEY(id)
);

DROP TABLE IF EXISTS salon;
CREATE TABLE salon(
    numero NUMERIC(2) NOT NULL,
    id_tipo NUMERIC(1) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    capacidad NUMERIC(2) NOT NULL,
    piso NUMERIC(1) NOT NULL,
    PRIMARY KEY(numero),
    FOREIGN KEY(id_tipo) REFERENCES tipo_salon(id)
);

DROP TABLE IF EXISTS cama;
CREATE TABLE cama(
    numero NUMERIC(4) NOT NULL,
    numero_salon NUMERIC(2) NOT NULL,
    cuidados_intensivos BIT NOT NULL,
    PRIMARY KEY(numero),
    FOREIGN KEY(numero_salon) REFERENCES salon(numero) 
);

DROP TABLE IF EXISTS tipo_equipo;
CREATE TABLE tipo_equipo(
    id NUMERIC(1) NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    cant_default NUMERIC(2) NOT NULL,
    PRIMARY KEY(id)
);

DROP TABLE IF EXISTS equipo_medico;
CREATE TABLE equipo_medico(
    placa VARCHAR(10) NOT NULL,
    num_cama NUMERIC(4) NOT NULL,
    proveedor VARCHAR(30) NOT NULL,
    PRIMARY KEY(placa),
    FOREIGN KEY(num_cama) REFERENCES cama(numero)
);

DROP TABLE IF EXISTS reservacion_cama;
CREATE TABLE reservacion_cama(
    id NUMERIC(1) NOT NULL,
    user_ced NUMERIC(10) NOT NULL,
    num_cama NUMERIC(4) NOT NULL,
    fecha_ingreso DATE NOT NULL,
    fecha_salida DATE NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(user_ced) REFERENCES usuario(cedula),
    FOREIGN KEY(num_cama) REFERENCES cama(numero)
);

DROP TABLE IF EXISTS procedimiento_reservacion;
CREATE TABLE procedimiento_reservacion(
    id_procedimiento NUMERIC(1) NOT NULL,
    id_reservacion NUMERIC(1) NOT NULL,
    PRIMARY KEY(id_procedimiento, id_reservacion),
    FOREIGN KEY(id_procedimiento) REFERENCES procedimiento_medico(id),
    FOREIGN KEY(id_reservacion) REFERENCES reservacion_cama(id)
);


