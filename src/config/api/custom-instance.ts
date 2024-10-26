import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_GATEWAY,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = "";

    const tokenType = "Bearer";

    if (config.headers) {
      if (token) {
        config.headers.Authorization = `${tokenType} ${token}`;
      }
    }

    return config;
  },
  (error: AxiosError) => {
    // eslint-disable-next-line no-console
    console.warn(error);
  }
);

const customInstance = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const promise = axiosInstance({
    ...config,
    ...options,
  })
    .then(({ data }) => {
      if (data.isFailed) {
        throw new Error(data.errors[0]);
      } else {
        return data;
      }
    })
    .catch((error) => {
      if (typeof window !== "undefined" && Number(error?.response?.status)) {
        const expectedError =
          error?.response?.status &&
          Number(error?.response?.status) >= 400 &&
          Number(error?.response?.status) < 500;

        if (error?.response?.status === 401) {
          //   signout
        } else if (expectedError) {
          if (
            error?.code === "exception" ||
            error?.code === "ERR_BAD_REQUEST"
          ) {
            toast(error?.response?.data?.messages?.[0]?.message);
          }
        } else {
          toast("There was an error on server please try again later!");
        }
      } else if (error instanceof Error) {
        toast(error.message)
        return error
      }
      return error?.response?.data;
    });

  return promise;
};

type ErrorType<Error> = AxiosError<Error>;

type BodyType<BodyData> = BodyData;

export { axiosInstance, customInstance };
export type { BodyType, ErrorType };
