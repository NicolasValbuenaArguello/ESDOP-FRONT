
dodocument.getElementById("enviar").addEventListener("click", funcion);
export function funcion() {
    
  alert("hola")  
}
function respuesta_datos(data){
 alert(data)
}
document.getElementById("enviar").addEventListener("click", enviar_datos);
async function cargar_datos(url_datos_cargar, metodo) {

    fetch(url_datos_cargar, {
      method: metodo,
      body:  new FormData(dataForm),
    //   headers:{
    //               'Content-Type':'application/x-www-form-urlencoded',   
    //           }
  }).then(res=>res.json())
  .then(data=> respuesta_datos(data))

}
async function enviar_datos() {
await cargar_datos("http://172.22.2.36:5030/cargar", "POST");

}