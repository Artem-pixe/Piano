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
