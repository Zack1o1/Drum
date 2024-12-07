import { bank1, bank2 } from "./banks.js";

const keys = document.querySelectorAll(".keys");
const screenKey = document.getElementById('screen-key')
const volumeControl = document.getElementById('volume')
const volumeLabel = document.querySelector(".volume-label");
const power = document.getElementById('power')
const powerSlider = document.getElementById('power-slider')
const switchBank = document.getElementById('switch-bank')
const switchSlider = document.getElementById('switch-slider')


let isPowerOn = true;
let activeBank = bank1;
let volumeLevel = 0.5;



// on off
power.addEventListener('click',()=>{
    isPowerOn = !isPowerOn
    powerSlider.classList.toggle('toggle-off')
    keys.forEach((key)=>{
            key.classList.toggle('disabled')
    })
    screenKey.classList.toggle('disabled')
    switchBank.classList.toggle('disabled')
    volumeLabel.classList.toggle('disabled-text')
    volumeControl.disabled = !isPowerOn ? true : false
    // console.log(isPowerOn)
})

// switch bank
switchBank.addEventListener('click', ()=>{
    switchSlider.classList.toggle('toggle-off')
    if(activeBank === bank1) return activeBank = bank2
    activeBank = bank1
})

// volume control
volumeControl.addEventListener('input', ()=>{
    volumeLevel = volumeControl.value/100
    // console.log(volume.value)
})

// to play single sound
const playSound = (keyPressed) =>{
    if(!isPowerOn) return;
    const bankItem = activeBank.find(bank => bank.keyPressed === keyPressed)
    if(bankItem){
        const audio = new Audio(bankItem.links)
        audio.play()
        screenKey.textContent = bankItem.name
    }
}

// to play multiple sound
const playMultipleSound = (keysPressed) =>{
    keysPressed.forEach(keyPressed => playSound(keyPressed))
}

// play sound when clicked
keys.forEach((key)=>{
    key.addEventListener('click',()=>{
        const keyPressed = key.getAttribute('data-key')
        playSound(keyPressed.toLowerCase())

    })
})

// track keys and set is used as set removes the duplicate elements and has has() method
// which is helpful in this senerio as i want to keep track which key is pressed and 
// and if one or more keys are pressed at a time then add
// so when key is pressed it is added to the set first and when key pressed is released then
// key is delete 
// set feature which uniqueness provide here that no duplicates element are stored

let activekeys = new Set()

// key pressed by keyboard
document.addEventListener('keydown', (e)=>{
   if(!activeBank.find(bank => bank.keyPressed === e.key)) return

    if(!activekeys.has(e.key)){
        activekeys.add(e.key)
        playMultipleSound([...activekeys])
    }
    console.log(activekeys)
})
document.addEventListener('keyup', (e)=>{
    activekeys.delete(e.key)
})


