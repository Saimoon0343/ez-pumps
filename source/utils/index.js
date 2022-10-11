
export const toTitleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
}

export const phoneValidation = (phone) => {
    if(phone.match(/^\d+$/)){
        if(phone.length == 10 || phone.length == 11){
            return true;
        }else{
           return false;
        }
    }else{
        return false;
    }
}

export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const errorHandler = (err) => {
    let msg = "Something went wrong.";
    if(parseInt(err.response.status) === 422){
        msg =  String(Object.values(err.response.data['errors'])[0][0]);
    }else {
        msg = err.response.data.message;
    }
    return msg;
}


export const formatDate = (date, time) => {
    if(date!=="" && time!==""){
        return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
    }
    if(date !== "" && time == ""){
        return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
    }
    if(date == "" && time !== ""){
        return `${time.getHours()}:${time.getMinutes()}`;
    }

    return ""
    // return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
}
