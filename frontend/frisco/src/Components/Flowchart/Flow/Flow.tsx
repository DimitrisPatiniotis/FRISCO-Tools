import { useEffect, useState, useRef } from "react";
import FlowchartLogo from "../FlowchartLogo/FlowchartLogo";
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
import { t } from "i18next";
import { IonIcon } from "@ionic/react";

const nodeTypes = {
    diamondNode: DiamondNode,
    rectangleNode: RectangleNode
};

const BasicFlow = () => {
    const [flowControllerState, setFlowControllerState] = useState<number[]>([1])
    const [flowInstance, setFlowInstance] = useState<ReactFlowInstance>({} as ReactFlowInstance);
    const [lastAdded, setLastAdded] = useState<number[]>([1]);
    const [lastAddedMemory, setLastAddedMemory] = useState<number[][]>([[1]]);
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
        setLastAdded(lastAdded.concat(answer.answer_add));
        setLastAddedMemory([...lastAddedMemory, [...answer.answer_add]]);
        setFlowControllerState(updatedFlowControllerState);
    };

    const removeLastAdded = () => {

        console.log(lastAddedMemory)
        const itemsToRemove = lastAddedMemory[lastAddedMemory.length - 1];
        const updatedFlowControllerState = flowControllerState.filter((item) => !itemsToRemove.includes(item));
        setFlowControllerState(updatedFlowControllerState);
        setLastAddedMemory(lastAddedMemory.slice(0, -1));
        setLastAdded(lastAdded.filter((item) => !itemsToRemove.includes(item)));
    }

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
        console.log(lastAdded)

        setTimeout(() => {
            flowInstance.fitView({
                nodes: nodes.filter(node => lastAdded.slice(-3).includes(+node.id)),

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
                const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.375, 2);
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
                edgesFocusable={false}
                nodesDraggable={false}
                nodesConnectable={false}
                draggable={false}
                elementsSelectable={false}
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
                {
                    nodes.length > 1 ? (
                        <Panel position={'bottom-right'}>
                        <div className='w-[200px] bg-neutral-400 gap-1 text-neutral-50 h-10 flex justify-center cursor-pointer items-center absolute right-0 bottom-[150px] mb-2 rounded-md' onClick={removeLastAdded}>
                        <IonIcon icon="arrow-undo" />
                            <div>
                                Back
                            </div>
                        </div>
                    </Panel>
                    ) : null
                }

                <Background />
                <Controls />
                <MiniMap zoomable pannable />
                <FlowchartLogo />
            </ReactFlow>

        </div>
    );
};

export default BasicFlow;