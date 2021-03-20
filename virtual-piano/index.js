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

// collection.forEach((elem) => {
//     elem.addEventListener("click", (event) => {
//         event.target.classList.add("active")
//     })
// });
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