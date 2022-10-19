function changeServo(id, value) {
    console.log(id, value);

    const servoValue = document.querySelector(`#${id}Value`);
    servoValue.innerHTML = `${value}°`;
}