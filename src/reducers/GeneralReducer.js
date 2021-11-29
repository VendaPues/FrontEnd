const initialState = {
  email: "",
  userLogged: false,
};

function loginValidator(state = initialState, action) {
  switch (action.type) {
    case "VALIDATE_LOGIN":
      return {
        ...state,
        userLogged: action.payload,
      };
    default:
      return state;
  }
}

export default loginValidator;
