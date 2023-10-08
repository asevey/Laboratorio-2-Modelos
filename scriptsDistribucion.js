let indice =  0;

let numerosAleatorios = []; 
function main(){
    numerosAleatorios = cargarArrayNumerico();

    let cuerpoTabla = document.getElementById("tablaDetalle");
    
    let mensajeDia = "";

    let visitantesYDia = [];
    //let primerosVisitantesNoAfiliados = [];

    indice =  0;
    let visitantesDia = 0;
    let diasCon120 = 0;
    let afiliadosNuevosTotales = 200;

    //probar 30
    for(let dia = 1; dia <= 5; dia++){
        //alert("Primer for");
        
        visitantesDia = normal(100,30);
        if(visitantesDia>120){
            diasCon120 = diasCon120 + 1;
        }

        visitantesYDia.push({
            numDia : dia,
            visitantes : visitantesDia,
        })
        
    }

    //alert(`Visitantes: ${visitantesYDia[0].visitantes}\nDía: ${visitantesYDia[0].numDia}\n`);

    visitantesYDia.forEach(elemento =>{
        let afiliadosDia = 0;
        //alert(`Visitantes: ${elemento.visitantes}\ndía: ${elemento.numDia}`);
        afiliadosDia = binomial(elemento.visitantes, 0.25, afiliadosDia);
        //alert("afiliados día: " + afiliadosDia);
        afiliadosNuevosTotales = afiliadosNuevosTotales + afiliadosDia;
        //alert("afiliados totales: " + afiliadosNuevosTotales);

        mensajeDia = `Número de visitantes que se registraron como afiliados: ${afiliadosDia}\nDía: ${elemento.numDia}`;
        alert(mensajeDia);

        let fila = document.createElement("tr");
        let colMsj = document.createElement("td");
        colMsj.appendChild(document.createTextNode(mensajeDia));
        fila.appendChild(colMsj);
        cuerpoTabla.appendChild(fila);
    });

        //============---------------------================================
        //visitantesNoAfiliados = geometrica(0.1, visitantesNoAfiliados);
        //while(j < elemento.visitantesDia){}
            
            /* if(visitantesNoAfiliados <= visitantesDia){
                if(k===0){
                    primerosVisitantesNoAfiliados.push({
                        vna : visitantesNoAfiliados,
                        dia: elemento.dia,
                    });
                    //mensajeDia = mensajeDia + `Número de visitantes antes de que se registre el primer afiliado en el día ${visitantesNoAfiliados}\nDía: ${dia}`;
                    //alert(mensajeDia);

                    //let fila = document.createElement("tr");
                    //let colMsj = document.createElement("td");
                    //colMsj.appendChild(document.createTextNode(mensajeDia));
                    //fila.appendChild(colMsj);
                    //cuerpoTabla.appendChild(fila);
                    k++;
                }
                afiliadosNuevos++;
                j=j+(visitantesNoAfiliados+1);
            }else{
                j=visitantesDia;
            }

            
        
    }); */

        
    let mensajeFinal = "";
    let afiliadosAntesDe5 = binomialNegativa(5,0.75);
    if(afiliadosAntesDe5 <= afiliadosNuevosTotales){
        mensajeFinal = mensajeFinal + `Número de afiliados nuevos antes de que se registren 5 afiliados con plan 310 ${afiliadosAntesDe5}`;
    }else{
        mensajeFinal = mensajeFinal + `Número de afiliados nuevos antes de que se registren 5 afiliados con plan 310 ${afiliadosNuevosTotales}`;   
    }
    mensajeFinal = mensajeFinal + `Cantidad de días en que hubo más de 120 visitantes: ${diasCon120}`;

    let divRespF = document.getElementById("divRespFinales");
    let p = document.createElement("p");
    p.innerHTML = mensajeFinal;
    divRespF.appendChild(p);
}

//---------------Numeros generados------------------------------
function cargarArrayNumerico(){
    let array = valoresUi.map(num => {
        //alert("Pasamos por el map");
        return Number.parseFloat(num)
    });

    return array;
}


//---------------distribuciones-------------------------------
function normal(esperanza, desviacion){
    //alert("En distribución NORMAL");
    let sum = 0;
    for(let i=0; i<12; i++){
        let u = numerosAleatorios[indice];
        indice = indice + 1;
        sum = sum + u;
    }
    let sumEntera = Math.floor(sum);
    return desviacion*(sumEntera - 6) + esperanza;
}

function binomial(n,probExito, va){
    //alert("En distribución BINOMIAL");
    va = 0;
    for(let i=0; i<=n; i++){
        let u = numerosAleatorios[indice];
        if(u<=probExito){
            va = va + 1;
        }
        indice = indice + 1;
    }
    return va;
}

function geometrica(probExito, visitantesNoAfiliados){
    //alert("En distribución GEOMETRICA");
    let condicion = true;
    while(condicion){
        let u = numerosAleatorios[indice];
        indice = indice + 1;
        if(u <= probExito){
            condicion = false;
        }else{
            visitantesNoAfiliados++;
        }
    }
    //alert("visitantes no afiliados: " + visitantesNoAfiliados);
    return visitantesNoAfiliados;
}

function binomialNegativa(kexito, probFracaso){
    alert("En distribución BIN NEG");
    let p=1;
    let t= Math.log(probFracaso);
    for(let i=1; i<=kexito; i++){
        let u = numerosAleatorios[indice];
        indice = indice + 1;
        p = p*u;
    }
    return Math.floor(Math.log(p)/t);
}