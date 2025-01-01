
CREATE TABLE userinter (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(500) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    isVerified BOOLEAN,
    role ENUM('admin', 'client') NOT NULL DEFAULT 'client',
    PRIMARY KEY (id),
    UNIQUE KEY email (email)
);

CREATE TABLE articulosinter (
    id INT NOT NULL AUTO_INCREMENT,
    userEmail VARCHAR(255) NOT NULL, 
    nombre VARCHAR(255) NOT NULL, 
    descripcion TEXT NOT NULL, 
    categoria VARCHAR(255) NOT NULL, 
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(255) NOT NULL, 
    imagen VARCHAR(500), 
    PRIMARY KEY (id),
    UNIQUE KEY nombre (nombre),
    FOREIGN KEY (userEmail) REFERENCES userinter(email) ON DELETE CASCADE
);

CREATE TABLE categoriainter (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL, 
    descripcion TEXT NOT NULL, 
    PRIMARY KEY (id),
    UNIQUE KEY nombre (nombre)
);

CREATE TABLE favoritosinter (
    id INT NOT NULL AUTO_INCREMENT,
    userEmail VARCHAR(255) NOT NULL,
    articuloNombre VARCHAR(255) NOT NULL, 
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY (id),
    UNIQUE KEY user_articulo (userEmail, articuloNombre), 
    FOREIGN KEY (userEmail) REFERENCES userinter(email) ON DELETE CASCADE,
    FOREIGN KEY (articuloNombre) REFERENCES articulosinter(nombre) ON DELETE CASCADE
);


