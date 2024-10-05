export function GetColour(){
    let value = document.cookie.split(/[= ]+/);
    for (let i = 0; i < value.length; i++){
        if (value[i] === `Colour`){
            if(value[i+1] === ";"){
                return " "
            }
            return value[i+1].replace(";","")
        }
    }
}
export function GetEmail(){
    let value = document.cookie.split(/[= ]+/);
    for (let i = 0; i < value.length; i++){
        if (value[i] === `Email`){
            if(value[i+1] === ";"){
                return " "
            }
            return value[i+1].replace(";","")
        }
    }
}
export function GetCredits(){
    let value = document.cookie.split(/[= ]+/);
    for (let i = 0; i < value.length; i++){
        if (value[i] === `Credits`){
            if(value[i+1] === ";"){
                return " "
            }
            return value[i+1].replace(";","")
        }
    }
}
export function GetInfo(){
    let value = document.cookie.split(/[= ]+/);
    for (let i = 0; i < value.length; i++){
        if (value[i] === `Info`){
            if(value[i+1] === ";"){
                return " "
            }
            return value[i+1].replace(";","")
        }
    }
}
export function GetUpdate(){
    let value = document.cookie.split(/[= ]+/);
    for (let i = 0; i < value.length; i++){
        if (value[i] === `Last`){
            if(value[i+1] === ";"){
                return " "
            }
            return value[i+1].replace(";","")
        }
    }
}