let indice =  0;

function main(){
    let cuerpoTabla = document.getElementById("tablaDetalle");
    let mensajeFinal = "";
    let mensajeDia = "";

    indice =  0;
    let visitantesDia = 0;
    let diasCon120 = 0;
    let afiliadosNuevos = 0;
    for(let dia = 1; dia <= 60; dia++){
        mensajeDia = "";
        visitantesDia = normal(100,30);
        if(visitantesDia>120){
            diasCon120++;
        }
        let visitantesNoAfiliados = 0;
        let k=0;
        for(let j=0; j < visitantesDia; j++){
            visitantesNoAfiliados = geometrica(0.1, visitantesNoAfiliados);
            if(visitantesNoAfiliados <= visitantesDia){
                if(k===0){
                    mensajeDia = mensajeDia + `Número de visitantes antes de que se registre el primer afiliado en el día ${visitantesNoAfiliados}
                    Día: ${dia}`;
                    let fila = document.createElement("tr");
                    let colMsj = document.createElement("td");
                    colMsj.appendChild(document.createTextNode(mensajeDia));
                    fila.appendChild(colMsj);
                    cuerpoTabla.appendChild(fila);
                    k++;
                }
                afiliadosNuevos++;
                j=j+(visitantesNoAfiliados+1);
            }else{
                j=visitantesDia;
            }
        }
    }
    let afiliadosAntesDe5 = binomialNegativa(5,0.75);
    if(afiliadosAntesDe5 <= afiliadosNuevos){
        mensajeFinal = mensajeFinal + `Número de afiliados nuevos antes de que se registren 5 afiliados con plan 310 ${afiliadosAntesDe5}`;
    }else{
        mensajeFinal = mensajeFinal + `Número de afiliados nuevos antes de que se registren 5 afiliados con plan 310 ${afiliadosNuevos}`;   
    }
    mensajeFinal = mensajeFinal + `\nCantidad de días en que hubo más de 120 visitantes: ${diasCon120}`;

    let divRespF = document.getElementById("divRespFinales");
    let p = document.createElement("p");
    p.innerHTML = mensajeFinal;
    divRespF.appendChild(p);
}

function normal(esperanza, desviacion){
    let sum = 0;
    for(let i=0; i<12; i++){
        u = valoresUi[indice];
        indice++;
        sum = sum + u;
    }
    return desviacion*(sum - 6) + esperanza;
}

function geometrica(probExito, visitantesNoAfiliados){
    let condicion = true;
    while(condicion){
        u = valoresUi[indice];
        indice++;
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
        u = valoresUi[indice];
        indice++;
        p = p*u;
    }
    return Math.log(p)/t;
}