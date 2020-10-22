import axios from 'axios'

export const fetchLastRec = () => async (dispatch) => {
  try {
    dispatch({
      type: 'LAST_REC_REQUEST'
    })
    const { data } = await axios.get('http://localhost:3004/lastrec')

    dispatch({
      type: 'LAST_REC_SUCCESS',
      payload: data
    })

  } catch (error) {
    dispatch({
      type: 'LAST_REC_FAIL',
      payload: error.message
    })
  }
}