function changeServoPosition(id, value) {
    const url = `http://localhost:3000/move${id}/${value}`;
    console.log(id, value);
    console.log(`URL: ${url}`)

    options = {
        mode: 'no-cors',
    };

    fetch(url, options).then(function (response) {console.log(response);});
}

function changeServoValue(id, value) {
    const servoValue = document.querySelector(`#${id}Value`);
    servoValue.innerHTML = `${value}°`;
}

function claw(state) {
    const url = `http://localhost:3000/${state}Claw`;
    console.log(`${state}Claw`)
    console.log(`URL: ${url}`)

    options = {
        mode: 'no-cors',
    };

    fetch(url, options).then(function (response) {console.log(response);});
}