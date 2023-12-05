import {useQuery} from "react-query";
import {BaseURL, GetServerDataWithAuthorization, Topic} from "../../config/config";
import {loginStore} from "../../store";
import {Link} from "react-router-dom";

export default function ProposalNews() {
    const {authorization, username} = loginStore()//TODO 요청날자 ㅅ ㅏㄱ제해야함
    const {data, isLoading, isError} = useQuery(['proposal', username], () => GetServerDataWithAuthorization(BaseURL + "/news/proposal?date=2023-12-05", authorization))
    if(isLoading || isError) {
        return(
            <div></div>
        )
    }
    return(
        <div className="proposal_container">
            {data.map((e:Topic, idx:number) => <ProposalCard key={idx} data={e}/>)}
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
                    {makeText(data.title)}
                </div>
            </Link>
        </div>
    )
}

function makeText(text:string) {
    if(text.length > 32) {
        return text.substring(0, 29) + "..."
    }
    return text
}