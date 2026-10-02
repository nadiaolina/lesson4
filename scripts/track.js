// Переменные, нужные для работы функционала
const trackButton = document.getElementById('trackButton');
const trackResult = document.getElementById('trackResult');
const trackNumber = document.getElementById('trackNumber');
const trackIdValue = document.getElementById('trackIdValue');
const trackFromValue = document.getElementById('trackFromValue');
const trackToValue = document.getElementById('trackToValue');
const trackStatusList = document.getElementById('trackStatusList');

// Основной обработчик кнопки "Отследить"
trackButton.addEventListener('click', () => {
if (!trackNumber.value || trackNumber.value === '') {
    alert('Заполните номер отправления')
}

// Временная проверка, если результат не найден
if (Number(trackNumber.value) < 1000 || Number(trackNumber.value) > 10000) {
    // скрываем блок, если показывается
    alert('К сожалению, мы не смогли найти отправление по данному номеру');
    trackResult.classList.toggle('is-visible', false);
    return;
}

// Тестовые данные по отправлению, в будущем получим ответ с бэкенда
const response = {
    id: trackNumber.value,
    route: {
        from: 'Москва, улица Арбат, 1',
        to: 'Минск, проспект Независимости, 58'
    },
    statuses: [
        {type: 'created', label: 'Создан', date: '10.01.2026'},
        {type: 'in-way', label: 'В пути: Вязьма', date: '15.01.2026'},
        {type: 'in-way', label: 'В пути: Орша', date: '16.01.2026'},
        {type: 'in-way', label: 'В пути: Минск', date: '18.01.2026'},
        {type: 'ready', label: 'Готов к выдаче', date: '25.01.2026'},
        {type: 'done', label: 'Вручен', date: '27.01.2026'}
    ]
};

// Показываем блок результата
trackResult.classList.toggle('is-visible', true);

// Заполняем основные данные
trackIdValue.textContent = `№${response.id}`;
trackFromValue.textContent = `Откуда: ${response.route.from}`;
trackToValue.textContent = `Куда: ${response.route.to}`;

// Рендерим ленту статусов
renderStatuses(response.statuses);
});

// Рендерим список статусов в ленте
function renderStatuses(statuses) {
    // Очищаем список
    trackStatusList.innerHTML = '';

    // Пересобираем список
    statuses.forEach((status) => {
        // Создаем элемент статуса
        const item = document.createElement('div');
        item.className = `track-status ${status.type}`;

        // Иконка статуса
        const icon = document.createElement('img');
        icon.className = 'track-status-icon';
        icon.src = `./images/icons/${status.type}.svg`;

        // Текстовая часть (состояние и дата)
        const text = document.createElement('div');
        text.className = 'track-status-text';

        const state = document.createElement('div');
        state.className = 'track-status-text-state';
        state.textContent = status.label;

        const date = document.createElement('div');
        date.className = 'track-status-text-date';
        date.textContent = status.date;

        // Собираем карточку статуса
        text.append(state, date);
        item.append(icon, text);
        trackStatusList.appendChild(item);
    });
}
