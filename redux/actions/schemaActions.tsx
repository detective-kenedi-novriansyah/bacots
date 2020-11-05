import axios, { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { SchemaTypes } from "../constant/schemaTypes";

export const fetchSchema = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios
      .get("api/v1/schema/", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
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
          type: SchemaTypes.LOAD_SCHEMA,
          payload: {
            schema: res.data,
          },
        });
      })
      .catch((err: any) => {
        dispatch({
          type: SchemaTypes.SCHEMA_FAILURE,
          payload: {
            message: err.response.data.detail,
          },
        });
      });
    return response;
  };
};
