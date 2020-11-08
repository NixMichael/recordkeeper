import axios from 'axios'
import {
  // FETCH_RECORD_REQUEST,
  FETCH_RECORD_SUCCESS,
  FETCH_RECORD_FAIL,
  FIELD_DATA_REQUEST,
  FIELD_DATA_SUCCESS,
  FIELD_DATA_FAIL,
  ENABLE_RECORD_EDIT,
  PREVIOUS_RECORD,
  UPDATE_RECORD_FIELD,
  NEW_RECORD,
  NEW_RECORD_SUBMITTED,
  UPDATED_ISSUE_LIST,
  SEARCH_BY_JOB_NUMBER,
  UPDATE_RECORD_NUMBER
} from '../CONSTANTS/RECORD_CONSTANTS'

export const fetchRecord = (whichRecord, id = 0) => async (dispatch) => {

  try {
    // dispatch({
    //   type: FETCH_RECORD_REQUEST
    // })
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

export const fetchRecordByJobNumber = (jobnumber) => async (dispatch) => {
    const { data } = await axios.get(`http://localhost:3004/search/${jobnumber}`)
    dispatch({
      type: SEARCH_BY_JOB_NUMBER,
      payload: data
    })
}

export const updateRecordNumber = (position) => {
  return {
    type: UPDATE_RECORD_NUMBER,
    payload: position
  }
}

export const fetchFieldData = () => async (dispatch) => {
  try {
    dispatch({
      type: FIELD_DATA_REQUEST
    })

    const { data } = await axios.get('http://localhost:3004/fetchFields')

    const fieldData = [data[0], data[1], data[2], data[3], data[4]]
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

export const enableRecordEdit = (toggle) => {
  return {
    type: ENABLE_RECORD_EDIT,
    payload: toggle
  }
}

export const previousRecord = (record) => {
  return {
    type: PREVIOUS_RECORD,
    payload: record
  }
}

export const updateRecordField = (field, value) => {
  return {
    type: UPDATE_RECORD_FIELD,
    payload: [field, value]
  }
}

export const newRecord = (newJobNumber, recordType, sequenceNumber) => {
  return ({
    type: NEW_RECORD,
    payload: [newJobNumber, recordType, sequenceNumber]
  })
}

export const newRecordSubmitted = (count) => {
  return ({
    type: NEW_RECORD_SUBMITTED,
    payload: count
  })
}

export const updateIssueList = (newList) => {
  return ({
    type: UPDATED_ISSUE_LIST,
    payload: newList
  })
}

export const deleteRecord = (job, recordType) => {
  try {

    axios({
      method: 'delete',
      url: 'http://localhost:3004/deleterecord',
      headers: {'Content-Type': 'application/json'},
      data: {
        job, recordType
      }
    })
  } catch (error) {
    console.log(error)
  }
}

export const fetchReport = (reportName, dateA, dateB) => async (dispatch) => {
  const { data } = await axios({
    method: 'post',
    url: 'http://localhost:3004/fetchreport',
    headers: { 'Content-Type': 'application/json' },
    data: { reportName }
  })

  const result = await axios({
    method: 'post',
    url: 'http://localhost:3004/searchrecs',
    headers: {'Content-Type': 'application/json'},
    data: {
      ...data,
      dateFrom: dateA, 
      dateTo: dateB
    }
})

  dispatch({
    type: 'LOAD_REPORT_CRITERIA',
    payload: result.data
  })
}