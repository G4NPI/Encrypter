'use strict';
const KEYS = {
    'a': 'ai',
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'u': 'ufat'
}

const encrypt = (message) => {
    let encrypted = '';

    for(const char of message){
        for(const key in KEYS){
            if(char === key){
                encrypted += KEYS[key];
                break;
            }else if(key === 'u'){
                encrypted += char;
            }
        }
    }

    return encrypted;
}

const decrypt = (message) => {
    let decrypted = message;

    for(const key in KEYS){
        decrypted = decrypted.replace(new RegExp(KEYS[key], 'g'), key);
    }

    return decrypted;
}

const root = document.documentElement;

const input = document.getElementById('input');
const output = document.getElementById('output');

const turnBtn = document.getElementById('turn');
const cleanBtn = document.getElementById('clean');
const copyBtn = document.getElementById('copy');

let mode = true; // true: ENcrypt, false: DEcrypt

document.addEventListener('DOMContentLoaded', function(){
    this.getElementById('output').parentElement.setAttribute('data-before', 'Encrypt')
    this.getElementById('output').placeholder = 'Encryption'
    this.getElementById('output').disabled = true
})

input.addEventListener('input', () => {
    output.value = mode ? encrypt(input.value) : decrypt(input.value);

    root.style.setProperty('--mode-pos', output.value !== '' ? window.innerWidth <= 850 ? '100%' : '-100%' : '0');
    root.style.setProperty('--mode-shadow', output.value !== '' ? getComputedStyle(root).getPropertyValue('--shadow') : 'none');

    output.parentElement.style[`border${window.innerWidth <= 850 ? 'Bottom' : 'Top'}LeftRadius`] = output.value !== '' ? '0' : '8px';

    cleanBtn.style.display = input.value !== '' ? 'block' : 'none';
    copyBtn.style.display = output.value !== '' ? 'block' : 'none';
})

turnBtn.addEventListener('click', () => {
    mode = !mode ? true : false;

    output.placeholder = mode ? 'Encryption' : 'Decryption';

    output.parentElement.setAttribute('data-before', mode ? 'Encrypt' : 'Decrypt');

    if(output.value !== ''){
        const inputValue = input.value;

        input.value = output.value;
        output.value = inputValue;
    }
})

cleanBtn.addEventListener('click', () => {
    input.value = '';
    output.value = '';

    root.style.setProperty('--mode-pos', '0');
    root.style.setProperty('--mode-shadow', 'none');

    output.parentElement.style[`border${window.innerWidth <= 850 ? 'Bottom' : 'Top'}LeftRadius`] = '8px';

    cleanBtn.style.display = 'none';
    copyBtn.style.display = 'none';
})

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(output.value);
})