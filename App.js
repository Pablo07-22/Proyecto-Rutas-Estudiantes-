let rutaRegistrada = JSON.parse(localStorage.getItem('rutas')) || []
let idEditando = null

const botonRuta = document.getElementById('botonRuta')
const formulario = document.getElementById('formulario')
const ruta = document.getElementById('ruta')
const conductor = document.getElementById('conductor')
const hora = document.getElementById('hora')
const ciudad = document.getElementById('ciudad')
const Rutas = document.getElementById('Rutas')

let estudiantes = JSON.parse(localStorage.getItem('estudiantes')) || []
let idEstudianteEditando = null

const btnEstudiante = document.getElementById('btnEstudiante')
const formularioEstudiante = document.getElementById('formularioEstudiante')
const estudiante = document.getElementById('estudiante')
const email = document.getElementById('email')
const estudiantesRegistrados = document.getElementById('estudiantesRegistrados')
const rutaEstudiante = document.getElementById('rutaEstudiante')


function guardarDatos() {

    localStorage.setItem(
        'rutas',
        JSON.stringify(rutaRegistrada)
    )

    localStorage.setItem(
        'estudiantes',
        JSON.stringify(estudiantes)
    )
}
// Api 

async function obtenerClima(ciudadNombre){

    const Api = "8eddffe91dac3c79bdbd59f1a7c5ebcb"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudadNombre}&appid=${Api}&units=metric&lang=es`
    try{
        const respuesta = await fetch(url)
        const data = await respuesta.json()
        return{temperatura: data.main.temp, estado: data.weather[0].description}
    }catch(error){
        return{temperatura: "No disponible", estado: "No disponible"}
    }
}

botonRuta.addEventListener('click', async (e)=>{
    e.preventDefault()
    if(
        ruta.value.trim() === '' ||
        conductor.value.trim() === '' ||
        hora.value.trim() === '' ||
        ciudad.value.trim() === ''
    ){
        alert('Completa todos los espacios en blanco ')
        return
    }
    
    if(idEditando !== null){
        const rutaEncontrada = rutaRegistrada.find( via => via.id === idEditando)
        rutaEncontrada.ruta = ruta.value
        rutaEncontrada.conductor = conductor.value
        rutaEncontrada.hora = hora.value
        rutaEncontrada.ciudad = ciudad.value
        idEditando = null
        guardarDatos()
        botonRuta.textContent = 'Agregar Ruta'
        renderRutas()
        formulario.reset()
        return
    }
    // CLIMA
    const clima = await obtenerClima(ciudad.value)
    const nuevaRuta = {
        id: Date.now(),
        ruta: ruta.value,
        conductor: conductor.value,
        hora: hora.value,
        ciudad: ciudad.value,
        temperatura: clima.temperatura,
        estado: clima.estado,
        estudiantes: []
    }
    rutaRegistrada.push(nuevaRuta)
    guardarDatos()
    renderRutas()
    renderSeleccionarRutas()
    formulario.reset()
})
function renderSeleccionarRutas(){
    rutaEstudiante.innerHTML = `
       <option value="">Selecciona una ruta</option>
    `
    rutaRegistrada.forEach(ruta=>{
        rutaEstudiante.innerHTML += `
           <option value="${ruta.ruta}">${ruta.ruta}</option>
        `
    })
}
// MOSTRAR RUTAS
function renderRutas(){
    Rutas.innerHTML = ''
    rutaRegistrada.forEach((via)=>{
      const article = document.createElement('article')
        article.innerHTML = `
        <div class="card">
            <h2>${via.ruta}</h2>
            <p><strong>Conductor:</strong>${via.conductor}</p><p>
            <br>
            <strong>Hora:</strong>${via.hora}</p>
            <br>
            <p><strong>Ciudad:</strong>${via.ciudad}</p>
            <br>
            <p><strong>Temperatura:</strong>${via.temperatura}°C</p>
            <br>
            <p><strong>Clima:</strong>${via.estado}</p>
            <br>
            <button id="btnEditarRuta">Editar Ruta</button>
            <button id="btnEliminarRuta">Eliminar Ruta</button>
        </div>
        `
        // EDITAR RUTA
        const btnEditar =
        article.querySelector('#btnEditarRuta')
        btnEditar.addEventListener('click',()=>{
            ruta.value = via.ruta
            conductor.value = via.conductor
            hora.value = via.hora
            ciudad.value = via.ciudad
            idEditando = via.id
            botonRuta.textContent ='Guardar Cambios'
        })
        // ELIMINAR RUTA
        const btnEliminarRuta =
        article.querySelector('#btnEliminarRuta')
        
        btnEliminarRuta.addEventListener('click',()=>{
            rutaRegistrada = rutaRegistrada.filter(ruta => ruta.id !== via.id)
            estudiantes = estudiantes.filter(estudiante =>estudiante.ruta !== via.ruta)
            guardarDatos()
            renderRutas()
            renderEstudiantes()
        })
        Rutas.appendChild(article)
    })
}




renderRutas()
renderEstudiantes()
renderSeleccionarRutas()