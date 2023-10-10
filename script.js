const contenedor = document.getElementById('contenedor');
const boton = document.getElementById('botonCalcular');
const cantidad = document.getElementById('inputCantidad');

let valoresUi = [];

function verificarDatos(){
    var cant = (document.getElementById('n').value) ;
    var semilla1 = (document.getElementById('x1').value) ;
    var semilla2 =  (document.getElementById('x2').value) ;
    var semilla3 =  (document.getElementById('x3').value) ;
    var x =  (document.getElementById('Xrn').value) ;
    var rest = document.getElementById("cantidadGen").value;

    var n =parseInt(cant);
    var x1 =parseFloat(semilla1);
    var x2 = parseFloat(semilla2);
    var x3 = parseFloat(semilla3);
    var Xrn= parseFloat(x);
    var stop = parseInt(rest);

    console.log(`semilla1: ${x1} semilla2: ${x2} semilla3: ${x3} `);
    if(semilla1 =="" || semilla3=="" || semilla2=="" ){
        alert("Por favor llene todos los campos");
        return;
    }

    console.log(`x1: ${x1} x2: ${x2} x3: ${x3} `);
    if(x1>n || x2>n|| x3>n ){
        alert("Por favor ingrese valores entre 0 y N");
        return;
    }

    let botonEjecutar = document.getElementById('ejecucion');
    botonEjecutar.removeAttribute('disabled');

    carga(n,x1 ,x2, x3,Xrn ,1, stop);

}
function carga(n, x1 ,x2, x3,Xrn ,numeral, stop){
    if(numeral==(stop+1)){
        return;
    }
    var Pn = Math.abs(x3-x1);
    Pn = Pn.toFixed(4);

    var FRNS = Math.abs(n-(Pn*Xrn))
    FRNS = FRNS.toFixed(4);    

    const tr = document.createElement('tr');
        tr.innerHTML = `
        <td scope="row">${numeral++}</td>
        <td>${x1}</td>
        <td>${x2}</td>
        <td>${x3}</td>
        <td>${n}</td>
        <td>${Pn}</td>
        <td>${Xrn}</td>
        <td>${FRNS}</td>`;

        valoresUi.push(FRNS);
        contenedor.appendChild(tr);
        
        carga(n, x2, x3, FRNS, Xrn, numeral, stop);
}


 


boton.addEventListener("click",verificarDatos);