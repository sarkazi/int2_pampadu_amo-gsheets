const timeDisplayVariantsEnum = {
  DATE: "date",
  TIME: "time",
  GMT: "gmt",
};

const formatDateTimeUtil = ({ display, timestamp }) => {
  const date = timestamp ? new Date(timestamp * 1000) : new Date();

  const options = {
    timeZone: "Europe/Moscow",
  };

  if (display.includes(timeDisplayVariantsEnum.DATE)) {
    options.year = "numeric";
    options.month = "2-digit";
    options.day = "2-digit";
  }

  if (display.includes(timeDisplayVariantsEnum.TIME)) {
    options.hour = "2-digit";
    options.minute = "2-digit";
    options.second = "2-digit";
    options.hour12 = false;
  }

  let timeZoneString = null;

  const formattedDateTime = date.toLocaleString("ru-RU", options);

  if (display.includes(timeDisplayVariantsEnum.GMT)) {
    const timeZoneOffsetInMinutes = date.getTimezoneOffset();
    const timeZoneOffsetHours = timeZoneOffsetInMinutes / 60;

    const sign = timeZoneOffsetHours > 0 ? "-" : "+";
    const hours = Math.abs(Math.floor(timeZoneOffsetHours));
    const minutes = Math.abs(timeZoneOffsetInMinutes) % 60;

    timeZoneString = `GMT${sign}${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }

  return `${formattedDateTime}${timeZoneString ? ` ${timeZoneString}` : ""}`;
};

module.exports = {
  formatDateTimeUtil,
  timeDisplayVariantsEnum,
};
