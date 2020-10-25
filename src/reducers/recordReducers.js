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
        readOnly: true,
        recordCount: Number(action.payload[5]),
        jobNumber: action.payload[1].jobnumber,
        recordType: action.payload[0],
        sequenceNumber: action.payload[6],
        creationDate: action.payload[7],
        record: {
          id: action.payload[1].id,
          // jobnumber: action.payload[1].jobnumber,
          hospitalnumber: action.payload[1].hospitalnumber,
          patientsurname: action.payload[1].patientsurname,
          patientforename: action.payload[1].patientforename,
          permission: action.payload[1].permission,
          category: action.payload[1].category,
          description: action.payload[1].description,
          photographer: action.payload[1].photographer,
          designer: action.payload[1].designer,
          quantity: action.payload[1].quantity,
          department: action.payload[3], 
          referrer: action.payload[4]
        },
        // department: action.payload[3], 
        // referrer: action.payload[4],
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
        // ...state,
        // record: action.payload[1],
        // readOnly: action.payload[0]
    case 'PREVIOUS_RECORD':
      return action.payload
    case 'UPDATE_RECORD_FIELD':
      // const field = action.payload[0] === 'user' ?
      // 'photographer' : action.payload[0]
      if (action.payload[0] === 'jobnumber') {
        return {
          ...state,
          jobNumber: action.payload[1]
        }
      } else {
        return {
          ...state,
          record: { [action.payload[0]]: action.payload[1] }
        }
      }
    case 'NEW_RECORD':
      return {
        jobNumber: action.payload[0],
        sequenceNumber: action.payload[2],
        record: {
          hospitalnumber: '',
          patientsurname: '',
          patientforename: '',
          permission: '--Please Select--',
          description: '',
          photographer: '--Please Select--',
          designer: '--Please Select--',
          department: '--Please Select--',
          referrer: '--Please Select--',
          category: '--Please Select--',
          designer: '--Please Select--',
          quantity: 0,
        },
        recordType: action.payload[1]
      }
    case 'SEARCH_BY_JOB_NUMBER':
      return {
        ...state,
        record: {
          ...action.payload[1],
          referrer: action.payload[4],
          department: action.payload[3]
        },
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