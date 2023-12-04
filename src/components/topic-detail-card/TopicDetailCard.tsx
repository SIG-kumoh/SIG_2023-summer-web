export default function TopicDetailCard(title:string, imgUrl:string, summary:string, words:Array<string>) {
    return(
        <div className="topic_detail_card">
            <div className="detail_card">
                <div className="topic_img_container">
                    <img className="topic_img" src={imgUrl} alt={"이미지 없음"}/>
                </div>
                <div className="topic_text">
                    <div className="topic_title">{title}</div>
                    <div className="topic_summary_content">{summary.length === 0 ? "요약문 없음" : summary}</div>
                    <div className="topic_words_container">
                        {words.map((e,idx) =>
                            <div className="topic_word" key={idx}>
                                #{e}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}