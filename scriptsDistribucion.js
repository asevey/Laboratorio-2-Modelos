let indice =  0;

let numerosAleatorios = []; 

function main(){
    numerosAleatorios = cargarArrayNumerico();

    let cuerpoTabla = document.getElementById("tablaDetalle");

    let visitantesYDia = [];

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
        indice =  0;
        afiliadosDia = binomial(elemento.visitantes, 0.10, afiliadosDia);
        afiliadosNuevosTotales = afiliadosNuevosTotales + afiliadosDia;

        let msjVisitantes = `Visitantes: ${elemento.visitantes}`;
        let mensajeAfDia = `Número de visitantes que se registraron como afiliados: ${afiliadosDia}`;
        let msjDia = `Día: ${elemento.numDia}`;

        let fila = document.createElement("tr");
        let colMsj1 = document.createElement("td");
        let colMsj2 = document.createElement("td");
        let colMsj3 = document.createElement("td");
        colMsj1.appendChild(document.createTextNode(msjVisitantes));
        colMsj2.appendChild(document.createTextNode(mensajeAfDia));
        colMsj3.appendChild(document.createTextNode(msjDia));
        fila.appendChild(colMsj1);
        fila.appendChild(colMsj2);
        fila.appendChild(colMsj3);
        cuerpoTabla.appendChild(fila);
    });        
    let mensajeFinal = "";
    
    let afiliadosAntesDe5 = binomialNegativa(5,0.75);
    if(afiliadosAntesDe5 <= afiliadosNuevosTotales){
        mensajeFinal = mensajeFinal + `Número de afiliados nuevos antes de que se registren 5 afiliados con plan 310:   ${afiliadosAntesDe5}<br>
        Conocer esta cantidad puede ser muy valioso para la toma de decisiones, la mejora 
        de los servicios y la adaptación a las necesidades de los clientes en cada plan.`;
    }else{
        mensajeFinal = mensajeFinal + `Número de afiliados nuevos antes de que se registren 5 afiliados con plan 310:   ${afiliadosNuevosTotales}<br>
        Conocer esta cantidad puede ser muy valioso para la toma de decisiones, la mejora 
        de los servicios y la adaptación a las necesidades de los clientes en cada plan.`;   
    }
    let mensajeFinal2 = `Cantidad de días en que hubo más de 120 visitantes:   ${diasCon120}<br>
    Conocer este resultado puede ayudar a tomar decisiones informadas sobre la 
    gestión de recursos, planificación de personal, la mejora de la experiencia del cliente y la optimización de operaciones en general. `;
    let tituloConclusion = ` Conclusion final`;
    let mensajeFinal3 = `<br>Estos resultados pueden ser de mucha ayuda a la hora de identificar
    los dias que atraen a mas visitantes y en consecuencia, planificar eventos especiales, promociones o campañas de 
    marketing para aprovechar esos picos y aumentar el numero de afiliaciones. <br>
    <br>Tambien se puede programar y asignar mas o menos personal de manera más eficiente, segun la demanda 
    para mejorar la eficiencia de la atencion y controlar los costos laborales y operativos. 
    <br><br>Si el estudio revela que hay una proporción baja de visitantes que se estan afiliando al plan 310, podría indicarle que 
    deberia tomar medidas para identificar posibles obstáculos o barreras que están impidiendo que las personas se afilien y plantearse mejorar 
    los beneficios brindados o intentar retener a esos clientes con ofertas especiales, programas de incentivos u otras estrategias de marketing.<br>
    <br>Por otro lado al identificar que el plan 310 está aumentando sus afiliados, pueden ajustar sus estrategias como la asignacion 
    de más personal o recursos a la promoción y administración de este.<br>
    `;

    let divRespF = document.getElementById("divRespFinales");
    let p = document.createElement("p");
    let p2 = document.createElement("p");
    let h1 = document.createElement("h1");
    let p3 = document.createElement("p");
    p.innerHTML = mensajeFinal;
    p2.innerHTML = mensajeFinal2;
    h1.innerHTML = tituloConclusion;
    p3.innerHTML = mensajeFinal3;
    divRespF.appendChild(p);
    divRespF.appendChild(p2);
    divRespF.appendChild(h1);
    divRespF.appendChild(p3);
}

//---------------Numeros generados------------------------------
function cargarArrayNumerico(){
    let array = valoresUi.map(num => {
        return Number.parseFloat(num)
    });

    return array;
}

function devolverU(){
    if (indice >= numerosAleatorios.length) {
        indice = 0;
    }
    let u = numerosAleatorios[indice];
    indice++;
    return u; 
}

//---------------distribuciones-------------------------------
function normal(esperanza, desviacion){
    let sum = 0;
    for(let i=0; i<12; i++){
        let u = devolverU();
        sum = sum + u;
    }
    
    // let sumEntera = Math.floor(sum);
    return Math.round(desviacion*(sum - 6) + esperanza);
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