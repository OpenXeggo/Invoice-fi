export const checkUserFirstTime = () => {
    let bool = localStorage.getItem("first_time");
    if (bool) return true;
    else return false;
}

export const checkIfUserExists = () => {
    return false;
}