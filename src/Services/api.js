import { commanapi } from "./commanapi"

const base_url="http://localhost:4000"

export const googlelogin=async(data)=>{
    return await commanapi("POST",`${base_url}/gologin`,data,"")
}

export const reg=async(data)=>{
    return await commanapi("POST",`${base_url}/reg`,data,"")
}

export const login=async(data)=>{
    return await commanapi("POST",`${base_url}/log`,data,"")
}

export const getuser=async(data)=>{
    return await commanapi("POST",`${base_url}/user`,data,"")
}

export const sendmessage=async(data)=>{
    return await commanapi("POST",`${base_url}/mess`,data,"",)
}

export const getmessage=async(data)=>{
    return commanapi("POST",`${base_url}/getmess`,data,"")

}
export const re_mess=async(data)=>{
    return commanapi("POST",`${base_url}/rec`,data,"")
}


