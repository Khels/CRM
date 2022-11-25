import { isAxiosError } from "axios";

export const errorHandler = (error: unknown) => {
  if (isAxiosError(error)) {
    console.error(error.message);
  } else if (error instanceof Error) {
    console.log(error);
  }

  console.log("Непредвиденная ошибка!");
};
