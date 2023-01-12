import { ApiError } from "../services/base.service";

export default class Shared {
  public static messages = {
    NO_DATA_AVAILABLE: "No data available",
  };

  public static isApiError = (error: any): error is ApiError => {
    return typeof error.error === "string" && error.isApiError === true;
  };

  public static localStorageKeys = {
    TOKEN: "token",
  };
}
