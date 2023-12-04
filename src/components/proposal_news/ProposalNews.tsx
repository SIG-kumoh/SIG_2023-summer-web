import {useQuery} from "react-query";
import {BaseURL, GetServerDataWithAuthorization, Topic} from "../../config/config";
import {loginStore} from "../../store";
import {Link} from "react-router-dom";

export default function ProposalNews() {
    const {authorization, username} = loginStore()
    const {data, isLoading, isError} = useQuery(['proposal', username], () => GetServerDataWithAuthorization(BaseURL + "/news/proposal", authorization))
    if(isLoading || isError) {
        return(
            <div></div>
        )
    }
    return(
        <div className="proposal_container">
            {data.map((e:Topic) => <ProposalCard data={e}/>)}
        </div>
    )
}

function ProposalCard({data}:{data:Topic}) {
    return(
        <div className="proposal_card">
            <Link to={"/topic-page/" + data.clusterId}>
                <div className='img_container'>
                    <img className="proposal_img" src={data.imgUrl} alt={"이미지 없음"}/>
                </div>
                <div className="proposal_title">
                    {data.title}
                </div>
            </Link>
        </div>
    )
}