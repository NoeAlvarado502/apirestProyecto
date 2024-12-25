CREATE DATABASE GDA00460_OT_NoeAlvarado;
GO
USE GDA00460_OT_NoeAlvarado;
GO

--TABLAS--
CREATE TABLE estados(
	idEstado NUMERIC(10) IDENTITY(1,1),
	nombre VARCHAR(45),
	CONSTRAINT PK_idEstado PRIMARY KEY(idEstado)
);

CREATE TABLE roles(
	idRol NUMERIC(10) IDENTITY(1,1),
	nombreRol VARCHAR(45),
	CONSTRAINT PK_idRol PRIMARY KEY(idRol)
);

CREATE TABLE usuarios(
	idUsuario NUMERIC(10) IDENTITY(1,1),
	idEstado NUMERIC(10),
	idRol NUMERIC(10),
	nombre VARCHAR(45),
	email VARCHAR(45) UNIQUE,
	password VARCHAR(256),
	telefono VARCHAR(45),
	direccion VARCHAR(256),
	fechaNacimiento DATE,
	fechaCreacion DATETIME,
	CONSTRAINT PK_idUsuario PRIMARY KEY(idUsuario),
	CONSTRAINT FK_idEstadoUsuario FOREIGN KEY(idEstado) REFERENCES estados(idEstado),
	CONSTRAINT FK_idRolUsuario FOREIGN KEY(idRol) REFERENCES roles(idRol)
);

CREATE TABLE categoriasProductos(
	idCategoriaProducto NUMERIC(10) IDENTITY(1,1),
	idEstado NUMERIC(10),
	nombre VARCHAR(45),
	fechaCreacion DATETIME,
	CONSTRAINT PK_idCategoriaProducto PRIMARY KEY(idCategoriaProducto),
	CONSTRAINT FK_idEstadoCategoriaProducto FOREIGN KEY(idEstado) REFERENCES estados(idEstado),
);

CREATE TABLE productos(
	idProducto NUMERIC(10) IDENTITY(1,1),
	idEstado NUMERIC(10),
	idCategoriaProducto NUMERIC(10),
	nombre VARCHAR(45),
	marca VARCHAR(45),
	codigo VARCHAR(45) UNIQUE,
	stock NUMERIC(10),
	precio FLOAT,
	fechaCreacion DATETIME,
	imagen VARCHAR(256),
	CONSTRAINT PK_idProducto PRIMARY KEY(idProducto),
	CONSTRAINT FK_idEstadoProducto FOREIGN KEY(idEstado) REFERENCES estados(idEstado),
	CONSTRAINT FK_idCategoriaProducto FOREIGN KEY(idCategoriaProducto) REFERENCES categoriasProductos(idCategoriaProducto),
);

CREATE TABLE ordenes(
	idOrden NUMERIC(10) IDENTITY(1,1),
	idEstado NUMERIC(10),
	idUsuario NUMERIC(10),
	fechaCreacion DATETIME,
	fechaEntrega DATE,
	total FLOAT,
	CONSTRAINT PK_idOrden PRIMARY KEY(idOrden),
	CONSTRAINT FK_idEstadoOrden FOREIGN KEY(idEstado) REFERENCES estados(idEstado),
	CONSTRAINT FK_idUsuarioOrden FOREIGN KEY(idUsuario) REFERENCES usuarios(idUsuario)
);

CREATE TABLE ordenesDetalles(
	idOrdenDetalle NUMERIC(10) IDENTITY(1,1),
	idProducto NUMERIC(10),
	idOrden NUMERIC(10),
	cantidad NUMERIC(10),
	precioUnitario FLOAT ,
	subtotal AS (cantidad * precioUnitario),
	CONSTRAINT PK_idOrdenDetalle PRIMARY KEY(idOrdenDetalle),
	CONSTRAINT FK_idProductoOrdenDetalle FOREIGN KEY(idProducto) REFERENCES productos(idProducto),
	CONSTRAINT FK_idOrdenOrdenDetalle FOREIGN KEY(idOrden) REFERENCES ordenes(idOrden) ON DELETE CASCADE
);
GO

--PROCEDIMIENTOS--
--ESTADOS--
CREATE PROCEDURE InsertarEstado
    @nombre VARCHAR(45)
AS
BEGIN
    BEGIN TRY
        INSERT INTO estados (nombre)
        VALUES (@nombre);
    END TRY
    BEGIN CATCH
        PRINT 'Error al insertar el estado: ' + ERROR_MESSAGE();
    END CATCH;
END;
GO

CREATE PROCEDURE ActualizarEstado
    @idEstado NUMERIC(10),
    @nombre VARCHAR(45)
AS
BEGIN
    BEGIN TRY
        UPDATE estados
        SET nombre = @nombre
        WHERE idEstado = @idEstado;
    END TRY
    BEGIN CATCH
        PRINT 'Error al actualizar el estado: ' + ERROR_MESSAGE();
    END CATCH;
END;
GO

--ROLES--
CREATE PROCEDURE InsertarRol
    @nombreRol VARCHAR(45)
AS
BEGIN
    BEGIN TRY
        INSERT INTO roles (nombreRol)
        VALUES (@nombreRol);
    END TRY
    BEGIN CATCH
        PRINT 'Error al insertar el rol: ' + ERROR_MESSAGE();
    END CATCH;
END;
GO

CREATE PROCEDURE ActualizarRol
    @idRol NUMERIC(10),
    @nombreRol VARCHAR(45)
AS
BEGIN
    BEGIN TRY
        UPDATE roles
        SET nombreRol = @nombreRol
        WHERE idRol = @idRol;
    END TRY
    BEGIN CATCH
        PRINT 'Error al actualizar el rol: ' + ERROR_MESSAGE();
    END CATCH;
END;
GO

--USUARIOS--
CREATE PROCEDURE InsertarUsuario
    @idRol NUMERIC(10),
    @nombre VARCHAR(45),
    @email VARCHAR(45),
    @password VARCHAR(256),
    @telefono VARCHAR(45),
    @direccion VARCHAR(256),
    @fechaNacimiento DATE
AS
BEGIN
    BEGIN TRY
        INSERT INTO usuarios 
        (
            idEstado, idRol, nombre, email, password, telefono, direccion, fechaNacimiento, fechaCreacion
        )
        VALUES 
        (
            1, @idRol, @nombre, @email, @password, @telefono, @direccion, @fechaNacimiento, GETDATE()
        );
    END TRY
    BEGIN CATCH
        PRINT 'Error al insertar el usuario: ' + ERROR_MESSAGE();
    END CATCH;
END;
GO

CREATE PROCEDURE ActualizarUsuario
    @idUsuario NUMERIC(10),
    @idEstado NUMERIC(10)
AS
BEGIN
    BEGIN TRY
        UPDATE usuarios
        SET 
            idEstado = @idEstado
        WHERE idUsuario = @idUsuario;
    END TRY
    BEGIN CATCH
        PRINT 'Error al actualizar el usuario: ' + ERROR_MESSAGE();
    END CATCH;
END;
GO

CREATE PROCEDURE BuscarUsuario
	@email VARCHAR(45)
AS
BEGIN
	BEGIN TRY
		SELECT idUsuario
		FROM usuarios
		WHERE email = @email
	END TRY
	BEGIN CATCH
		PRINT 'Error al buscar el usuario: ' + ERROR_MESSAGE();
	END CATCH;
END;
GO

CREATE PROCEDURE BuscarUsuarioLogin
	@email VARCHAR(45)
AS
BEGIN
	BEGIN TRY
		SELECT idUsuario, nombre, email, password, idRol
        FROM usuarios
        WHERE email = @email
	END TRY
	BEGIN CATCH
		PRINT 'Error al buscar el usuario: ' + ERROR_MESSAGE();
	END CATCH;
END;
GO	

--CATEGORIAS DE PRODUCTOS--
CREATE PROCEDURE InsertarCategoriaProducto
    @nombre VARCHAR(45)
AS
BEGIN
    BEGIN TRY
        INSERT INTO categoriasProductos (idEstado, nombre, fechaCreacion)
        VALUES (1, @nombre, GETDATE());
    END TRY
    BEGIN CATCH
        PRINT 'Error al insertar la categoría de producto: ' + ERROR_MESSAGE();
    END CATCH;
END;
GO

CREATE PROCEDURE ActualizarCategoriaProducto
    @idCategoriaProducto NUMERIC(10),
    @idEstado NUMERIC(10),
    @nombre VARCHAR(45)
AS
BEGIN
    BEGIN TRY
        UPDATE categoriasProductos
        SET 
            idEstado = @idEstado,
            nombre = @nombre
        WHERE idCategoriaProducto = @idCategoriaProducto;
    END TRY
    BEGIN CATCH
        PRINT 'Error al actualizar la categoría de producto: ' + ERROR_MESSAGE();
    END CATCH;
END;
GO

--PRODUCTOS--
CREATE PROCEDURE InsertarProducto
    @idCategoriaProducto NUMERIC(10),
    @nombre VARCHAR(45),
    @marca VARCHAR(45),
    @codigo VARCHAR(45),
    @stock NUMERIC(10),
    @precio FLOAT,
    @imagen VARCHAR(256)--URL--
AS
BEGIN
    BEGIN TRY
        INSERT INTO productos 
        (
            idEstado, idCategoriaProducto, nombre, marca, codigo, stock, precio, fechaCreacion, imagen
        )
        VALUES 
        (
            1, @idCategoriaProducto, @nombre, @marca, @codigo, @stock, @precio, GETDATE(), @imagen
        );
    END TRY
    BEGIN CATCH
        PRINT 'Error al insertar el producto: ' + ERROR_MESSAGE();
    END CATCH;
END;
GO

CREATE PROCEDURE ActualizarProducto
    @idProducto NUMERIC(10),
    @idEstado NUMERIC(10),
    @idCategoriaProducto NUMERIC(10),
    @nombre VARCHAR(45),
    @marca VARCHAR(45),
    @codigo VARCHAR(45),
    @stock NUMERIC(10),
    @precio FLOAT,
    @imagen VARCHAR(256)
AS
BEGIN
    BEGIN TRY
        UPDATE productos
        SET 
            idEstado = @idEstado,
            idCategoriaProducto = @idCategoriaProducto,
            nombre = @nombre,
            marca = @marca,
            codigo = @codigo,
            stock = @stock,
            precio = @precio,
            imagen = @imagen
        WHERE idProducto = @idProducto;
    END TRY
    BEGIN CATCH
        PRINT 'Error al actualizar el producto: ' + ERROR_MESSAGE();
    END CATCH;
END;
GO

--ORDENES Y ORDENES DETALLES--
--INSERTAR UNA ORDEN CON SUS DETALLES--
CREATE PROCEDURE InsertarOrdenConDetalles
    @idUsuario NUMERIC(10),
    @fechaEntrega DATE,
    @total FLOAT OUTPUT, 
    @detallesOrden NVARCHAR(MAX)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO ordenes (idEstado, idUsuario, fechaCreacion, fechaEntrega)
        VALUES (1, @idUsuario, GETDATE(), @fechaEntrega);

        DECLARE @idOrden NUMERIC(10);
        SET @idOrden = SCOPE_IDENTITY(); 

        DECLARE @detalles TABLE (idProducto NUMERIC(10), cantidad NUMERIC(10), precioUnitario FLOAT);

        INSERT INTO @detalles (idProducto, cantidad)
        SELECT idProducto, cantidad
        FROM OPENJSON(@detallesOrden)
        WITH (
            idProducto NUMERIC(10),
            cantidad NUMERIC(10)
        );

        DECLARE @subtotal FLOAT;
        DECLARE @totalOrden FLOAT = 0;

        DECLARE @detalle CURSOR;
        DECLARE @idProducto NUMERIC(10);
        DECLARE @cantidad NUMERIC(10);
        DECLARE @precioUnitario FLOAT;

        SET @detalle = CURSOR FOR
            SELECT idProducto, cantidad
            FROM @detalles;

        OPEN @detalle;

        FETCH NEXT FROM @detalle INTO @idProducto, @cantidad;

        WHILE @@FETCH_STATUS = 0
        BEGIN
            
            SELECT @precioUnitario = precio
            FROM productos
            WHERE idProducto = @idProducto;

            
            IF @precioUnitario IS NULL
            BEGIN

                ROLLBACK;
                PRINT 'Producto no encontrado con idProducto: ' + CAST(@idProducto AS NVARCHAR(10));
                RETURN;
            END

          
            SET @subtotal = @cantidad * @precioUnitario;
            INSERT INTO ordenesDetalles (idProducto, idOrden, cantidad, precioUnitario)
            VALUES (@idProducto, @idOrden, @cantidad, @precioUnitario);

            SET @totalOrden = @totalOrden + @subtotal;

            FETCH NEXT FROM @detalle INTO @idProducto, @cantidad;
        END;

        CLOSE @detalle;
        DEALLOCATE @detalle;

        UPDATE ordenes
        SET total = @totalOrden
        WHERE idOrden = @idOrden;

        SET @total = @totalOrden;

        COMMIT;
    END TRY
    BEGIN CATCH

        ROLLBACK;
        
        PRINT 'Error al insertar la orden y los detalles: ' + ERROR_MESSAGE();
    END CATCH;
END;
GO

--ACTUALIZAR ORDENES--
CREATE PROCEDURE ActualizarOrden
    @idOrden NUMERIC(10),
    @idEstado NUMERIC(10),
    @idUsuario NUMERIC(10),
    @fechaEntrega DATE
AS
BEGIN
    BEGIN TRY
        UPDATE ordenes
        SET 
            idEstado = @idEstado,
            idUsuario = @idUsuario,
            fechaEntrega = @fechaEntrega
        WHERE idOrden = @idOrden;
    END TRY
    BEGIN CATCH
        PRINT 'Error al actualizar la orden: ' + ERROR_MESSAGE();
    END CATCH;
END;
GO

EXEC InsertarEstado @nombre = 'ACTIVO'
EXEC InsertarEstado @nombre = 'INACTIVO'
EXEC InsertarRol	@nombreRol = 'ADMIN'
EXEC InsertarRol	@nombreRol = 'CLIENTE'
EXEC InsertarUsuario 
		@idRol = 1, 
		@nombre = 'test', 
		@email = 'test@test', 
		@password = '$2a$10$gbsMMQls07BXagaoFIxoX.OncT.3Zxbn4xVERSUTMhOVNWmoywswG', 
		@telefono = '83788378', 
		@direccion = 'Ciudad',
		@fechaNacimiento = '01/01/2000'
