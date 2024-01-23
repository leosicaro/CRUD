const express = require(`express`)
const app = express()
const port = 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port,()=>{
    console.log(`http://localhost:3000`)
})


let personajes = [
    { id: 1, name: 'Ryu', age: 45, country: 'Japón' },
    { id: 2, name: 'Chun-Li', age: 40, country: 'China' },
    { id: 3, name: 'Ken', age: 43, country: 'Estados Unidos' },
    { id: 4, name: 'Mike', age: 55, country: 'Tailandia' },
    { id: 5, name: 'Luke', age: 22, country: 'Estados unidos' },
];

app.get(`/`,(req,res)=>{
    res.send(`
    <h1>LISTA DE PERSONAJES</h1>
    <ul>${personajes.map((personaje)=>`<li>ID: ${personaje.id} Nombre: ${personaje.name} Edad: ${personaje.age} Nacionalidad: ${personaje.country}</li>`).join(``)}
    </ul>
    <form action="/personajes" method="post">
    <label for"name">Nombre</label>
    <input type="text" id="name" name="name" required>
    <label for"age">Edad</label>
    <input type="number" id="age" name="age" required>
    <label for"Country">Nacionalidad</label>
    <input type="text" id="country" name="country" required>
    <button type="submit">Agregar Personaje</button>

    </form>
    `)
})

app.post('/personajes', (req, res) => {
    const crearPersonaje = {
        id: personajes.length + 1,
        name: req.body.name,
        age: req.body.age,
        country: req.body.country
    };

    personajes.push(crearPersonaje);
    res.redirect('/');
});

app.get('/personajes', (req, res) => {
    res.json(personajes);
});

app.get('/personajes/:name', (req, res) => {
    const name = req.params.name;
    const character = personajes.find(u => u.name === name);
    if (!character) {
        res.status(404).json({ mensaje: 'Ese presonaje no se ha registrado todavia' });
    } else {
        res.json(character);
    }
});