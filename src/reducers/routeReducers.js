export const screenRoute = (state = 'switchboard', action) => {

  switch (action.type) {
    case 'CHOOSE_ROUTE':
      return action.payload
    default:
      return state
  }
}