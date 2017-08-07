export default {
    confirm: "У вас есть несохраненные изменения. Продолжить?",
    notFound: "Станция удалена либо еще не создана!"
};

const months = [
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август"
];

const monthsOfYear = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
]

const seasons = [
    "fall",
    "fall",
    "fall",
    "winter",
    "winter",
    "winter",
    "spring",
    "spring",
    "spring",
    "summer",
    "summer",
    "summer"
];

const seasonsOfYear = [
    "winter",
    "winter",
    "spring",
    "spring",
    "spring",
    "summer",
    "summer",
    "summer",
    "fall",
    "fall",
    "fall",
    "winter"
];

const quartersSeasons = [
    "fall",
    "winter",
    "spring",
    "summer",
    ""
];

const reportLabels = {
    title: "Отчет",
    name: "Имя",
    beginning: "На начало",
    ending: "На конец",
    q1: "КВ1 [план]",
    q2: "КВ2 [план]",
    q3: "КВ3 [план]",
    q4: "КВ4 [план]",
    year: "Год",
    selectYear: "Выберите год"
};

const stationLabels = {
    periods: [
        "КВ1", "КВ2", "КВ3", "КВ4", "ГОД"
    ],
    applyChanges: 'Сохранить изменения',
    cancelChanges: 'Отменить изменения',
    addYear: 'Добавить год',
    removeLastYear: 'Удалить последний год',
    plan: 'План',
    deviation: 'Девиация'
};

const sidebarLabels = {
    add: '+ Добавить станцию',
    report: 'Отчет'
};

const deviationLabels = {
    month: "Месяц",
    value: "Значение"
};

const planLabels = {
    periods: ["КВ1", "КВ2", "КВ3", "КВ4"]
};

const recordLabels = {
    months: "Месяц",
    hours: "Часов",
    total: "Всего",
    totalUpper: "ВСЕГО"
};

export {months, monthsOfYear, seasons, seasonsOfYear, reportLabels, quartersSeasons, stationLabels, sidebarLabels, deviationLabels, recordLabels, planLabels};