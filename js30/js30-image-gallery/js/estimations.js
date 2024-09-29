export function estimations() {
    const reviewText = `
    Выполненные пункты:
    Score: 70 / 70 \n
        * на странице есть несколько фото и строка поиска  +5 \n
        * в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс с +5 \n
        * При загрузке приложения на странице отображаются полученные от API изображения +10 \n
        * Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10 \n
        * при открытии приложения курсор находится в поле ввода +5 \n
        * есть placeholder +5 \n
        * автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5 \n
        * поисковый запрос можно отправить нажатием клавиши Enter +5 \n
        * после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5 \n
        * в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5 \n
        * Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения  +10 \n
            * Dropdown \n
            * Search button \n
            * Error message \n
        Total: 70/70
    `;
    console.log(reviewText);
};
