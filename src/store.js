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
  else if (action.type === 'auth_user'){

    return {

      ...state,
      auth_user: action.auth_user
    }
  }
  else if (action.type === 'set_Image'){
 
    return {

      ...state,
      Images: action.Images
    }
  }

  return state
}




export default createStore(reducer, {organ: '', Modality: '', idArray: '', auth_user : '', Images: [{img:[{id:'', op:1}]}]});
