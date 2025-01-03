CREATE TABLE userinter (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    isVerified BOOLEAN,
    role ENUM('admin', 'client') NOT NULL DEFAULT 'client',
    PRIMARY KEY (id),
    UNIQUE KEY email (email)
);

CREATE TABLE categoriainter (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY nombre (nombre)
);

CREATE TABLE articulosinter (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    categoria_id INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(255) NOT NULL,
    imagen VARCHAR(500),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES userinter(id) ON DELETE CASCADE,
    FOREIGN KEY (categoria_id) REFERENCES categoriainter(id) ON DELETE CASCADE
);

CREATE TABLE favoritosinter (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    articulo_id INT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES userinter(id) ON DELETE CASCADE,
    FOREIGN KEY (articulo_id) REFERENCES articulosinter(id) ON DELETE CASCADE
);

CREATE TABLE chats (
    id INT NOT NULL AUTO_INCREMENT,
    user_one_id INT NOT NULL,
    user_two_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_one_id) REFERENCES userinter(id) ON DELETE CASCADE,
    FOREIGN KEY (user_two_id) REFERENCES userinter(id) ON DELETE CASCADE
);

CREATE TABLE messages (
    id INT NOT NULL AUTO_INCREMENT,
    chat_id INT NOT NULL,
    sender_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES userinter(id) ON DELETE CASCADE
);
