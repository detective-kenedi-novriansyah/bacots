import axios, { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { HandsomeProps } from "../../bundles/routes";
import { ValidateState } from "../constant";
import { SubscribeRequestState } from "../constant";
import { SubscribeTypes } from "../constant/subcribeTypes";

export const requestSubscribe = (
  data: SubscribeRequestState,
  validate: ValidateState,
  setValidate: React.Dispatch<React.SetStateAction<ValidateState>>,
  handsome: HandsomeProps,
  setHandsome: React.Dispatch<React.SetStateAction<HandsomeProps>>
) => {
  return async (dispatch: Dispatch) => {
    const response = await axios
      .post("api/v1/subscribe/", data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Content-Type, Origin, Accept, X-Requested-With",
        },
        timeout: 865000,
        responseType: "json",
        withCredentials: false,
        maxRedirects: 5,
        maxContentLength: 2000,
        validateStatus: (status: number) => status >= 200 && status < 300,
      })
      .then((res: AxiosResponse<any>) => {
        dispatch({
          type: SubscribeTypes.REQUEST_SUBDCRIBE,
          payload: {
            validate: true,
            message: res.data,
          },
        });
        setValidate({
          ...validate,
          book: {
            validate: false,
            loading: false,
          },
          user: {
            validate: false,
            loading: false,
          },
          subscribe: {
            validate: true,
            loading: false,
          },
        });
        const v = document.getElementById("token") as HTMLInputElement;
        v.value = "";
        if (res.data.message.toString() === "active") {
          setHandsome({
            ...handsome,
            active: true,
            open: true,
          });
        }
      })
      .catch((err: any) => {
        if (err.response) {
          setValidate({
            ...validate,
            book: {
              validate: false,
              loading: false,
            },
            user: {
              validate: false,
              loading: false,
            },
            subscribe: {
              validate: true,
              loading: false,
            },
          });
          dispatch({
            type: SubscribeTypes.SUBSCRIBE_FAILURE,
            payload: {
              validate: false,
              message: err.response.data.message
                ? err.response.data
                : {
                    message: err.response.data.detail,
                  },
            },
          });
        }
      });
    return response;
  };
};
