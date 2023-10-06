const contenedor = document.getElementById('contenedor');
const boton = document.getElementById('botonCalcular');
const cantidad = document.getElementById('inputCantidad');

let valoresUi = [];

function verificarDatos(){
    var x1 = (document.getElementById('semilla').value) ;
    var x2 = (document.getElementById('A').value) ;
    var x3 =  (document.getElementById('M').value) ;
    var rest = document.getElementById("cantidadGen").value;
    var semilla =parseInt(x1);
    var a = parseInt(x2);
    var m = parseInt(x3);
    var stop = parseInt(rest);

    console.log(`a: ${a} m: ${m} `);
    if(x1 =="" || x2 =="" || x3=="" ){
        alert("Por favor llene todos los campos");
        return;
    }
    carga(semilla, a, m, 1, stop);

}

function carga(semilla ,varA, varM, numeral, stop){
    if(numeral==(stop+1)){
        return;
    }
    var c1= semilla * varA
    var c2= mod(c1,varM)
    var c3= c2/varM
    c3=c3.toFixed(4)

    const tr = document.createElement('tr');
        tr.innerHTML = `
        <td scope="row">${numeral++}</th>
        <td>${semilla}</td>
        <td>${c1}</td>
        <td>${c2}</td>
        <td>${c3}</td>`

        valoresUi.push(c3);
        contenedor.appendChild(tr);
        
        carga(c2,varA ,varM, numeral, stop);
}

function mod(vC2, vM){
    if(vM > vC2)
        return vC2;
    do{
        vC2 = vC2 - vM;
    }while(vC2 > vM );

    return vC2;
}
   
 


boton.addEventListener("click",verificarDatos);
