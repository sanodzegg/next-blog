type reqTypes = {
    cookies: cookies
}

type cookies = {
    user: string
}

export const getUserSession = (request:reqTypes) => {
    if(request.cookies && request.cookies.user) return true;
    else return false; 
}