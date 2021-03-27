const piano = document.querySelector('.piano');

// вешаем событие на родительский элемент !!!(паттерн делегирование)!!!
piano.addEventListener('click', (event) => {
    console.log('Clicked on piano btn = ', event.target);

    // проверка является ли наш элемент, который создает событие, клавишей пианино
    if (event.target.dataset && event.target.dataset.note) {
        const audioName = event.target.dataset.note;
        const context = new AudioContext();

        let yodelBuffer;

        fetch(`./assets/audio/${ audioName }.mp3`)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                yodelBuffer = audioBuffer;
            }).then(() => {
                play(yodelBuffer, context);
            });
    }
});

function play(audioBuffer, context) {
    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start();
}
 ////////////////////My code
const collection = document.querySelectorAll(".piano-key")

const addActive = (event) => {
    event.target.classList.add("active");
}
const removeActive = (event) => {
    event.target.classList.remove("active");
}
const startMouseover = (event) => {
    event.target.classList.add("active")
    collection.forEach((elem) => {
        elem.addEventListener("mouseover", addActive)
        elem.addEventListener("mouseout", removeActive)
    });
}

const stoptMouseover = (event) => {
    collection.forEach((elem) => {
        elem.classList.remove("active");
        elem.removeEventListener("mouseover", addActive)
        elem.removeEventListener("mouseout", removeActive)
    });
}

piano.addEventListener("mousedown", startMouseover);  
piano.addEventListener("mouseup", stoptMouseover);

/*full screen */
const fullScreen = document.querySelector(".fullscreen");

fullScreen.addEventListener("click", toggleFullScreen);

function toggleFullScreen () {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.fullscreenEnabled) {
            document.exitFullscreen();  
        }
    }
}

/* active piano button when we push correct letter */
    window.addEventListener("keydown", letterSound);
    window.addEventListener("keyup", removeLettersAnimation);
    function letterSound(e) {
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        const pianoKey = document.querySelector(`.piano-key[data-key="${e.keyCode}"]`);
        if(!audio) return;
        audio.play();
        audio.currentTime = 0;
        pianoKey.classList.add("active");
        
    }
    
    function removeLettersAnimation(e) {
        const pianoKey = document.querySelector(`.piano-key[data-key="${e.keyCode}"]`);
        pianoKey.classList.remove("active");
    }

    