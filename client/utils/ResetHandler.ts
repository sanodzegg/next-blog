import axios from "axios"

type rqTypes = {
    headers: headers,
}

type headers = {
    cookie: string
}

export const ResetHandler = async (request:rqTypes) => {
    if(request.headers && !request.headers.cookie) return false;
    else {
        const AuthorizeCookie = async (cookie: string) => {
            const userPortion = cookie.match(/user=(.*)/);
            const userPortionExtract = userPortion && userPortion[0].replace("user=", "");
            
            const parsedCookie = userPortion !== null && cookie.replace("resetAuth=", "").replace(userPortion[0], "").replaceAll(";", "").trim();
            try {
                const req = await axios.post(`${process.env.NEXT_PUBLIC_PROXY_URL}/user/reset`, { cookie: parsedCookie, $user: userPortionExtract });
                return req.status;
            } catch (err) {
                if(err) return false;
            }
            return false;
        }
        
        const statusCode = await AuthorizeCookie(request.headers.cookie);
        return statusCode;
    }
}