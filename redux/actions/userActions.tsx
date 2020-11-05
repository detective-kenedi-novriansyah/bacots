import axios, { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import {
  LoginUserState,
  RecordUserState,
  ResetUserState,
  ValidateState,
} from "../constant";
import { UserTypes } from "../constant/userTypes";

export const requestUser = (
  data: LoginUserState,
  validate: ValidateState,
  setValidate: React.Dispatch<React.SetStateAction<ValidateState>>
) => {
  return async (dispatch: Dispatch) => {
    const response = await axios
      .post("api-token-auth/", data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Content-Type, Origin, Accept, X-Requested-With",
          "Access-Control-Allow-Methods": "POST",
        },
        timeout: 865000,
        responseType: "json",
        withCredentials: false,
        maxRedirects: 2,
        maxContentLength: 2000,
        validateStatus: (status: number) => status >= 200 && status < 300,
      })
      .then((res: AxiosResponse<any>) => {
        dispatch({
          type: UserTypes.REQUEST_USER,
          payload: {
            validate: true,
            message: res.data,
          },
        });
        setValidate({
          ...validate,
          user: {
            validate: false,
            loading: false,
          },
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("token_id", res.data.user_id);
        window.location.reload();
      })
      .catch((err: any) => {
        if (err.response.data) {
          setValidate({
            ...validate,
            user: {
              validate: true,
              loading: false,
            },
          });
          dispatch({
            type: UserTypes.USER_FAILURE,
            payload: {
              validate: false,
              message: {
                message: err.response.data.nonFieldErrors[0],
              },
            },
          });
        }
      });
    return response;
  };
};

export const recordUser = (
  data: RecordUserState,
  validate: ValidateState,
  setValidate: React.Dispatch<React.SetStateAction<ValidateState>>
) => {
  return async (dispatch: Dispatch) => {
    const response = await axios
      .post("api/v1/auths/", data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Content-Type, Origin, Accept, X-Requested-With",
          "Access-Control-Allow-Methods": "POST",
        },
        timeout: 865000,
        responseType: "json",
        withCredentials: false,
        maxRedirects: 2,
        maxContentLength: 2000,
        validateStatus: (status: number) => status >= 200 && status < 300,
      })
      .then((res: AxiosResponse<any>) => {
        dispatch({
          type: UserTypes.REQUEST_USER,
          payload: {
            validate: true,
            message: res.data,
          },
        });
        (document.getElementById("username") as HTMLInputElement).value = "";
        (document.getElementById("email") as HTMLInputElement).value = "";
        (document.getElementById("password") as HTMLInputElement).value = "";
        (document.getElementById(
          "confirm_password"
        ) as HTMLInputElement).value = "";

        setValidate({
          ...validate,
          user: {
            validate: true,
            loading: false,
          },
        });
      })
      .catch((err: any) => {
        if (err.response.data) {
          setValidate({
            ...validate,
            user: {
              validate: true,
              loading: false,
            },
          });
          dispatch({
            type: UserTypes.USER_FAILURE,
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

export const resetUser = (
  data: ResetUserState,
  validate: ValidateState,
  setValidate: React.Dispatch<React.SetStateAction<ValidateState>>
) => {
  return async (dispatch: Dispatch) => {
    const response = await axios
      .post("api/v1/auths/reset/", data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Content-Type, Origin, Accept, X-Requested-With",
          "Access-Control-Allow-Methods": "POST",
        },
        timeout: 865000,
        responseType: "json",
        withCredentials: false,
        maxRedirects: 2,
        maxContentLength: 2000,
        validateStatus: (status: number) => status >= 200 && status < 300,
      })
      .then((res: AxiosResponse<any>) => {
        dispatch({
          type: UserTypes.REQUEST_USER,
          payload: {
            validate: true,
            message: res.data,
          },
        });
        (document.getElementById("token") as HTMLInputElement).value = "";
        setValidate({
          ...validate,
          user: {
            validate: true,
            loading: false,
          },
        });
      })
      .catch((err: any) => {
        if (err.response.data) {
          setValidate({
            ...validate,
            user: {
              validate: true,
              loading: false,
            },
          });
          dispatch({
            type: UserTypes.USER_FAILURE,
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

export const loadIsAuthenticated = () => {
  return async(dispatch: Dispatch) => {
    const response = await axios.get('api/v1/user/is_authenticated/', {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Content-Type, Origin, Accept, X-Requested-With",
        "Access-Control-Allow-Methods": "GET",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      timeout: 865000,
      responseType: "json",
      withCredentials: false,
      maxRedirects: 2,
      maxContentLength: 2000,
      validateStatus: (status: number) => status >= 200 && status < 300,
    }).then((res: AxiosResponse<any>) => {
      dispatch({
        type: UserTypes.IS_AUTHENTICATED,
        payload: {
          is_authenticated: res.data
        }
      })
    })
    return response
  }
}