const requestApi = async (url = "", option = null, errMsg = null) => {
    try{
        const response = await fetch(url, option);
        if(!response.ok){throw Error("Promjena nije uspjela, pokušajte ponovno ili osvješite stranicu")}
    }
    catch (err){
        errMsg = err.msg;
    }
    finally{
        return errMsg;
    }
}

export default requestApi