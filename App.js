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
// Consumo de api 

async function obtenerClima(ciudadNombre){
    // contraseña de la api
    const Api = "8eddffe91dac3c79bdbd59f1a7c5ebcb"
    //url de la api 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudadNombre}&appid=${Api}&units=metric&lang=es`
    try{
        // pide el api 
        const respuesta = await fetch(url)
        // convierte la respuesta a json
        const data = await respuesta.json()
        return{temperatura: data.main.temp, estado: data.weather[0].description}
    }catch(error){
        return{temperatura: "Mal ", estado: "Mal"}
    }
}

// crear la ruta y agrega la rita 
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
    // editasr ruta
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
    // obtener clima de la ciudad ingresada
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
    // agregar la nueva ruta al arreglo de rutas registradas
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
// mostrar rutas 
function renderRutas(){
    // limpia el contenedor de rutas antes de mostrar las rutas actualizadas
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
        // furncion para editar ruta
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
        // funcion para eliminar ruta
        const btnEliminarRuta =
        article.querySelector('#btnEliminarRuta')
        
        btnEliminarRuta.addEventListener('click',()=>{
            rutaRegistrada = rutaRegistrada.filter(ruta => ruta.id !== via.id)
            // elimina estudiantes de la ruta eliminada
            estudiantes = estudiantes.filter(estudiante => estudiante.ruta !== via.ruta)
            guardarDatos()
            renderRutas()
            renderEstudiantes()
        })
        Rutas.appendChild(article)
    })
}

// crear el estudiante y agregar el estudiante a la ruta seleccionada

btnEstudiante.addEventListener('click', (e)=>{
    e.preventDefault()
    // validacion de campos vacios y correo valido
    if(estudiante.value.trim() === '' || email.value.trim() === ''){
        alert('Complete todos los espacios en blanco')
        return
    }
    if(!email.value.includes('@')){
        alert('Ingresa correo valido con @')
        return
    }
    // editar estudiante
    // si existe un id estudiante significa que se esta editando un estudiante 
    if(idEstudianteEditando !== null){
        // busca el estudiante que se esta editando
        const estudianteEnc = estudiantes.find(est => est.id === idEstudianteEditando)
        // actualiza los datos 
        estudianteEnc.estudiante = estudiante.value
        estudianteEnc.email = email.value
        idEstudianteEditando = null
        btnEstudiante.textContent = 'Agregar Estudiante'
        guardarDatos()
        renderEstudiantes()
        formularioEstudiante.reset()
        return
    }
    // funcion crear estudiante 
    const lista = {
        id: Date.now(),
        estudiante: estudiante.value,
        email: email.value,
        ruta: rutaEstudiante.value
    }
    
    estudiantes.push(lista)

    guardarDatos()
    renderEstudiantes()
    formularioEstudiante.reset()
})
//  funcion para mostrar estudiantes 
const templateEstudiante = document.createElement('template')

templateEstudiante.innerHTML = `
    <style>
        #card{
            background: #111827;
            color: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0px 4px 10px rgba(0,0,0,0.4);
            transition: 0.3s;
            margin-top: 20px;
        }
        #card:hover{
            transform: translateY(-5px);
        }
        h3{
            color: #60a5fa;
            margin-bottom: 10px;
        }
        p{
            margin: 5px 0;
        }
        .botones{
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }
        button{
            flex: 1;
            padding: 10px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-weight: bold;
        }
        #editar{
            background: #2563eb;
            color: white;
        }
        #eliminar{
            background: #dc2626;
            color: white;
        }
    </style>
    <div id="card">
        <h3 id="nombre"></h3>
        <p id="correo"></p>
        <p id="ruta"></p>
        <div class="botones">
            <button id="editar">Editar</button>
            <button id="eliminar">Eliminar</button>
        </div>
    </div>
`
// componente personalizado
class routeEstudianteCard extends HTMLElement{
    constructor(){
        super()
        // crea el shadow dom para encapsular los estilos y la estructura del componente
        this.attachShadow({mode:'open'})
        // clona el template y lo agrega al shadow dom
        const clon = templateEstudiante.content.cloneNode(true)
        this.shadowRoot.append(clon)
    }
    connectedCallback(){
        this.shadowRoot.querySelector('#nombre')
        .textContent = this.getAttribute('nombre')
        this.shadowRoot.querySelector('#correo')
        .textContent = `Correo: ${this.getAttribute('correo')}`
        this.shadowRoot.querySelector('#ruta')
        .textContent = `Ruta: ${this.getAttribute('ruta')}`
    }
}
 // define el componente personalizado para poder usarlo en el html
customElements.define('estudiante-card', routeEstudianteCard)

// funcion para mostrar estudiantes registrados
function renderEstudiantes(){
    estudiantesRegistrados.innerHTML = ''
    estudiantes.forEach((est)=>{
        const article = document.createElement('estudiante-card')
        article.setAttribute('nombre', est.estudiante)
        article.setAttribute('correo', est.email)
        article.setAttribute('ruta', est.ruta)
        // boron editar estudiante
        const btnEditar =
        article.shadowRoot.querySelector('#editar')
        btnEditar.addEventListener('click',()=>{
            estudiante.value = est.estudiante
            email.value = est.email
            rutaEstudiante.value = est.ruta
            idEstudianteEditando = est.id
            btnEstudiante.textContent = 'Guardar Cambios'
        })

        // boton eliminar estudiante
        const btnEliminar =
        article.shadowRoot.querySelector('#eliminar')
        btnEliminar.addEventListener('click',()=>{
            eliminarEstudiante(est.id)
        })
        // agrega la tarjeta al contenedor de estudiantes registrados
        estudiantesRegistrados.appendChild(article)
    })
}
// funcion eliminar estudiante
function eliminarEstudiante(id){
    // elimina estudiante del arreglo de estudiantes filtrando por id
    estudiantes = estudiantes.filter(est => est.id !== id)
    guardarDatos()
    renderEstudiantes()
    renderRutas()
}


renderRutas()
renderEstudiantes()
renderSeleccionarRutas()