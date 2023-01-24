//Configuracion del servidor

const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const app = express();

//Abro el puerto
const port = process.PORT || 3000;

//Habilitar los valores del body.
app.use(express.json());

//Prueba
app.get('/', (req, res) => {
    res.send('HOLA MUNDO')
})

//Crear un registro
app.post(`/post`, async(req, res) => {
    const { title, content } = req.body
    const result = await prisma.post.create({
        data: {
            title, content
        }
    });
    res.json(result)
})

//Mostrar todos los registros
app.get('/posts', async(req, res) => {
    const posts = await prisma.post.findMany()
    res.json(posts);
})

//Actualizar un registro
app.put(`/post/:id`, async(req, res) => {
    const { id } = req.params
    const { title, content } = req.body
    const post = await prisma.post.update({
        where: { id: Number(id) },
        data: { title, content }
    })
    res.json(post)
})

//Eliminar un registro
app.delete(`/post/:id`, async(req, res) => {
    const { id } = req.params
    const post = await prisma.post.delete({
        where: { id: Number(id) }
    })
    res.json('Post eliminado')
})

//Encender el servidor
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor encendido en pureto: ${port}`)
});