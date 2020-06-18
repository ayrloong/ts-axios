import { AxiosRequestConfig,AxiosPromise,AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'
import { resolve } from 'dns'
import { head } from 'shelljs'

export default function xhr (config:AxiosRequestConfig): AxiosPromise {

    return new Promise(resolve =>{

    const { data=null,url,method = 'get',headers,responseType} = config
    

    const request = new XMLHttpRequest()
    
    if(responseType){
        request.responseType= responseType
    }

    request.open(method.toUpperCase(),url,true)
    
    request.onreadystatechange = function handleLoad(){
        if(request.readyState!==4){
            return
        }
    
    const responseHeaders = parseHeaders(request.getAllResponseHeaders())
    const responseData = responseType && responseType !== 'text'? request.response :request.responseText
    const response : AxiosResponse = {
        data :responseData,
        status:request.status,
        statusText:request.statusText,
        headers:responseHeaders,
        config,
        request
    }
      resolve(response)
    }

    Object.keys(Headers).forEach(name=>{
        if(data ===null && name.toLowerCase()==='content-type'){
            delete headers[name]
        }else{
            request.setRequestHeader(name,headers[name])
        }
    })

    request.send(data)    
   })
    
}