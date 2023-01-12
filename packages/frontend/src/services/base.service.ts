import Shared from "../util/shared";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiResponse<T> =
  | { responses: T; success: true }
  | { error: string; success: false };

export interface ApiError {
  error: string;
  isApiError: true;
}

const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export interface BaseProps {
  bearerToken?: string;
}

export default class BaseService {
  protected bearerToken?: string;

  constructor(props: BaseProps) {
    this.bearerToken = props.bearerToken;
  }

  protected async callApi<T>(
    method: RequestMethod,
    route: string,
    urlParams?: URLSearchParams,
    requestData?: object,
    skipReadingResponseBody?: boolean
  ): Promise<T> {
    try {
      let headers: Record<string, string> = {};

      if (this.bearerToken) {
        headers = {
          Authorization: `Bearer ${this.bearerToken}`,
        };
      }

      let body: string | undefined;
      const url: string = `${process.env.REACT_APP_API_BASE_URL}${route}${
        urlParams ? "?" + urlParams.toString() : ""
      }`;

      if (requestData) {
        if (method === "GET") {
          return this.response({
            success: false,
            error: "Invalid request, GET requests cannot have a body",
          });
        }
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(requestData);
      }

      const res = await fetch(url, {
        method,
        headers,
        body,
      });
      if (res.ok) {
        try {
          if (skipReadingResponseBody) {
            return this.response({
              success: true,
              responses: "" as T,
            });
          }

          // if api returns no content
          if (res.status === 204) {
            return this.response({
              success: true,
              responses: "" as T,
            });
          }

          const resData = (await res.json()) as T;
          return this.response({
            success: true,
            responses: resData,
          });
        } catch (err) {
          return this.response({
            success: false,
            error: "failed to parse response returned by server",
          });
        }
      } else {
        if (res.status === 401) {
          localStorage.removeItem(Shared.localStorageKeys.TOKEN);
          return this.response({
            success: false,
            error: "You are signed out. Please login again!",
          });
        }

        const resError: string = await res.text();
        return this.response({
          success: false,
          error: resError
            ? resError
            : `${res.status} - ${res.statusText || "failed to call api"}`,
        });
      }
    } catch (err) {
      let errorMessage = "failed to call api";
      if (isError(err)) {
        errorMessage = `${errorMessage} - ${err.message}`;
      }
      return this.response({
        success: false,
        error: errorMessage,
      });
    }
  }

  protected response<T>(response: ApiResponse<T>) {
    if (response.success) {
      return Promise.resolve(response.responses);
    } else {
      return Promise.reject({
        error: response.error,
        isApiError: true,
      });
    }
  }
}
