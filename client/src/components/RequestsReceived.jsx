import { BASE_URL } from "../utils/constants"

const RequestReceived = ()=>{

    const fetchRequest = async ()=>{
        const response = await fetch(BASE_URL+"user/requests/received",{
            credentials: "include",
        })
        const data = response.json();
        if(!response.ok){
            throw new Error(data.error || "something went wrong")
        }
        
    }


    return (
        <h1>Request Received</h1>
    )
}