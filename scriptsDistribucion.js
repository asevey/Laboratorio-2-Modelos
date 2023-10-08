let indice =  0;

let numerosAleatorios = []; 
function main(){
    numerosAleatorios = cargarArrayNumerico();

    let cuerpoTabla = document.getElementById("tablaDetalle");

    let visitantesYDia = [];

    indice =  0;
    let visitantesDia = 0;
    let diasCon120 = 0;
    let afiliadosNuevosTotales = 200;

    //probar 30
    for(let dia = 1; dia <= 30; dia++){        
        visitantesDia = normal(100,30);
        if(visitantesDia>120){
            diasCon120 = diasCon120 + 1;
        }

        visitantesYDia.push({
            numDia : dia,
            visitantes : visitantesDia,
        })
        
    }

    visitantesYDia.forEach(elemento =>{
        let afiliadosDia = 0;
        afiliadosDia = binomial(elemento.visitantes, 0.25, afiliadosDia);
        afiliadosNuevosTotales = afiliadosNuevosTotales + afiliadosDia;

        let mensajeAfDia = `Número de visitantes que se registraron como afiliados: ${afiliadosDia}`;
        let msjDia = `Día: ${elemento.numDia}`;

        let fila = document.createElement("tr");
        let colMsj1 = document.createElement("td");
        let colMsj2 = document.createElement("td");
        colMsj1.appendChild(document.createTextNode(mensajeAfDia));
        colMsj2.appendChild(document.createTextNode(msjDia));
        fila.appendChild(colMsj1);
        fila.appendChild(colMsj2);
        cuerpoTabla.appendChild(fila);
    });
        
    let mensajeFinal = "";
    let afiliadosAntesDe5 = binomialNegativa(5,0.75);
    if(afiliadosAntesDe5 <= afiliadosNuevosTotales){
        mensajeFinal = mensajeFinal + `Número de afiliados nuevos antes de que se registren 5 afiliados con plan 310 ${afiliadosAntesDe5}`;
    }else{
        mensajeFinal = mensajeFinal + `Número de afiliados nuevos antes de que se registren 5 afiliados con plan 310 ${afiliadosNuevosTotales}`;   
    }
    let mensajeFinal2 = `Cantidad de días en que hubo más de 120 visitantes: ${diasCon120}`;

    let divRespF = document.getElementById("divRespFinales");
    let p = document.createElement("p");
    let p2 = document.createElement("p");
    p.innerHTML = mensajeFinal;
    p2.innerHTML = mensajeFinal2;
    divRespF.appendChild(p);
    divRespF.appendChild(p2);
}

//---------------Numeros generados------------------------------
function cargarArrayNumerico(){
    let array = valoresUi.map(num => {
        return Number.parseFloat(num)
    });

    return array;
}

function devolverU(){
    try{
        if(indice > (numerosAleatorios.length - 1)){
            throw "La cantidad de números aleatorios generados no han sido suficientes par la simulación";
        }else{
            let u = numerosAleatorios[indice];
            indice = indice + 1;
            return u; 
        }
    }
    catch(err){
        alert(err);
    }
}

//---------------distribuciones-------------------------------
function normal(esperanza, desviacion){
    let sum = 0;
    for(let i=0; i<12; i++){
        let u = devolverU();
        sum = sum + u;
    }
    
    let sumEntera = Math.floor(sum);
    return desviacion*(sumEntera - 6) + esperanza;
}

function binomial(n,probExito, va){
    va = 0;
    for(let i=0; i<=n; i++){
        let u = devolverU();
        if(u<=probExito){
            va = va + 1;
        }
    }
    return va;
}

function geometrica(probExito, visitantesNoAfiliados){
    let condicion = true;
    while(condicion){
        let u = devolverU();
        if(u <= probExito){
            condicion = false;
        }else{
            visitantesNoAfiliados++;
        }
    }
    return visitantesNoAfiliados;
}

function binomialNegativa(kexito, probFracaso){
    let p=1;
    let t= Math.log(probFracaso);
    for(let i=1; i<=kexito; i++){
        let u = devolverU();
        p = p*u;
    }
    return Math.floor(Math.log(p)/t);
}