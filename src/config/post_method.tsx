import {BaseURL} from "./config";

export async function PostLogout(authorization: string) {
    return await fetch(BaseURL + "/auth/logout", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${authorization}`
        }
    })
}