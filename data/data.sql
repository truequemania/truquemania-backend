
CREATE TABLE userinter (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(500) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    isVerified BOOLEAN,  
    PRIMARY KEY (id),
    UNIQUE KEY email (email)
);

CREATE TABLE articulosinter (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL, 
    descripcion TEXT NOT NULL, 
    categoria VARCHAR(255) NOT NULL, 
    name VARCHAR(500) NOT NULL,
    email VARCHAR(255) NOT NULL, 
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(255) NOT NULL, 
    imagen VARCHAR(500), 
    favorito BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (id),
    UNIQUE KEY nombre (nombre)
);
