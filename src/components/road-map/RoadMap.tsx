import { TreevizReact } from 'treeviz-react';

interface ClusterNode {
    centroid_id: number,
    title: string,
    parent_cluster_id: number | null,
}

const dummyCluster: Array<ClusterNode> = [
    {centroid_id: 94865, title: "바느질 나눔 봉사’ 김도순·곽경희씨 LG의인상", parent_cluster_id: null},
    {centroid_id: 94866, title: "기적의 생환’ 봉화 광부 “다시, 첫 생일", parent_cluster_id: 94865},
    {centroid_id: 94867, title: "등산로 순찰’ 인생 2막 연 퇴직 경찰", parent_cluster_id: 94865},
    {centroid_id: 94868, title: "이종석 헌재소장 인사청문회 13일 열린다", parent_cluster_id: 94865},
    {centroid_id: 94869, title: "독거노인·장애인 돕는 소상공인에…LG유플러스, 3년째 ‘적층 나눔’ 실천", parent_cluster_id: 94866},
    {centroid_id: 94870, title: "CJ그룹 창립 70주년…이재현 회장 “온리원 정신 재건” 주문", parent_cluster_id: 94866},
    {centroid_id: 94871, title: "SK넥실리스 “압도적 기술로 ‘초박형 동박’ 광폭 생산”", parent_cluster_id: 94866},
    {centroid_id: 94872, title: "삼성 일가, 상속세 내려 주식 2조6천억원 매각", parent_cluster_id: 94867},
    {centroid_id: 94873, title: "LG디스플레이, 초대형 투명 OLED 테이블…스타벅스 인테리어 혁신[포토뉴스]", parent_cluster_id: 94867},
    {centroid_id: 94874, title: "못 버는 것도 힘겨운데…저소득층, 못 먹는 설움까지", parent_cluster_id: 94868},
]

function render(node: any) {
    return `<div style="height:${node.settings.nodeHeight}px;display:flex;align-items:center;text-align: center;border: 1px solid black">${node.data.title}</div>`
}

export default function RoadMap() {
    return (
        <TreevizReact
            data={dummyCluster}
            idKey={'centroid_id'}
            relationnalField={'parent_cluster_id'}
            nodeWidth={200}
            nodeHeight={100}
            mainAxisNodeSpacing={2}
            secondaryAxisNodeSpacing={1.3}
            renderNode={(node) =>
                render(node)
            }
            onNodeClick={(node) => null }
            //TODO 클릭 시 해당 페이지로 이동
            duration={500}
            linkWidth={(node) => 3}
            linkColor={(node) => "#293241"}
        />
    );
}