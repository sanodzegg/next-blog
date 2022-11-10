import axios from "axios"
import { errorActions } from "../slices/errors-slice";
import { searchActions } from "../slices/search-slice";

export const searchFor = (term:string) => {
    return async (dispatch:any) => {
        const searchData = async (term:string) => {
            const req = await axios.get(`${process.env.NEXT_PUBLIC_PROXY_URL}/search/${term}`);
            const res = await req.data;

            if(req.status !== 200) throw new Error("Something went wrong.");

            return res;
        }

        try {
            const response = await searchData(term);
            dispatch(searchActions.setSearched(response));
        } catch(err) {
            dispatch(errorActions.ShowError(err));
        }
    }
}