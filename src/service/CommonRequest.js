
import axios from "axios";

// define CommonRequest function

export const CommonRequest= async(method,url,body)=>{

// api request configuraton

    let reqConfig={
        method,
        url,
        data:body,
        headers:{
            "content-type":"application/json"
        }
    }

    // api call using axios

    return await axios(reqConfig).then((response)=>{
        return response
    }).catch((err)=>{
        return err
    })
    


}