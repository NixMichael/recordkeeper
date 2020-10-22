import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../styles/recordStyles.scss'
import Loader from '../../components/Loader'
import { fetchLastRec } from '../../actions/recordActions'

const PatientUpper = () => {

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(fetchLastRec())
  // }, [dispatch])

  const lastRec = useSelector(state => state.lastRec)
  const { loading, record } = lastRec

  let jobnumber = 0
  let photographer = '--Please Select--'

  if (!loading) {
    jobnumber = record.jobnumber
    photographer = record.photographer
  }

  const handleChange = (e) => {
    console.log('Change')
  }

  return (
    <div className='patient-record-component patient-record-upper'>
      <div>
        <label>Job Number: </label>
        <input type='text' name='jobnumber' value={jobnumber} onChange={(e) => handleChange(e.target.name)}/>
      </div>
      <div>
        <label>Photographer: </label>
        <select name='photographer' value={photographer} onChange={(e) => handleChange(e.target.name)}>
          <option disabled value='--Please Select--'>--Please Select--</option>
          <option value='David Randall'>David Randall</option>
        </select>
      </div>
    </div>
  )
}

export default PatientUpper