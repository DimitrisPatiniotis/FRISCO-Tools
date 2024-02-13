import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';



interface CustomNodeProps {
  data: {
    id: string;
    label: string;
    background_color?: string;
    text_color?: string;
    text_translate?: string;
    node_height?: string;
    node_width?: string;
    font_size?: string;
    node_margins?: string;
    border_radius?: string;
    node_padding?: string;
    handleTop?: boolean;
    handleLeft?: boolean;
    handleBottom?: boolean;
    handleRight?: boolean;
    incomingHandleTop?: boolean;
    incomingHandleRight?: boolean;
    incomingHandleBottom?: boolean;
    incomingHandleLeft?: boolean;
    outgoingHandleTop?: boolean;
    outgoingHandleRight?: boolean;
    outgoingHandleBottom?: boolean;
    outgoingHandleLeft?: boolean;
  };
}

const DiamondNode: React.FC<CustomNodeProps> = ({ data }) => {

  return (
    <div className='bg-white border-none' >
      <style>
        {`
          #custom-node-div-${data.id} {
            height:${data.node_height};
            width:${data.node_width};
            margin:${data.node_margins};
          }
          #custom-node-div-${data.id}:before {
            background-color: ${data.background_color};
          }
        `}
      </style>
      <div className='custom-diamond-node-div' id={`custom-node-div-${data.id}`}>
        <p style={{ lineHeight: '1.1rem', fontSize: data.font_size, transform: data.text_translate, color: data.text_color }}>{data.label}</p>
      </div>

      {data.incomingHandleTop && <Handle type="target" position={Position.Top} id='target-1'/>}
      {data.incomingHandleRight && <Handle type="target" position={Position.Right} id='target-2'/>}
      {data.incomingHandleBottom && <Handle type="target" position={Position.Bottom} id='target-3'/>}
      {data.incomingHandleLeft && <Handle type="target" position={Position.Left} id='target-4'/>}

      {data.outgoingHandleTop && <Handle type="source" position={Position.Top} id='source-1' />}
      {data.outgoingHandleRight && <Handle type="source" position={Position.Right}  id='source-2' />}
      {data.outgoingHandleBottom && <Handle type="source" position={Position.Bottom} id='source-3' />}
      {data.outgoingHandleLeft && <Handle type="source" position={Position.Left} id='source-4' />}

      {data.handleTop && <Handle type="target" position={Position.Top} id='target-1'/>}
      {data.handleLeft && <Handle type="target" position={Position.Left} id='target-2'/>}
      {data.handleBottom && <Handle type="source" position={Position.Bottom} id='source-1' />}
      {data.handleRight && <Handle type="source" position={Position.Right}  id='source-2' />}
    </div>
  );
}

const RectangleNode: React.FC<CustomNodeProps> = ({ data }) => {

  return (
    <div className='bg-white ' id={`custom-rectangle-node-wrapper-${data.id}`} >
      <style>
        {`
          #custom-rectangle-node-wrapper-${data.id} {
            border: 1px solid ${data.background_color};
            border-radius:${data.border_radius};
            background-color: ${data.background_color};

          }
          #custom-rectangle-node-div-${data.id} {
            height:${data.node_height};
            width:${data.node_width};
            margin:${data.node_margins};
            display: flex;
            justify-content: center;
            align-items: center;
            padding:${data.node_padding};
          }
        `}
      </style>
      <div className='custom-rectangle-node-div' id={`custom-rectangle-node-div-${data.id}`}>
        <p style={{ lineHeight: '1.5rem', transform: data.text_translate, color: data.text_color }}>{data.label}</p>
      </div>

      {data.incomingHandleTop && <Handle type="target" position={Position.Top} id='target-1'/>}
      {data.incomingHandleRight && <Handle type="target" position={Position.Right} id='target-2'/>}
      {data.incomingHandleBottom && <Handle type="target" position={Position.Bottom} id='target-3'/>}
      {data.incomingHandleLeft && <Handle type="target" position={Position.Left} id='target-4'/>}

      {data.outgoingHandleTop && <Handle type="source" position={Position.Top} id='source-1' />}
      {data.outgoingHandleRight && <Handle type="source" position={Position.Right}  id='source-2' />}
      {data.outgoingHandleBottom && <Handle type="source" position={Position.Bottom} id='source-3' />}
      {data.outgoingHandleLeft && <Handle type="source" position={Position.Left} id='source-4' />}

      {data.handleTop && <Handle type="target" position={Position.Top} id='target-1'/>}
      {data.handleLeft && <Handle type="target" position={Position.Left} id='target-2'/>}
      {data.handleBottom && <Handle type="source" position={Position.Bottom} id='source-1' />}
      {data.handleRight && <Handle type="source" position={Position.Right}  id='source-2' />}
    </div>
  );
}

export { DiamondNode, RectangleNode };