import jwtAuthAxios from "../auth/jwtAuth";
import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE } from "app/utils/constants/reduxActions";
import { errorHandler } from "app/helper/apiErrorHandler";
// import { Inventory } from "@mui/icons-material";

export const categoryModifyApi = (data, cb) => {
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        jwtAuthAxios.post('category/modify', data).then((res) => {
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

export const categoryFetchListApi = (cb) => {
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        jwtAuthAxios.get('category/list').then((res) => {
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

export const categoryDeleteApi = (id, cb) => {
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        jwtAuthAxios.delete(`category/remove/${id}`).then((res) => {
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

export const timeLogModifyApi = (data, cb) => {
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        jwtAuthAxios.post(`timelog/modify`, data).then((res) => {
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

export const timeLogListApi = (data, cb) => {
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        jwtAuthAxios.post(`timelog/list`, data).then((res) => {
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

export const timelogDeleteApi = (id, cb) => {
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        jwtAuthAxios.delete(`timelog/remove/${id}`).then((res) => {
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