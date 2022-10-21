const urlAPI = 'http://localhost:3000';
const defaultFetchOptions = {
    mode: 'no-cors'
};
let isRecording = false;

function changeServoPosition(id, value) {
    const url = `${urlAPI}/move${id}/${value}`;
    console.log(id, value);
    console.log(`URL: ${url}`)

    fetch(url, defaultFetchOptions).then(response => console.log(response));
}

function changeServoValue(id, value) {
    const servoValue = document.querySelector(`#${id}Value`);
    servoValue.innerHTML = `${value}°`;
}

function claw(state) {
    const url = `${urlAPI}/${state}Claw`;
    console.log(`${state}Claw`)
    console.log(`URL: ${url}`)

    fetch(url, defaultFetchOptions).then(response => console.log(response));
}

function reset() {
    const url = `${urlAPI}/reset`;
    console.log(`URL: ${url}`)

    fetch(url, defaultFetchOptions).then(response => {
        console.log(response);
        window.location.reload();
    });
}

function recordMacro() {
    isRecording = !isRecording

    const url = `${urlAPI}/${isRecording ? 'startRecording' : 'stopRecording'}`;
    console.log(`URL: ${url}`)

    const macroButton = document.getElementById("macro-button");
    macroButton.innerHTML = isRecording ? 'Parar Macro' : 'Gravar Macro';

    fetch(url, defaultFetchOptions).then(response => console.log(response));
}

function sweep(id) {
    const sweepButton = document.querySelector(`#${id}Sweep`);
    const servoRange = document.querySelector(`#${id}Range`);

    if (sweepButton.classList.contains('fa-spin')) {
        sweepButton.classList.remove('fa-spin');
        servoRange.removeAttribute('disabled');
    } else {
        sweepButton.classList.add('fa-spin');
        servoRange.setAttribute('disabled', '');
    }
}