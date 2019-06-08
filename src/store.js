import {createStore} from 'redux'


const reducer  = (state, action) =>{

  if (action.type === 'select_organ'){

    return {

      ...state,
      organ: action.organ
    }
  }
  else if (action.type === 'modality'){

    return{
      ...state,
      Modality: action.Modality
    }
  }
  else if (action.type === 'idArray') {
    return {

      ...state,
      idArray: action.idArray
    }
  }

  return state
}




export default createStore(reducer, {organ: '', Modality: '', idArray: ''});
