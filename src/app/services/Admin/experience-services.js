import jwtAuthAxios from "../auth/jwtAuth";
import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE } from "app/utils/constants/reduxActions";
import { errorHandler } from "app/helper/apiErrorHandler";

export const experienceModifyApi = (data, cb) => {
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        jwtAuthAxios.post('experience/modify', data).then((res) => {
            if (res.data.status) {
                dispatch({ type: FETCH_SUCCESS });
                dispatch({ type: SHOW_MESSAGE, payload: res.data.message });
                if (cb) cb(res.data)
            } else {
                dispatch({ type: FETCH_ERROR, payload: res.data.message });
            }
        }).catch((error) => {
            errorHandler(error, dispatch)
        })
    }
}

export const experienceFetchListApi = (cb) => {
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        jwtAuthAxios.get('experience/list').then((res) => {
            if (res.data.status) {
                dispatch({ type: FETCH_SUCCESS });
                if (cb) cb(res.data.data)
            } else {
                dispatch({ type: FETCH_ERROR, payload: res.data.message });
            }
        }).catch((error) => {
            errorHandler(error, dispatch)
        })
    }
}

export const experienceDeleteApi = (id, cb) => {
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        jwtAuthAxios.delete(`experience/remove/${id}`).then((res) => {
            if (res.data.status) {
                dispatch({ type: FETCH_SUCCESS });
                dispatch({ type: SHOW_MESSAGE, payload: res.data.message });
                if (cb) cb(res.data)
            } else {
                dispatch({ type: FETCH_ERROR, payload: res.data.message });
            }
        }).catch((error) => {
            errorHandler(error, dispatch)
        })
    }
}