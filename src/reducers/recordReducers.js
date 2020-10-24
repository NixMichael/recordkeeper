import {
  FETCH_RECORD_REQUEST,
  FETCH_RECORD_SUCCESS,
  FETCH_RECORD_FAIL,
  FIELD_DATA_REQUEST,
  FIELD_DATA_SUCCESS,
  FIELD_DATA_FAIL
} from '../CONSTANTS/RECORD_CONSTANTS'

export const updateCurrentRecordReducer = (state = { 
  loading: true, record: {}, recordType: '', readOnly: true }, action) => {
  switch (action.type) {
    case FETCH_RECORD_REQUEST:
      return { loading: true }
    case FETCH_RECORD_SUCCESS:
      return {
        loading: false, 
        record: action.payload[1], 
        recordType: action.payload[0], 
        department: action.payload[3], 
        referrer: action.payload[4],
        recordCount: Number(action.payload[5]),
        readOnly: true
      }
    case FETCH_RECORD_FAIL:
      return { loading: false, error: action.payload }
    case 'RECORD_COUNT':
      return { 
        ...state, 
        currentRecordIndex: action.payload
      }
    case 'ENABLE_RECORD_EDIT':
      return {
        ...state,
        readOnly: action.payload
      }
    case 'UPDATE_RECORD_FIELD':
      console.log('field:', action.payload[0], 'value:', action.payload[1])
      return {
        ...state,
        record: { [action.payload[0]]: action.payload[1] }
      }
    case 'SEARCH_BY_JOB_NUMBER':
      return {
        ...state,
        record: action.payload[1],
        recordType: action.payload[2],
        department: action.payload[3]
      }
    default:
      return state
  }
}

export const fieldDataReducer = (state = { loading: true, fieldContent: []}, action) => {
  switch (action.type) {
    case FIELD_DATA_REQUEST:
      return { loading: true }
    case FIELD_DATA_SUCCESS:
      return { loading: false, fieldContent: action.payload }
    case FIELD_DATA_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}