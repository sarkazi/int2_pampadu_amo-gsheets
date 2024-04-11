module.exports = () => {
  const now = new Date();

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formattedDateTime = now.toLocaleString("ru-RU", options);

  const timeZoneOffsetInMinutes = now.getTimezoneOffset();
  const timeZoneOffsetHours = timeZoneOffsetInMinutes / 60;

  const sign = timeZoneOffsetHours > 0 ? "-" : "+";
  const hours = Math.abs(Math.floor(timeZoneOffsetHours));
  const minutes = Math.abs(timeZoneOffsetInMinutes) % 60;

  const timeZoneString = `GMT${sign}${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  return `${formattedDateTime} ${timeZoneString}`;
};
