import axios from 'axios';

// export const getCertain = async (blogid:number, key:string) => {
//     const response = await axios.get(`https://www.googleapis.com/blogger/v3/blogs/${blogid}?key=${key}`);
//     return await response.data;
// }

export const getAll = async () => {
    const response = await axios.get(`/api/users`);
    return await response.data;
}
