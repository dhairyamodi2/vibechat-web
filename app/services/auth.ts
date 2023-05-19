import {AuthPostFields} from "@/app/types/types";
import {http} from "@/app/libs/http";

export const registerUser = async function(postFields : AuthPostFields) {
    try {
        const {data, status} = await http.post('/api/register', JSON.stringify(postFields))
        if(status == 400) {
            alert(data.message)
            return;
        }
        alert(JSON.stringify(data))
    } catch (e) {
        alert(e)
    }
}