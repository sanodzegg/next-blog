import axios from "axios"

type rqTypes = {
    headers: headers,
}

type headers = {
    cookie: string
}

export const ResetHandler = (request:rqTypes) => {
    if(request.headers && request.headers.cookie) {
        const AuthorizeCookie = async (cookie: string) => {
            const parseCookie = cookie.replace("resetAuth=", "");
            const req = await axios.post(`${process.env.NEXT_PUBLIC_PROXY_URL}/user/reset`, { cookie: parseCookie })
            const res = await req.status;
            if(res === 401) return false;
        }

        AuthorizeCookie(request.headers.cookie);
    }
}