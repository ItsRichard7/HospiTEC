CREATE DATABASE hospitec;

DROP TABLE IF EXISTS (rolusuario);
CREATE TABLE rolusuario(
    ID NUMERIC(1) NOT NULL,
    rol_nombre VARCHAR(15) NOT NULL
);