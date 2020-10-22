import axios from 'axios'
import {
  FETCH_RECORD_REQUEST,
  FETCH_RECORD_SUCCESS,
  FETCH_RECORD_FAIL,
  FIELD_DATA_REQUEST,
  FIELD_DATA_SUCCESS,
  FIELD_DATA_FAIL
} from '../CONSTANTS/RECORD_CONSTANTS'

export const fetchRecord = (whichRecord, id = 0) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_RECORD_REQUEST
    })
    const { data } = await axios.get(`http://localhost:3004/${whichRecord}/${id}`)

    dispatch({
      type: FETCH_RECORD_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: FETCH_RECORD_FAIL,
      payload: error.message
    })
  }
}

export const fetchFieldData = () => async (dispatch) => {
  try {
    dispatch({
      type: FIELD_DATA_REQUEST
    })

    const { data } = await axios.get('http://localhost:3004/fetchFields')

    const fieldData = [data[0], data[1], data[2], data[3]]
    dispatch({
      type: FIELD_DATA_SUCCESS,
      payload: fieldData
    })

  } catch (error) {
    dispatch({
      type: FIELD_DATA_FAIL,
      payload: error.message
    })
  }
}