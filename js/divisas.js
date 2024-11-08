const API_URL_BASE = 'https://openexchangerates.org/api/';
const API_APP_ID = 'dfb828d69fbd4142982558925a6ef21b';
const API_MXN_CURRENCY = 'MXN';
var pesos_a_dolares = true;

window.onload = function () {
    actualizarImagenesMonedas();
};

function intercambiarTipoConversion() {
    pesos_a_dolares = !pesos_a_dolares;
    actualizarImagenesMonedas();
}

function actualizarImagenesMonedas() {
    var titulo = document.getElementById('h1_titulo');
    var img1 = document.getElementById('img1');
    var img2 = document.getElementById('img2');
    if (pesos_a_dolares) {
        titulo.innerText = "Conversor de divisas pesos mexicanos a dólares";
        img1.src = '/Images/peso_mexa.png';
        img2.src = '/Images/dollar_ame.png';
    } else {
        titulo.innerText = "Conversor de divisas dólares a pesos mexicanos";
        img1.src =  'Images/dollar_ame.png';
        img2.src = '/Images/peso_mexa.png';
    }
}

function convertir(event) {
    event.preventDefault(); // Evitar recargar la página

    let importe = parseFloat(document.getElementById('txt_importe').value);
    let res = document.getElementById('txt_resultado');
    let txtasa = document.getElementById('txt_tasa');
    console.log('pesos_a_dolares:', pesos_a_dolares);

    let request = new XMLHttpRequest();
    request.open('GET', API_URL_BASE + 'latest.json?app_id=' + API_APP_ID, true);
    
    request.onerror = function () {
        console.log('Error al consumir la API');
        alert('Error al consumir la API');
    };

    request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
            var data = JSON.parse(this.response);
            console.log(data);
            var tasa = parseFloat(data.rates[API_MXN_CURRENCY]);

            if (!isNaN(importe) && importe > 0.0 && !isNaN(tasa) && tasa > 0.0) {
                txtasa.value = tasa.toFixed(2);
                if (pesos_a_dolares) {
                    res.value = (importe / tasa).toFixed(2);
                } else {
                    res.value = (importe * tasa).toFixed(2);
                }
            } else {
                alert("No se pudo obtener la tasa de cambio correctamente.");
            }
        } else {
            alert("No se pueden consultar las tasas de cambio");
        }
    };

    request.send();
}
