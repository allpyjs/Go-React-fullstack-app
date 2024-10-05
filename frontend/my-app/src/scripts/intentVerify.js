
let Intent = (json) => {

    if (json.intent === "error"){
        document.cookie = "Email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "Colour=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
        console.log(json)
        

    }else if(json.intent === "success"){
        console.log(json)

    }else if(json.intent === "colour"){
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 30);
        document.cookie = `Colour=${json.colour}; expires=${expireDate}`;
        document.cookie = `Email=${json.email}; expires=${expireDate}`;

    }else if(json.intent === "setInfo"){
        document.cookie = `Credits=${json.credits}`;
        document.cookie = `Info=${json.info}`;
        document.cookie = `Last=${json.last}`;
    } 
}

export {Intent};