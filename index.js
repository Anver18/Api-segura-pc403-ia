// Intentar cargar dotenv solo si existe el archivo (evita errores en Render)
try {
    require('dotenv').config();
} catch (error) {
    console.log("Corriendo sin archivo .env (modo producción)");
}
const express = require('express');
const validarToken = require('./middleware/auth');
const app = express();
app.use(express.json());
// Rutas públicas
// Reto 1: Bienvenida
app.get('/', (req, res) => {
    res.status(200).json({ 
        success: true, 
        message: "Bienvenido a la API de Seguridad nivel Pro" 
    });
});
// Reto 3 y 4: Login
app.post('/login', (req, res) => {
    const { usuario, password } = req.body;
// Validación usando las variables que ya configuraste en el panel de Render
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
// Rutas protegidas reto 6
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
    console.log(`Servidor listo y escuchando en el puerto ${PORT}`);
});
