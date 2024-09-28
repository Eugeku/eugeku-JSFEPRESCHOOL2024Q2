export function estimations () {
    const reviewText = `
    Ваша оценка - 70 баллов 
    Выполненные пункты:
    Score: 70 / 70 \n
        * вёрстка аудиоплеера: есть кнопка Play/Pause, кнопки "Вперёд" и "Назад" для пролистывания аудиотреков, прогресс-бар, отображается название и автор трека +5 \n
        * футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5 \n
        * есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека +5 \n
        * внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек +5 \n
        * При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10 \n
        * При смене аудиотрека меняется изображение - обложка аудиотрека +10 \n
        * Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10 \n
        * Отображается продолжительность аудиотрека и его текущее время проигрывания +10 \n
        * Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10 \n
            * Интерактивный лист всех треков (можно выбрать любой трек из списка для проигрывания) \n
            * Интерактивная кнопка включения/выключения громкости  \n
            * Кнопка loop текущий трек \n
        Total: 70/70
    `;
    console.log(reviewText);
};
