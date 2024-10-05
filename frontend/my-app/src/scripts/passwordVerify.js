
let Verify = (password, login) => {
    var validated =  true;
    if(password.length < 8 || login.length < 6 || password.length > 100 ||  login.length > 100)
        validated = false;
   /*  if(/\s/.test(password) || /\s/.test(login)){
        validated = false;
    } */
   /*  if(!/\d/.test(password))
        validated = false; */
    return validated ? true : false;
}

export { Verify};