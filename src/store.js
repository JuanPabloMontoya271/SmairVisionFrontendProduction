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
  else if (action.type === 'setVisible'){
 
    return {

      ...state,
      visible: action.visible
    }
  }
  else if (action.type === 'setViewport'){
    return {
      ...state,
      viewport: action.viewport
    }
  }

  return state
}




export default createStore(reducer, {organ: '', Modality: '', idArray: '', auth_user : '',visible: '', viewport : {},Images: [{img:[{id:'', op:1}]}]});
