"use strict";
const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const button = document.querySelector('button');

button.addEventListener("click", function addTask() {
    removeError(inputBox);
    if (inputBox.value === '') {
        createError(inputBox, 'Введите текст')
    }
    else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = `\u00d7`;
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
});

function createError(input, text) {
    const parent = input.parentNode;
    const errorLabel = document.createElement('label');
    errorLabel.classList.add('error-label');
    errorLabel.textContent = text;
    parent.classList.add('error');
    parent.after(errorLabel);
}

function removeError(input) {
    const parent = input.parentNode;
    if (parent.classList.contains('error')) {
        document.querySelector('.error-label').remove();
        parent.classList.remove('error');
    }
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveData();
    }
}, false)


function saveData() {
    localStorage.setItem("data", listContainer.innerHTML)
}

function showList() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showList();