// const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// if (prefersDarkScheme.matches) {
//   document.body.classList.add("dark-theme");
// } else {
//   document.body.classList.remove("dark-theme");
// }

const theme = {
  theme: "dark"
}


export const uiReducer = (state = theme, action) => {
    switch (action.type) {
      case "CHANGE_USER_THEME":
        return { ...state, theme: action.payload };  
      default:
        return state;
    }
  };