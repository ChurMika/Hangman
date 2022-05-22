import { WORDS } from './hangman_words.js'

const board = document.querySelector('.hangman_word')
const HEADER = document.querySelector('.hangman_header')
const KEYBOARD = document.querySelector('.hangman_keyboard')
const COUNT = document.querySelector('.hangman_counter')

const ALPHABET = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я']

let word = WORDS[Math.floor(Math.random()*WORDS.length)]

let wordSize = word.length
let counter = new Set(word).size + 7
COUNT.innerHTML = `У Вас осталось ${counter} попыток` 

for (let i = 0; i < word.length; i++) {
    const letters = document.createElement('div')
    letters.classList.add('hangman_letters')

    const letter = document.createElement('p')
    letter.classList.add('hangman_letter', 'noactive')
    
    board.append(letters)
    letters.append(letter)
    letter.append(word[i])
}

const LETTER = document.querySelectorAll('.hangman_letter')

ALPHABET.forEach(function(item) {
    let ltr = document.createElement('div')
    ltr.classList.add('ltr')
    ltr.innerHTML = `${item}`
    KEYBOARD.append(ltr)
})

const LTR = document.querySelectorAll('.ltr')

LTR.forEach(function(item) {
    item.addEventListener('click', function(el) {
        item.classList.add('ltr-used')

        for (let k = 0; k < word.length; k++) {
            if (el.target.innerHTML === word[k].toUpperCase() && counter > 0) {
                LETTER[k].classList.remove('noactive')
                wordSize--
            } 
        }

        counter--
        COUNT.innerHTML = `У Вас осталось ${counter} попыток`

        if (counter === 0) {
            HEADER.innerHTML = `ТЫ ПОВЕШЕН!`
            COUNT.innerHTML = `Было загадано слово <span>${word.toLocaleUpperCase()}</span>`
            KEYBOARD.remove()
        }

        if (wordSize === 0) {
            HEADER.innerHTML = `Поздравляю, ты избежал виселицы!`
            COUNT.remove()
            KEYBOARD.remove()
        }
    })
})

   