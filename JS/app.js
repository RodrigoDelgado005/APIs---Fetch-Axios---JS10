// Función que carga la palabra
const cargarPalabras = async () => { 
    try { 

        // Realizamos a conexion a la API
        const respuesta = await fetch('https://random-word-api.herokuapp.com/word?lang=es'); // Realizamos la peticion a la API y obtenemos la palabra
        const datos = await respuesta.json(); 
        const palabraAleatoria = datos[0]; // Obtenemos la primera palabra del array

        // Declaramos las variables para el juego
        let palabraSecreta = palabraAleatoria.replace(/./g, "_ "); // Reemplazamos cada letra con un guión bajo y un espacio
        document.querySelector('.palabraSecreta').innerHTML = palabraSecreta; // Muestra la palabra secreta en el HTML.

        const vidasTotales = 6; // Definimos las vidas que tendra el usuario.
        let vidasRestantes = vidasTotales; // Inicializamos las vidas restantes.
        document.querySelector('.vidas').innerHTML = `Vidas restantes: ${vidasRestantes}`; // Mostramos las vidas en el HTML.

        // Función para reemplazar los caracteres del juego
        const reemplazar = (string, character, index) => { // Función para reemplazar caracteres.
            return string.substring(0, index) + character + string.substring(index + character.length);
        }

        // Función que verificar la letra ingresada
        const verificarPalabra = () => { 
            const letra = document.querySelector('input').value; // Obtenemmos la letra ingresada.
            document.querySelector('input').value = ''; // Una vez ingresada, limpiamos el campo de entrada.
            let acierto = false; // Declaramos la variable acierto y la inicializamos como false.

            // Recorremos la palabra y verificamos si la letra está presente
            for (let i = 0; i < palabraAleatoria.length; i++) { 
                if (palabraAleatoria[i] === letra) { // Si la letra coincide...
                    palabraSecreta = reemplazar(palabraSecreta, letra, i * 2); // Reemplaza el guión bajo por la letra.
                    acierto = true; // Si la letra es correcta, devuelve true ya que hubo un acierto.
                }
            }

            document.querySelector('.palabraSecreta').innerHTML = palabraSecreta; // Actualiza la palabra mostrada.

            // Resta una vida si no hay acierto y actualiza el contador de vidas
            if (!acierto) { // Si no hubo acierto
                vidasRestantes--; // Resta una vida.
                document.querySelector('.vidas').innerHTML = `Vidas restantes: ${vidasRestantes}`; // Actualiza las vidas en el HTML.
            }

            // Verifica si el jugador perdio
            if (vidasRestantes === 0) { // Si no quedan vidas
                document.querySelector('.container').innerHTML = '<h1 id="mensaje-final">Has perdido</h1>'; // Muestra el siguiente mensaje
            }

            // Verifica si el jugador gano
            if (!palabraSecreta.includes("_")) { // Si no hay más guiones bajos
                document.querySelector('.container').innerHTML = '<h1 id="mensaje-final">Has ganado</h1>'; //Muestra el siguiente mensaje
            }
        }


        document.querySelector('button').addEventListener('click', verificarPalabra); // Llama a verificarPalabra al hacer clic en el boton, para verificar la letra

    } catch (error) { // Obtiene cualquier error 
        console.log(error); // Muestra el error por consola.
    }
}

// Inicia el juego
cargarPalabras(); // Llama a la función cargarPalabras para empezar el juego.
