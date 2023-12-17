import axios from 'axios'
import { useState, useEffect } from 'react'
export const CustomProducts = (header,url) => {
    const [response, setResponse] = useState({
        isloading: false,
        data: [],
        message: {
            error: false,
            message: ''
        }
    })
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        let responsedata;
        (async () => {
            try {
                setResponse({ ...response, message: { error: false, message: '' }, isloading: true })
                if (header.type==='GET') {
                    responsedata = await axios.get(url, { signal: signal })
                } else if(header.type==='POST') {
                    responsedata = await axios.post(url, { signal: signal,data:'' })
                }
                console.log(responsedata);
                setResponse({ ...response, data: responsedata.data.data, isloading: false })
            } catch (error) {
                if (axios.isAxiosError(error)) return
                setResponse({ ...response, message: { error: true, message: error.message }, isloading: false })
            }
        })();
        // memory clean 
        return () => {
            controller.abort();
        }
    }, [])
    return [response];
}

// export default CustomProducts;