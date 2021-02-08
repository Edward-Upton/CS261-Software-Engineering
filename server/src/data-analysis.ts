// This will handle sending a request to the Python code and
// expects an updated feedback field result to both save to
// the database and send to the host

import axios from "axios";
import { IField } from "./models/event";

export const analyseData = async (newValue: any, field: IField) => {
  try {
    const res = await axios.post("http://localhost:4000/emoji", { newValue, field });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
  return;
};
