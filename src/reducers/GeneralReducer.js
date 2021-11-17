const initialState = {
  email: "",
  userLogged: false,
};

export default function (state = initialState, action) {
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
