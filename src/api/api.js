import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL


export const getItem = async (url,token)=>{

 try{
  const {data} =  await axios.get(`${baseUrl}${url}`,{headers:{refreshtoken:token || "hello"},withCredentials:true})

  return data
 }catch(error){
  console.log(error)
  return error
  
 }

}
export const deleteItem = async (url,token)=>{

 try{
  const {data} =  await axios.delete(`${baseUrl}${url}`,{headers:{refreshtoken:token || "hello"},withCredentials:true})

  return data
 }catch(error){
  console.log(error)
  return error
  
 }

}

export const postItem = async (url,postData,token)=>{
  try{
    const {data} = await axios.post(`${baseUrl}${url}`,postData,{headers:{refreshtoken:token || "hello"},withCredentials:true})
    return data

   }catch(error){
    console.log(error)
    return error
   }
}
export const putItem =  async (url,postData,token)=>{
  try{
    const {data} = await axios.put(`${baseUrl}${url}`,postData,{headers:{refreshtoken:token || "hello"},withCredentials:true})
    return data
   }catch(error){
    return console.log(error)
   }
}


