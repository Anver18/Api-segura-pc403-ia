// dotenv
if (!process.env.RENDER) {
    require('dotenv').config();
}

const express = require('express');
// Asegúrate de que la ruta a tu middleware sea correcta (minúsculas/mayúsculas)
const validarToken = require('./middleware/auth'); 
const app = express();

app.use(express.json());

// Rutas 
app.get('/', (req, res) => {
    res.status(200).json({ 
        success: true, 
        message: "Bienvenido a la API de Seguridad nivel Pro (En la Nube)" 
    });
});

app.post('/login', (req, res) => {
    const { usuario, password } = req.body;
    // Render leerá estas variables desde el panel 'Environment'
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
app.get('/perfil', validarToken, (req, res) => {
    res.status(200).json({ 
        success: true, 
        message: "Datos del perfil obtenidos",
        data: { usuario: "Admin", nivel: "Expert" }
    });
});
// Puerto Dinámico 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});