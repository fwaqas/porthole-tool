document.getElementById('thickness').oninput = enableCalculate;
document.getElementById('depth').oninput = enableCalculate;
document.querySelectorAll('input[name="material"]').forEach(item => {
    item.addEventListener('change', enableCalculate);
});

function enableCalculate() {
    let thickness = document.getElementById('thickness').value;
    let depth = document.getElementById('depth').value;
    let materialSelected = document.querySelector('input[name="material"]:checked');

    if (thickness && depth && materialSelected) {
        document.getElementById('calculate').disabled = false;
    } else {
        document.getElementById('calculate').disabled = true;
    }
}

document.getElementById('calculate').onclick = function () {
    let thickness = parseFloat(document.getElementById('thickness').value);
    let depth = parseFloat(document.getElementById('depth').value);
    let material = document.querySelector('input[name="material"]:checked').value;

    let density = 1033;
    let g = 9.81;
    let D = 2.75;

    let pressure = density * g * depth;

    let stress = (pressure * D * D) / (2 * D * thickness - thickness * thickness);

    let materialStrength = 0;
    if (material == "glass") {
        materialStrength = 1000;
    } else if (material == "acrylic") {
        materialStrength = 120;
    }

    let resultMessage = '';
    if (stress <= materialStrength) {
        resultMessage = 'Success, depth achieved!';
        document.getElementById('whale-sound').play();
    } else {
        resultMessage = 'Failure, current thickness is insufficient!';
        let requiredThickness = (pressure * D * D) / (2 * D * materialStrength);

        resultMessage += ' You need at least ' + requiredThickness.toFixed(2) + 'm thickness.';
        document.getElementById('water-sound').play();
    }
    document.getElementById('result').innerText = resultMessage;
}