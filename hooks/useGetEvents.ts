import axios from "axios";
import Cookies from "js-cookie"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { tweetsMapDataType } from "@/types/types";
import { useEventsPost } from "./usePostEvent";

export let useGetEvents = () => {
    let router = useRouter()
    let {didLoad}=useEventsPost()
    let [incData, setIncData] = useState<tweetsMapDataType[]>()
    let [isLoading,setIsLoading]=useState<boolean>()
    let [voteData, setVoteData] = useState([]);
    let cookie=Cookies?.get('user')
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': cookie,
        'Key': process.env.NEXT_PUBLIC_KEY
    }
    let handleGet = async () => {
        try {
            setIsLoading(true)
            if (cookie) {
                let res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/getEvents`,{headers});
                setIncData(res.data.data);
                setVoteData(res.data.voteData);
            }
            else router.push('/'); 
        }
        catch (e: any) {
            console.log(e.message)
        }
        finally{
            setIsLoading(false)
        }
    }
    return {handleGet,incData,isLoading,didLoad, voteData}
}