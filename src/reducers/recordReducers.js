export const lastRecReducer = (state = { loading: true, record: {}, recordType: '' }, action) => {
  switch (action.type) {
    case 'LAST_REC_REQUEST':
      return { loading: true }
    case 'LAST_REC_SUCCESS':
      return { loading: false, record: action.payload[1], recordType: action.payload[0] }
    case 'LAST_REC_FAIL':
      return { loading: false, error: action.payload }
    default:
      return state
  }
}