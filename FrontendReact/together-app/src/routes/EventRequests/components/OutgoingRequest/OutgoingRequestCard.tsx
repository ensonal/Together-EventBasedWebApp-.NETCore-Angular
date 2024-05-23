import { useEffect, useState } from "react"
import { getOutgoingRequest  } from "../../../../api/services/RequestManagementService"
export function OutgoingRequestCard() {
    const [request, setRequest] = useState()

    useEffect(() => {
        getOutgoingRequest().then((response) => {
            setRequest(response)
        })
    }, [])

    console.log("Outgoing Request: ", request)

    return(
        <div>
            
        </div>
    )
}