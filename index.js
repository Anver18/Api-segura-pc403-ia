require('dotenv').config();
const express = require('express');
const validarToken = require('./middleware/auth');
const app = express();
app.use(express.json()); // Para que la API entienda JSON
// Rutas publicas 
// Reto 1: Bienvenida estandarizada
app.get('/', (req, res) => {
    res.status(200).json({ 
        success: true, 
        message: "Bienvenido a la API de Seguridad nivel Pro" 
    });
});
// Reto 3 y 4: Login con Token y Códigos HTTP
app.post('/login', (req, res) => {
    const { usuario, password } = req.body;

    if (usuario === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
        res.status(200).json({ 
            success: true, 
            message: "Inicio de sesión exitoso", 
            token: process.env.SECRET_TOKEN 
        });
    } else {
        res.status(401).json({ 
            success: false, 
            message: "Usuario o contraseña incorrectos" 
        });
    }
});
// Reto 6 rutas protegidas centralización
// Usar el mismo middleware 'validarToken' para ambas puertas
app.get('/perfil', validarToken, (req, res) => {
    res.status(200).json({ 
        success: true, 
        message: "Datos del perfil obtenidos",
        data: { usuario: "Admin", nivel: "Expert" }
    });
});
app.get('/configuracion', validarToken, (req, res) => {
    res.status(200).json({ 
        success: true, 
        message: "Sección de ajustes del sistema",
        data: { tema: "Dark Mode", lenguaje: "ES" }
    });
});
// Reto 9: Puerto dinámico
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor listo en http://localhost:${PORT}`);
});