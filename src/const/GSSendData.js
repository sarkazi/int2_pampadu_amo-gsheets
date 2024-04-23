const GSHeadersEnum = require("./GSHeadersEnum.js");

// const collectInfoStageHeaders = [
//   GSHeadersEnum.ID,
//   GSHeadersEnum.SURNAME,
//   GSHeadersEnum.NAME,
//   GSHeadersEnum.DATE_BIRTHDAY,
//   GSHeadersEnum.REGION,
//   GSHeadersEnum.PHONE,
//   GSHeadersEnum.PREVIOUS_POLIS,
//   GSHeadersEnum.BALANCE_AMOUNT,
//   GSHeadersEnum.BANK_ON_LOAN,
//   GSHeadersEnum.CHANEL,
//   GSHeadersEnum.RESPONSIBLE_EMPLOYEE,
//   GSHeadersEnum.CREATED_AT,
//   GSHeadersEnum.CALL_AT,
//   GSHeadersEnum.STATUS_AT,
//   GSHeadersEnum.FULL_NAME_CLIENT,
//   GSHeadersEnum.POLIS_PRICE,
//   GSHeadersEnum.OSZ,
//   GSHeadersEnum.DISCOUNT_DUE_TO_CV,
//   GSHeadersEnum.POLIS_TYPE,
//   GSHeadersEnum.OBJECT,
//   GSHeadersEnum.COMMENT,
//   GSHeadersEnum.POLIS_NUMBER,
//   GSHeadersEnum.PHONE_NUMBER,
//   GSHeadersEnum.BANK,
//   GSHeadersEnum.CK,
//   GSHeadersEnum.KV_PAMPADU,
//   GSHeadersEnum.KV_AGENT,
//   GSHeadersEnum.KV_KURATOR,
//   GSHeadersEnum.LEAD_ID,
//   GSHeadersEnum.LEAD_LINK,
// ];

const successStageData = [
  {
    customFieldId: 772917,
    label: "ID агента",
    name: "id",
  },
  {
    customFieldId: 772067,
    label: "Фамилия",
    name: "familya",
  },
  {
    customFieldId: 772069,
    label: "Имя",
    name: "name",
  },
  {
    customFieldId: 772071,
    label: "Год рождения",
    name: "godrojdenya",
    convertTime: true,
  },
  {
    customFieldId: 772073,
    label: "Регион",
    name: "region",
  },
  {
    customFieldId: 772075,
    label: "Номер телефона",
    name: "phone",
  },
  {
    customFieldId: 772077,
    label: "Предыдущий полис",
    name: "pred_polis",
  },
  {
    customFieldId: 772863,
    label: "Сумма остатка по кредиту",
    name: "summa_ostatka",
  },
  {
    customFieldId: 772867,
    label: "Банк по кредиту",
    name: "bank_po_kreditu",
  },
  {
    customFieldId: 772979,
    label: "Канал",
    name: "chanel",
  },
  {
    label: "Ответственный сотрудник",
    name: "otvet_sotrudnik",
  },
  {
    customFieldId: 772919,
    label: "Дата создания",
    name: "data_sozdanya",
    convertTime: true,
  },
  {
    label: "Дата создания сделки",
    name: "Дата создания сделки",
  },
  {
    customFieldId: 772921,
    label: "Дата статуса",
    name: "data_statusa",
    convertTime: true,
  },
  {
    customFieldId: 772925,
    label: "ФИО клиента",
    name: "fio_client",
  },
  {
    customFieldId: 772923,
    label: "Стоимость полиса",
    name: "stoimost_polisa",
  },
  {
    customFieldId: 772927,
    label: "ОСЗ",
    name: "osz",
  },
  {
    customFieldId: 774173,
    label: "Скидка за счет КВ",
    name: "skidka_za_schet_cv",
  },
  {
    customFieldId: 772933,
    label: "Тип полиса",
    name: "tip_polisa",
  },
  {
    customFieldId: 772935,
    label: "Объект",
    name: "object",
  },
  {
    customFieldId: 772937,
    label: "Комментарий при отказе",
    name: "commentari",
  },
  {
    customFieldId: 772939,
    label: "Номер полиса",
    name: "nomer_polisa",
  },
  {
    customFieldId: 772941,
    label: "Номер телефона",
    name: "nomer_telefona",
  },
  {
    customFieldId: 772943,
    label: "Банк",
    name: "bank",
  },
  {
    customFieldId: 772945,
    label: "СК",
    name: "ck",
  },
  {
    customFieldId: 772947,
    label: "КВ Пампаду",
    name: "kv_pompadu",
  },
  {
    customFieldId: 772949,
    label: "КВ агента",
    name: "kv_agent",
  },
  {
    customFieldId: 774113,
    label: "ID куратора",
    name: "ID куратора",
  },
  {
    label: "ID сделки",
    name: "id_lead",
  },
  {
    label: "Ссылка на сделку",
    name: "id_link",
  },
];

const noSuccessStageData = [
  {
    customFieldId: 772917,
    label: "ID агента",
    name: "id",
  },
  {
    customFieldId: 772067,
    label: "Фамилия",
    name: "familya",
  },
  {
    customFieldId: 772069,
    label: "Имя",
    name: "name",
  },
  {
    customFieldId: 772071,
    label: "Год рождения",
    name: "godrojdenya",
    convertTime: true,
  },
  {
    customFieldId: 772073,
    label: "Регион",
    name: "region",
  },
  // --
  {
    customFieldId: 772075,
    label: "Номер телефона",
    name: "phone",
  },
  {
    customFieldId: 772077,
    label: "Предыдущий полис",
    name: "pred_polis",
  },
  {
    customFieldId: 772863,
    label: "Сумма остатка по кредиту",
    name: "summa_ostatka",
  },
  {
    customFieldId: 772867,
    label: "Банк по кредиту",
    name: "bank_po_kreditu",
  },
  {
    customFieldId: 772979,
    label: "Канал",
    name: "chanel",
  },
  // --
  {
    label: "Ответственный сотрудник",
    name: "otvet_sotrudnik",
  },
  {
    customFieldId: 772919,
    label: "Дата создания",
    name: "data_sozdanya",
    convertTime: true,
  },
  {
    customFieldId: 772921,
    label: "Дата статуса",
    name: "data_statusa",
    convertTime: true,
  },
  {
    customFieldId: 772925,
    label: "ФИО клиента",
    name: "fio_client",
  },
  {
    customFieldId: 772923,
    label: "Стоимость полиса",
    name: "stoimost_polisa",
  },
  // --
  {
    customFieldId: 772927,
    label: "ОСЗ",
    name: "osz",
  },
  {
    customFieldId: 772933,
    label: "Тип полиса",
    name: "tip_polisa",
  },
  {
    customFieldId: 772935,
    label: "Объект",
    name: "object",
  },
  {
    customFieldId: 772937,
    label: "Комментарий при отказе",
    name: "commentari",
  },
  {
    customFieldId: 772939,
    label: "Номер полиса",
    name: "nomer_polisa",
  },

  {
    customFieldId: 772941,
    label: "Номер телефона",
    name: "nomer_telefona",
  },
  {
    customFieldId: 772943,
    label: "Банк",
    name: "bank",
  },
  {
    customFieldId: 772945,
    label: "СК",
    name: "ck",
  },
  {
    customFieldId: 772947,
    label: "КВ Пампаду",
    name: "kv_pompadu",
  },

  {
    customFieldId: 772949,
    label: "КВ агента",
    name: "kv_agent",
  },

  {
    label: "ID сделки",
    name: "id_lead",
  },
  {
    label: "Ссылка на сделку",
    name: "id_link",
  },
  {
    customFieldId: 774175,
    label: "Причина отказа",
    name: "Причина отказа",
  },
  {
    customFieldId: 774113,
    label: "ID куратора",
    name: "ID куратора",
  },
];

const callStageData = [
  {
    customFieldId: 772917,
    label: "ID агента",
    name: "id",
  },
  {
    customFieldId: 772067,
    label: "Фамилия",
    name: "familya",
  },
  {
    customFieldId: 772069,
    label: "Имя",
    name: "name",
  },
  {
    customFieldId: 772071,
    label: "Год рождения",
    name: "godrojdenya",
    convertTime: true,
  },
  {
    customFieldId: 772073,
    label: "Регион",
    name: "region",
  },
  {
    customFieldId: 772075,
    label: "Номер телефона",
    name: "phone",
  },
  {
    customFieldId: 772077,
    label: "Предыдущий полис",
    name: "pred_polis",
  },
  {
    customFieldId: 772863,
    label: "Сумма остатка по кредиту",
    name: "summa_ostatka",
  },
  {
    customFieldId: 772867,
    label: "Банк по кредиту",
    name: "bank_po_kreditu",
  },
  {
    customFieldId: 772979,
    label: "Канал",
    name: "chanel",
  },
  {
    label: "Ответственный сотрудник",
    name: "otvet_sotrudnik",
  },
  {
    customFieldId: 772919,
    label: "Дата создания",
    name: "data_sozdanya",
    convertTime: true,
  },
  {
    label: "Дата создания сделки",
    name: "Дата создания сделки",
  },
  {
    label: "Дата звонка",
    name: "data_zvonka",
  },
  {
    customFieldId: 772921,
    label: "Дата статуса",
    name: "data_statusa",
    convertTime: true,
  },
  {
    customFieldId: 772925,
    label: "ФИО клиента",
    name: "fio_client",
  },
  {
    customFieldId: 772923,
    label: "Стоимость полиса",
    name: "stoimost_polisa",
  },
  {
    customFieldId: 772927,
    label: "ОСЗ",
    name: "osz",
  },
  {
    customFieldId: 774173,
    label: "Скидка за счет КВ",
    name: "skidka_za_schet_cv",
  },
  {
    customFieldId: 772933,
    label: "Тип полиса",
    name: "tip_polisa",
  },
  {
    customFieldId: 772935,
    label: "Объект",
    name: "object",
  },
  {
    customFieldId: 772937,
    label: "Комментарий при отказе",
    name: "commentari",
  },
  {
    customFieldId: 772939,
    label: "Номер полиса",
    name: "nomer_polisa",
  },
  {
    customFieldId: 772941,
    label: "Номер телефона",
    name: "nomer_telefona",
  },
  {
    customFieldId: 772943,
    label: "Банк",
    name: "bank",
  },
  {
    customFieldId: 772945,
    label: "СК",
    name: "ck",
  },
  {
    customFieldId: 772947,
    label: "КВ Пампаду",
    name: "kv_pompadu",
  },
  {
    customFieldId: 772949,
    label: "КВ агента",
    name: "kv_agent",
  },
  {
    customFieldId: 774113,
    label: "ID куратора",
    name: "ID куратора",
  },
  {
    label: "ID сделки",
    name: "id_lead",
  },
  {
    label: "Ссылка на сделку",
    name: "id_link",
  },
];

const collectInfoData = [
  {
    customFieldId: 772917,
    label: "ID агента",
    name: "id",
  },
  {
    customFieldId: 772067,
    label: "Фамилия",
    name: "familya",
  },
  {
    customFieldId: 772069,
    label: "Имя",
    name: "name",
  },
  {
    customFieldId: 772071,
    label: "Год рождения",
    name: "godrojdenya",
    convertTime: true,
  },
  {
    customFieldId: 772073,
    label: "Регион",
    name: "region",
  },
  {
    customFieldId: 772075,
    label: "Номер телефона",
    name: "phone",
  },
  {
    customFieldId: 772077,
    label: "Предыдущий полис",
    name: "pred_polis",
  },
  {
    customFieldId: 772863,
    label: "Сумма остатка по кредиту",
    name: "summa_ostatka",
  },
  {
    customFieldId: 772867,
    label: "Банк по кредиту",
    name: "bank_po_kreditu",
  },
  {
    customFieldId: 772979,
    label: "Канал",
    name: "chanel",
  },
  {
    label: "Ответственный сотрудник",
    name: "otvet_sotrudnik",
  },
  {
    customFieldId: 772919,
    label: "Дата создания",
    name: "data_sozdanya",
    convertTime: true,
  },
  {
    customFieldId: 772921,
    label: "Дата статуса",
    name: "data_statusa",
    convertTime: true,
  },
  {
    customFieldId: 772925,
    label: "ФИО клиента",
    name: "fio_client",
  },
  {
    customFieldId: 772923,
    label: "Стоимость полиса",
    name: "stoimost_polisa",
  },
  {
    customFieldId: 772927,
    label: "ОСЗ",
    name: "osz",
  },
  {
    customFieldId: 772933,
    label: "Тип полиса",
    name: "tip_polisa",
  },
  {
    customFieldId: 772935,
    label: "Объект",
    name: "object",
  },
  {
    customFieldId: 772937,
    label: "Комментарий при отказе",
    name: "commentari",
  },
  {
    customFieldId: 772939,
    label: "Номер полиса",
    name: "nomer_polisa",
  },
  {
    customFieldId: 772941,
    label: "Номер телефона",
    name: "nomer_telefona",
  },
  {
    customFieldId: 772943,
    label: "Банк",
    name: "bank",
  },
  {
    customFieldId: 772945,
    label: "СК",
    name: "ck",
  },
  {
    customFieldId: 772947,
    label: "КВ Пампаду",
    name: "kv_pompadu",
  },
  {
    customFieldId: 772949,
    label: "КВ агента",
    name: "kv_agent",
  },
  {
    label: "ID сделки",
    name: "id_lead",
  },
  {
    label: "Ссылка на сделку",
    name: "id_link",
  },
];

module.exports = {
  successStageData,
  callStageData,
  collectInfoData,
  noSuccessStageData,
};
