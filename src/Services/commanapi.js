import axios from "axios";

export const commanapi=async(method,url,data,headers)=>{
    const confiq={
        method,
        url,
        data,
        headers:headers?headers:{"Content-Type":"application/json"}
    }
    return await axios(confiq).then((res)=>{return res}).catch((err)=>{return err})

}

