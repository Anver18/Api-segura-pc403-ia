// 1. Cargar variables de entorno solo si no estamos en la nube
if (!process.env.RENDER) {
    try {
        require('dotenv').config();
    } catch (e) {
        console.log("Archivo .env no encontrado, usando variables de entorno del sistema.");
    }
}

const express = require('express');

// --- CAMBIO CLAVE AQUÍ ---
// Como subiste 'auth.js' directamente a GitHub, quitamos la palabra 'middleware'
const validarToken = require('./auth'); 

const app = express();
app.use(express.json());

// Reto 1: Bienvenida
app.get('/', (req, res) => {
    res.status(200).json({ 
        success: true, 
        message: "Bienvenido a la API de Seguridad nivel Pro (Desplegada con éxito)" 
    });
});

// Reto 3 y 4: Login
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

// Reto 6: Rutas protegidas
app.get('/perfil', validarToken, (req, res) => {
    res.status(200).json({ 
        success: true, 
        message: "Datos del perfil obtenidos",
        data: { usuario: "Admin", nivel: "Expert" }
    });
});

// Reto 9: Puerto dinámico
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Servidor listo en el puerto ${PORT}`);
});