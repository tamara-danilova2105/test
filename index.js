const dataRegex = {
    fistname: /^[\u0400-\u04FFa-zA-z]{3,30}$/u,
    tel: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10,15}$/,
    password: /(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
};

const inputs = document.querySelectorAll('input');
const pars = document.querySelectorAll('p');
const form = document.querySelector('form');

let validFields = [];

function handleValidForm(state, msg, index) {
    pars[index].textContent = state ? msg : "";
    validFields.push(state);
    if (validFields.length === inputs.length &&
        validFields.every(field => field === false)) {
        alert('спасибо, ваши данные отправлены');
    }
}

function handleValidatePassword(repeatValue, index) {
    const password = document.querySelector('#password').value;
    handleValidForm(password !== repeatValue, "пароли не совпадает", index);
}

function handleValidateDefault(value, index, regStr) {
    const regex = new RegExp(regStr);
    handleValidForm(regex.test(value) !== true, "некорректные данные", index);
}

form.addEventListener('submit', e => {
    e.preventDefault();

    validFields = [];

    inputs.forEach((input, index) => {
        if (input.name === 'repeat') {
            handleValidatePassword(input.value, index);
        } else {
            handleValidateDefault(input.value, index, dataRegex[input.name]);
        }
    });
});