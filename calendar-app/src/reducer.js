import * as Actions from './actions'

const initialState ={
  month: '0'
}

const monthId = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_MONTH:
      return {
        ...state,
        month: action.monthId
      };
    default:
      return state;
  }
}

export default monthId;
