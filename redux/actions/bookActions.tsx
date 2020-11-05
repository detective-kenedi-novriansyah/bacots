import axios, { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { BookOptionsProps } from "../../bundles/components/navbar/basenavbar";
import { ValidateState } from "../constant";
import { BookTypes } from "../constant/bookSchema";

export const fetchBook = (
  validate: ValidateState,
  setValidate: React.Dispatch<React.SetStateAction<ValidateState>>
) => {
  return async (dispatch: Dispatch) => {
    const response = await axios
      .get("api/v1/book/", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers":
            "Content-Type, Origin, Accept, X-Requested-With",
        },
        timeout: 856000,
        responseType: "json",
        withCredentials: false,
        maxRedirects: 5,
        maxContentLength: 2000,
        validateStatus: (status: number) => status >= 200 && status < 300,
      })
      .then((res: AxiosResponse<any>) => {
        dispatch({
          type: BookTypes.L_BOOK,
          payload: {
            loadingScreen: false,
            book: res.data,
          },
        });
      })
      .catch((err: any) => {
        if (err.response.data) {
          setValidate({
            ...validate,
            book: {
              validate: true,
              loading: false,
            },
          });
          dispatch({
            type: BookTypes.BOOK_FAILURE,
            payload: {
              validate: false,
              message: err.response.data.detail,
            },
          });
        }
      });
    return response;
  };
};

export const recordBook = (
  data: FormData,
  validate: ValidateState,
  setValidate: React.Dispatch<React.SetStateAction<ValidateState>>
) => {
  return async (dispatch: Dispatch) => {
    const response = await axios
      .post("api/v1/book/", data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers":
            "Content-Type, Origin, Accept, X-Requested-With, Authorization",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        timeout: 856000,
        responseType: "json",
        withCredentials: false,
        maxRedirects: 5,
        maxContentLength: 2000,
        validateStatus: (status: number) => status >= 201 && status < 300,
      })
      .then((res: AxiosResponse<any>) => {
        setValidate({
          ...validate,
          book: {
            loading: false,
            validate: true,
          },
        });
        dispatch({
          type: BookTypes.RECORD_BOOK,
          payload: {
            validate: true,
            book: res.data.book,
            message: res.data,
          },
        });
      })
      .catch((err: any) => {
        if (err.response.data) {
          setValidate({
            ...validate,
            book: {
              validate: true,
              loading: false,
            },
          });
          dispatch({
            type: BookTypes.BOOK_FAILURE,
            payload: {
              validate: false,
              message: err.response.data.detail,
            },
          });
        }
      });
    return response;
  };
};

export const retrieveBook = (
  data: FormData,
  validate: ValidateState,
  setValidate: React.Dispatch<React.SetStateAction<ValidateState>>
) => {
  return async (dispatch: Dispatch) => {
    const response = await axios
      .post("api/v1/book/retrieve/", data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers":
            "Content-Type, Origin, Accept, X-Requested-With",
        },
        timeout: 856000,
        responseType: "json",
        withCredentials: false,
        maxRedirects: 5,
        maxContentLength: 2000,
        validateStatus: (status: number) => status >= 200 && status < 300,
      })
      .then((res: AxiosResponse<any>) => {
        setValidate({
          ...validate,
          book: {
            validate: true,
            loading: false,
          },
        });
        dispatch({
          type: BookTypes.RTR_BOOK,
          payload: {
            validate: true,
            book: res.data.book,
            id: res.data.book.id,
          },
        });
      })
      .catch((err: any) => {
        if (err.response.data) {
          setValidate({
            ...validate,
            book: {
              validate: true,
              loading: false,
            },
          });
          dispatch({
            type: BookTypes.BOOK_FAILURE,
            payload: {
              validate: false,
              message: err.response.data.detail,
            },
          });
        }
      });
    return response;
  };
};

export const destroyerBook = (
  pk: number,
  validate: ValidateState,
  setValidate: React.Dispatch<React.SetStateAction<ValidateState>>,
  options: BookOptionsProps,
  setOptions: React.Dispatch<React.SetStateAction<BookOptionsProps>>
) => {
  return async (dispatch: Dispatch) => {
    const response = await axios
      .delete(`api/v1/book/${pk}/`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "DELETE",
          "Access-Control-Allow-Headers":
            "Content-Type, Origin, Accept, X-Requested-With",
          "Access-Control-Allow-Origin": "*",
        },
        timeout: 865000,
        responseType: "json",
        withCredentials: false,
        maxRedirects: 5,
        maxContentLength: 2000,
        validateStatus: (status: number) => status >= 200 && status < 300,
      })
      .then((res: AxiosResponse<any>) => {
        setValidate({
          ...validate,
          book: {
            validate: true,
            loading: false,
          },
        });
        setOptions({
          ...options,
          pk: -1,
          loading: false,
        });
        dispatch({
          type: BookTypes.DSTRY_BOOK,
          payload: {
            validate: true,
            id: pk,
            message: res.data,
          },
        });
      })
      .catch((err: any) => {
        if (err.response.data) {
          setOptions({
            ...options,

            loading: false,
          });
          setValidate({
            ...validate,
            book: {
              validate: true,
              loading: false,
            },
          });
          dispatch({
            type: BookTypes.BOOK_FAILURE,
            payload: {
              validate: false,
              message: {
                message: err.response.data.detail,
              },
            },
          });
        }
      });
    return response;
  };
};
