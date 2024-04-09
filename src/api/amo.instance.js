import axios from "axios";

const amoApiInstance = axios.create({
  baseURL: "https://kolenjii.amocrm.ru/api/v4",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.AMO_TOKEN}`,
  },
});

export default amoApiInstance;
