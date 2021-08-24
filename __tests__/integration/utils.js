import { v4 as uuid } from "uuid";
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const filename = `pdf-file-${uuid()}`;
