import { useEffect, useState, useRef } from "react";
import { toPng } from 'html-to-image';
import ReactFlow, {
    Node,
    addEdge,
    Background,
    Edge,
    getRectOfNodes,
    Controls,
    useNodesState,
    useEdgesState,
    MiniMap,
    Panel,
    Position,
    ReactFlowInstance,
    getTransformForBounds,
} from "reactflow";

import { nodeInfo_1, initialEdges_1, stateToQuestions } from '../ChartNodesInfo/ChartNodesInfoUpdated';

import FlowController from "../FlowController/FlowController";
import { DiamondNode, RectangleNode } from "../CustomNode/CustomNode";

import "reactflow/dist/style.css";
import { set } from "date-fns";

const nodeTypes = {
    diamondNode: DiamondNode,
    rectangleNode: RectangleNode
};

const BasicFlow = () => {
    const [flowControllerState, setFlowControllerState] = useState<number[]>([1])
    const [flowInstance, setFlowInstance] = useState<ReactFlowInstance>({} as ReactFlowInstance);
    const [newNodesNum, setNewNodesNum] = useState<number[]>([]);
    const [load, setLoad] = useState(0);

    const filteredNodes = Object.keys(nodeInfo_1)
        .filter((key) => flowControllerState.includes(Number(key)))
        .map((key) => ({
            ...(nodeInfo_1 as Record<string, Node>)[key],
            nodeId: Number(key),
        }));

    const [nodes, setNodes, onNodesChange] = useNodesState(filteredNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges_1);

    const handleSetAnswer = (answer: { answer_text: string; answer_add: number[]; }) => {
        const updatedFlowControllerState = [...flowControllerState, ...answer.answer_add];
        setNewNodesNum(answer.answer_add);
        setFlowControllerState(updatedFlowControllerState);
    };

    useEffect(() => {
        let newFilteredNodes = Object.keys(nodeInfo_1)
            .filter((key) => flowControllerState.includes(Number(key)))
            .map((key) => ({
                ...(nodeInfo_1 as Record<string, Node>)[key],
                nodeId: Number(key),
            }));
        setNodes(newFilteredNodes);
    }, [flowControllerState, flowInstance]);

    useEffect(() => {
        if (load < 3) {
            setLoad(load + 1);
            return;
        }
        setTimeout(() => {
            flowInstance.fitView({
                nodes: nodes.filter(node => newNodesNum.includes(+node.id)),
                duration: 1000,
            });
        }, 0);
    }, [nodes, edges])

    const downloadImage = (dataUrl: string) => {
        const a = document.createElement('a');
        a.setAttribute('download', 'reactflow.png');
        a.setAttribute('href', dataUrl);
        a.click();
    }
    const downloadChart = () => {
        const imageWidth = 3840;
        const imageHeight = 2160;
        const viewportElement = document.querySelector('.react-flow__viewport');


        if (viewportElement instanceof HTMLElement && flowInstance) {
            setTimeout(() => {
                flowInstance.fitView();
            }, 0);

            setTimeout(() => {
                const nodesBounds = getRectOfNodes(nodes);
                console.log(nodesBounds);
                const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.375, 2);
                console.log(transform);
                toPng(viewportElement, {
                    backgroundColor: '#fff',
                    width: imageWidth,
                    height: imageHeight,
                    style: {
                        width: imageWidth.toString() + 'px',
                        height: imageHeight.toString() + 'px',
                        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
                    },
                }).then(downloadImage);
            }, 0);
        } else {
            console.error('Viewport element not found or is not an HTMLElement.');
        }
    };

    return (
        <div className="h-screen w-screen" >
            <ReactFlow
                className="flowchart-container"
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView={true}
                minZoom={0.05}
                onInit={(instance) => setFlowInstance(instance)}

            >
                <Panel position={'top-right'}>
                    <FlowController
                        question={stateToQuestions[flowControllerState[flowControllerState.length - 1]]?.question || ''}
                        answers={stateToQuestions[flowControllerState[flowControllerState.length - 1]]?.answers || []}
                        setAnswer={handleSetAnswer}
                        toDownload={downloadChart}
                        is_last_node={stateToQuestions[flowControllerState[flowControllerState.length - 1]]?.is_last_node || false}
                    />
                </Panel>
                <Background />
                <Controls />
                <MiniMap zoomable pannable />
            </ReactFlow>
        </div>
    );
};

export default BasicFlow;