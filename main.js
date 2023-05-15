'use strict';
const binary = document.getElementById('binary');

let ix = 0, iy = 0;

setInterval((miliseconds, __) => {
    const bin = parseInt(__[ix], 16)
        .toString(2)
        .padStart(8, '0')

    if(iy < bin.length){
        binary.children[iy].textContent = bin[iy];
        binary.children[iy].animate({
            transform: ['translateY(-8px)', 'translateY(0)'],
            color: ['var(--ft-color-alt)', 'var(--ft-color)']
        }, miliseconds)

        iy++;
    }else{
        ix = ix < (__.length - 1) ? ++ix : 0;
        iy = 0;

        for(const child of binary.children){
            child.textContent = '0';
            child.animate({
                color: ['var(--ft-color-alt)', 'var(--ft-color)']
            }, miliseconds)
        }
    }
}, 450, 450, ['61', '6c', '75', '72', '61']);