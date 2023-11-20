import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
    Node,
    addEdge,
    Background,
    Edge,
    Controls,
    useNodesState,
    useEdgesState,
    MiniMap,
    Panel,
    Position,
    ReactFlowInstance
} from "reactflow";

import {nodeInfo_1, initialEdges_1, stateToQuestions} from '../ChartNodesInfo/ChartNodesInfoUpdated';

import FlowController from "../FlowController/FlowController";
import { DiamondNode, RectangleNode } from "../CustomNode/CustomNode";

import "reactflow/dist/style.css";

const nodeTypes = {
    diamondNode: DiamondNode,
    rectangleNode: RectangleNode
};

const BasicFlow = () => {
    const [flowControllerState, setFlowControllerState] = useState<number[]>([1])
    const [flowInstance, setFlowInstance] = useState<ReactFlowInstance>({} as ReactFlowInstance);
    
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
        if (flowInstance) {
            // For interactivity option on
            setTimeout(flowInstance.fitView, 0)
        }

    }, [flowControllerState, flowInstance]);

    useEffect(() => {
        // For interactivity option off
        setTimeout(flowInstance.fitView, 0)
    }, [nodes, edges])

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