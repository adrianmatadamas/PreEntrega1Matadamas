function calcularCredito() {
    const monto = parseFloat(document.getElementById('monto').value);
    const interes = parseFloat(document.getElementById('interes').value) / 100;
    const plazo = parseInt(document.getElementById('plazo').value);

    if (isNaN(monto) || isNaN(interes) || isNaN(plazo)) {
        alert("Por favor, ingrese valores válidos");
        return;
    }

    const cuotaMensual = calcularCuotaMensual(monto, interes, plazo);
    mostrarResultado(cuotaMensual);
}

function calcularCuotaMensual(monto, interes, plazo) {
    const numeroPagos = plazo * 12;
    const interesMensual = interes / 12;

    // Algoritmo condicional: Verificar si el interés es mayor a cero
    if (interesMensual > 0) {
        const cuota = (monto * interesMensual) / (1 - Math.pow(1 + interesMensual, -numeroPagos));
        return cuota.toFixed(2);
    } else {
        return (monto / numeroPagos).toFixed(2);
    }
}

function mostrarResultado(cuotaMensual) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `La cuota mensual es: $${cuotaMensual}`;
}

// Algoritmo con ciclo: Mostrar tabla de amortización
function calcularTablaAmortizacion(monto, interes, plazo) {
    const numeroPagos = plazo * 12;
    const interesMensual = interes / 12;
    let saldo = monto;
    let tabla = [];

    for (let i = 0; i < numeroPagos; i++) {
        let interesPago = saldo * interesMensual;
        let principalPago = calcularCuotaMensual(monto, interes, plazo) - interesPago;
        saldo -= principalPago;
        tabla.push({
            mes: i + 1,
            pago: calcularCuotaMensual(monto, interes, plazo),
            interes: interesPago.toFixed(2),
            principal: principalPago.toFixed(2),
            saldo: saldo.toFixed(2)
        });
    }
    return tabla;
}
