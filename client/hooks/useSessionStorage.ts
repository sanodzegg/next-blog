import { useEffect, useState } from "react";

const useSessionStorage = (key:string) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        const val = sessionStorage.getItem(key);
        if(val) {
            setValue(val);
        }
    }, [key]);

    return value;
}

export default useSessionStorage;