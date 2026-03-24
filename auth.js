const validarToken = (req, res, next) => {
    // Reto 6: Extraemos el token de los Headers
    const token = req.headers['authorization'];

    // Reto 7: Validación con códigos de estado claros
    if (token === process.env.SECRET_TOKEN) {
        next(); // Permite el paso a la ruta
    } else {
        // Respuesta estandarizada de error (401 Unauthorized)
        res.status(401).json({ 
            success: false, 
            message: "Acceso denegado: Token inválido o ausente" 
        });
    }
};  
module.exports = validarToken;