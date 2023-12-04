import {useQuery} from "react-query";
import {BaseURL, GetServerDataWithAuthorization} from "../../config/config";
import {loginStore} from "../../store";

export default function ProposalNews() {
    const {authorization, username} = loginStore()
    const {data, isLoading, isError} = useQuery(['proposal', username], () => GetServerDataWithAuthorization(BaseURL + "/news/proposal", authorization))

    return(
        <div>

        </div>
    )

}