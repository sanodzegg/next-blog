import { useEffect, useState } from "react";

const useLocalStorage = (key:string) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        const val = localStorage.getItem(key);
        if(val) {
            setValue(val);
        }
    }, [key]);

    return value;
}

export default useLocalStorage;