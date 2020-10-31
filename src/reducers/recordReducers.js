import {
  FETCH_RECORD_REQUEST,
  FETCH_RECORD_SUCCESS,
  FETCH_RECORD_FAIL,
  FIELD_DATA_REQUEST,
  FIELD_DATA_SUCCESS,
  FIELD_DATA_FAIL,
  RECORD_COUNT,
  ENABLE_RECORD_EDIT,
  PREVIOUS_RECORD,
  UPDATE_RECORD_FIELD,
  UPDATED_ISSUE_LIST,
  NEW_RECORD,
  NEW_RECORD_SUBMITTED,
  SEARCH_BY_JOB_NUMBER,
  UPDATE_RECORD_NUMBER
} from '../CONSTANTS/RECORD_CONSTANTS'

export const updateCurrentRecordReducer = (state = { 
  loading: true, record: {}, recordType: '', recordCount: 0, readOnly: true }, action) => {
  switch (action.type) {
    case FETCH_RECORD_REQUEST:
      return { loading: true }
    case FETCH_RECORD_SUCCESS:
      // Set user to result from patientjobs, otherwise set to result from techjobs
      const user = action.payload[1].photographer ? action.payload[1].photographer : action.payload[1].designer

      // Set currentRecordNumber to the last record on first load. After this, it has a value of 0 or greater so remains unaffected here
      const firstLoad = state.currentRecordNumber >= 0 ? state.currentRecordNumber : action.payload[5] - 1

      return {
        loading: false,
        readOnly: true,
        recordCount: Number(action.payload[5]),
        currentRecordNumber: firstLoad,
        jobNumber: action.payload[1].jobnumber,
        recordType: action.payload[0],
        sequenceNumber: action.payload[6],
        creationDate: action.payload[7],
        record: {
          id: action.payload[1].id,
          hospitalnumber: action.payload[1].hospitalnumber,
          patientsurname: action.payload[1].patientsurname,
          patientforename: action.payload[1].patientforename,
          permission: action.payload[1].permission,
          category: action.payload[1].category,
          description: action.payload[1].description,
          user: user,
          photographer: action.payload[1].photographer,
          designer: action.payload[1].designer,
          quantity: action.payload[1].quantity,
          department: action.payload[3], 
          referrer: action.payload[4],
          issues: action.payload[2]
        }
      }
    case FETCH_RECORD_FAIL:
      return { loading: false, error: action.payload }
    case RECORD_COUNT:
      return { 
        ...state, 
        currentRecordIndex: action.payload
      }
    case ENABLE_RECORD_EDIT:
      return {
        ...state,
        readOnly: action.payload,
        newIssues: 0,
        record: { ...state.record }
      }
    case PREVIOUS_RECORD:
      return action.payload
    case UPDATE_RECORD_FIELD:
      if (action.payload[0] === 'jobnumber') {
        return {
          ...state,
          jobNumber: action.payload[1]
        }
      } else {
        return {
          ...state,
          record: { ...state.record, [action.payload[0]]: action.payload[1] }
        }
      }
    case UPDATED_ISSUE_LIST:
      return {
        ...state, newIssues: state.newIssues + 1,
        record: { ...state.record, issues: action.payload }
      }
    case NEW_RECORD:
      return {
        jobNumber: action.payload[0],
        sequenceNumber: action.payload[2],
        record: {
          hospitalnumber: '',
          patientsurname: '',
          patientforename: '',
          permission: '--Please Select--',
          description: '',
          user: '--Please Select--',
          department: '--Please Select--',
          referrer: '--Please Select--',
          category: '--Please Select--',
          issues: [],
          quantity: 0,
        },
        recordType: action.payload[1]
      }
    case NEW_RECORD_SUBMITTED:
      return {
        ...state,
        readOnly: true,
        recordCount: action.payload
      }
    case SEARCH_BY_JOB_NUMBER:
      const currentIndex = action.payload[5].findIndex(el => el.jobnumber === action.payload[1].jobnumber)

      return {
        ...state,
        record: {
          ...action.payload[1],
          referrer: action.payload[4],
          department: action.payload[3],
          issues: action.payload[0]
        },
        currentRecordNumber: currentIndex,
        recordType: action.payload[2],
        department: action.payload[3]
      }
    case UPDATE_RECORD_NUMBER:
      return {
        ...state,
        currentRecordNumber: action.payload
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