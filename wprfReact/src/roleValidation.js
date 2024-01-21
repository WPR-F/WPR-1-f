export const roleValidation = async (navigate, isLoggedIn, isrole) => {
    if (!isLoggedIn) {
        console.log("not logged in");
        navigate("/login");
    }
    else if (!isrole) {
        console.log("not role");
        navigate("/profielpagina");
    }
}
    
