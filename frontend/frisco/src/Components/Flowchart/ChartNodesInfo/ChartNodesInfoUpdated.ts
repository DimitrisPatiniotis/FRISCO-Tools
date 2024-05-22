import { Edge } from 'reactflow';

interface NodeInfo {
    [key: number]: {
        id: string;
        type: string;

        data: {
            incomingHandleTop?: boolean;
            incomingHandleRight?: boolean;
            incomingHandleBottom?: boolean;
            incomingHandleLeft?: boolean;
            outgoingHandleTop?: boolean;
            outgoingHandleRight?: boolean;
            outgoingHandleBottom?: boolean;
            outgoingHandleLeft?: boolean;

            HandleTop?: boolean;
            HandleRight?: boolean;
            HandleBottom?: boolean;
            HandleLeft?: boolean;

            handleTop?: boolean;
            handleLeft?: boolean;
            handleBottom?: boolean;
            handleRight?: boolean;
            label: string,
            background_color?: string,
            id?: string,
            text_color?: string,
            text_translate?: string,
            node_height?: string,
            node_width?: string,
            node_margins?: string,
            font_size?: string,
            border_radius?: string,
            node_padding?: string
        };
        position: { x: number; y: number };
    };
}

type StateToQuestions = {
    [key: number]: {
        question?: string;
        answers?: { answer_text: string; answer_add: number[] }[];
        is_last_node?: boolean;
    };
};


const highFlowLineY = -960;
const lowFlowLineY = 960;

export const nodeInfo_1: NodeInfo = {

    1: {
        id: '1',
        type: 'diamondNode',

        data: { outgoingHandleTop: true, outgoingHandleBottom: true, label: 'Are you an HSP offering its services in the EU that has been ‘exposed to terrorist content’?', id: '1', background_color: 'rgb(198,230,255)', text_color: 'black', text_translate: 'translateY(68px)', node_height: '190px', node_width: '190px', font_size: '15px', node_margins: '-2px 22px' },
        position: { x: 0, y: -80 },
    },
    2: {
        id: '2',
        type: 'rectangleNode',
        data: { incomingHandleTop: true, outgoingHandleRight: true, label: 'Are you an HSP who wants to know what to do when exposed to terrorist content?', id: '2', background_color: 'rgb(198,230,255)', text_color: 'black', node_height: '100px', node_width: '400px', border_radius: '20px', node_margins: '0', font_size: '12px' },
        position: { x: -100, y: lowFlowLineY },

    },
    3: {
        id: '3',
        type: 'rectangleNode',
        data: { handleLeft: true, handleRight: true, label: 'Do you have user-generated content on you platform?', id: '3', background_color: 'rgb(198,230,255)', node_height: '100px', node_width: '300px', border_radius: '20px', node_margins: '0' },

        position: { x: 500, y: lowFlowLineY },

    },
    4: {
        id: '4',
        type: 'rectangleNode',
        data: { handleLeft: true, handleRight: true, label: 'Unfortunately you might be affected in the future', id: '4', background_color: 'rgb(198,230,255)', node_height: '100px', node_width: '300px', font_size: '14px', border_radius: '20px', node_margins: '0' },

        position: { x: 950, y: lowFlowLineY },

    },
    5: {
        id: '5',
        type: 'rectangleNode',
        data: { handleLeft: true, label: 'You should take the FRISCO\'s Self Assessment Questionnaire to make sure you are out of scope', id: '5', background_color: 'rgb(198,230,255)', node_height: '100px', node_width: '400px', font_size: '14px', border_radius: '20px', node_margins: '0' },

        position: { x: 1000, y: lowFlowLineY },
    },
    6: {
        id: '6',
        type: 'rectangleNode',
        data: { incomingHandleLeft: true, outgoingHandleRight: true, label: 'Do you have the right tools in place?', id: '6', background_color: 'rgb(198,230,255)', node_height: '100px', node_width: '300px', font_size: '14px', border_radius: '20px', node_margins: '0' },
        position: { x: 1400, y: lowFlowLineY },
    },
    7: {
        id: '7',
        type: 'diamondNode',
        data: { handleLeft: true, outgoingHandleTop: true, outgoingHandleRight: true, label: 'Are compliant with the TCO Regulation?', id: '7', background_color: 'rgb(198,230,255)', text_color: 'black', text_translate: 'translateY(65px)', node_height: '170px', node_width: '170px', font_size: '14px', node_margins: '-2px 32px' },
        position: { x: 1900, y: lowFlowLineY - 35 },
    },
    8: {
        id: '8',
        type: 'rectangleNode',
        data: { incomingHandleLeft: true, outgoingHandleTop: true, label: 'You should take the FRISCO\'s Self Assessment Questionnaire', id: '8', background_color: 'rgb(198,230,255)', node_height: '100px', node_width: '400px', border_radius: '20px', node_margins: '0' },
        position: { x: 2600, y: lowFlowLineY },
    },
    9: {
        id: '9',
        type: 'rectangleNode',
        data: { incomingHandleBottom: true, outgoingHandleTop: true, label: 'Done?', id: '9', background_color: 'rgb(198,230,255)', node_height: '75px', node_width: '300px', border_radius: '10px', node_margins: '0', node_padding: '5px' },
        position: { x: 2650, y: lowFlowLineY - 300 },
    },
    10: {
        id: '10',
        type: 'rectangleNode',
        data: { incomingHandleBottom: true, outgoingHandleTop: true, label: 'In any case, you must use provisions to address the misuses of your services for the dissemination of terrorist content (these provisions must be included in Terms & Conditions)', id: '10', background_color: 'rgb(252,227,135)', node_height: '100px', node_width: '400px', border_radius: '10px', node_margins: '0' },
        position: { x: 1400, y: lowFlowLineY - 700 },
    },
    11: {
        id: '11',
        type: 'rectangleNode',
        data: { incomingHandleBottom: true, incomingHandleTop: true, outgoingHandleRight: true, label: 'You must take specific measures to protect your services from the dissemination of terrorist content', id: '11', background_color: 'rgb(252,227,135)', node_height: '100px', node_width: '400px', border_radius: '10px', node_margins: '0' },
        position: { x: 1400, y: 0 },
    },
    12: {
        id: '12',
        type: 'rectangleNode',
        data: { incomingHandleLeft: true, outgoingHandleRight: true, label: 'Let\'s look at the types of specific measures you can take', id: '12', background_color: 'rgb(252,227,135)', node_height: '100px', node_width: '340px', border_radius: '10px', node_margins: '0' },
        position: { x: 2040, y: 0 },

    },
    13: {
        id: '13',
        type: 'rectangleNode',
        data: { handleLeft: true, outgoingHandleBottom: true, label: 'Technical and operational measures (e.g. staffing, technical means, etc.)', id: '13', background_color: 'rgb(252,227,135)', node_height: '100px', node_width: '340px', border_radius: '10px', node_margins: '0' },
        position: { x: 2640, y: highFlowLineY + 300 },
    },
    14: {
        id: '14',
        type: 'rectangleNode',
        data: { incomingHandleTop: true, outgoingHandleBottom: true, label: 'Accessible and user-friendly reporting mechanisms: This can be a simple form or a dedicated email address.', id: '14', background_color: 'rgb(252,227,135)', node_height: '100px', node_width: '340px', border_radius: '10px', node_margins: '0' },
        position: { x: 2740, y: highFlowLineY + 530 },
    },
    15: {
        id: '15',
        type: 'rectangleNode',
        data: { incomingHandleTop: true, outgoingHandleBottom: true, label: 'Mechanisms to increase the awareness of terrorist content on services, such as mechanisms for user moderation', id: '15', background_color: 'rgb(252,227,135)', node_height: '78px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 2640, y: highFlowLineY + 775 },
    },
    16: {
        id: '16',
        type: 'rectangleNode',
        data: { incomingHandleTop: true, outgoingHandleBottom: true,  label: 'Any other measures to address the dissemination of terrorist content on your services: This can be through accessing the GIFCT hash sharing database, or through engaging with the FRISCO project.', id: '16', background_color: 'rgb(252,227,135)', node_height: '140px', node_width: '360px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 2740, y: highFlowLineY + 980 },
    },
    17: {
        id: '17',
        type: 'rectangleNode',
        data: { incomingHandleTop: true, outgoingHandleRight: true, handleRight: true, label: 'You can decide on the types of the specific measures you take, but they should belong to these 4 categories', id: '17', background_color: 'rgb(252,227,135)', node_height: '100px', node_width: '400px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 2640, y: highFlowLineY + 1180 },
    },

    18: {
        id: '18',
        type: 'rectangleNode',
        data: { incomingHandleLeft: true, outgoingHandleRight: true, label: 'Now, let\'s look at the requirements of these specific measures', id: '18', background_color: 'rgb(252,227,135)', node_height: '110px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 3320, y: highFlowLineY + 730 },
    },

    19: {
        id: '19',
        type: 'rectangleNode',
        data: { handleLeft: true, outgoingHandleBottom: true, label: 'Technical measures must have appropriate safeguards : human safeguards and verifications', id: '19', background_color: 'rgb(252,227,135)', node_height: '100px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 3860, y: highFlowLineY + 300 },
    },
    20: {
        id: '20',
        type: 'rectangleNode',
        data: { incomingHandleTop: true, outgoingHandleBottom: true, label: "Measures must be targeted and proportionate (capabilities, financial resources, number of users, content available...)", id: '20', background_color: 'rgb(252,227,135)', node_height: '100px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 3960, y: highFlowLineY + 530 },
    },


    21: {
        id: '21',
        type: 'rectangleNode',
        data: { incomingHandleTop: true, outgoingHandleBottom: true, label: "Measures must respect fundamental rights (such as freedom of expression and information, privacy, protection of data...)", id: '21', background_color: 'rgb(252,227,135)', node_height: '76px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 3860, y: highFlowLineY + 775 },
    },
    22: {
        id: '22',
        type: 'rectangleNode',
        data: { incomingHandleTop: true, outgoingHandleBottom: true, label: "Measures must apply in a diligent and non-discriminatory manner", id: '22', background_color: 'rgb(252,227,135)', node_height: '75px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 3960, y: highFlowLineY + 980 },
    },


    23: {
        id: '23',
        type: 'rectangleNode',
        data: { incomingHandleTop: true, outgoingHandleRight: true, label: "Measures must be effective in mitigating the level of exposure to terrorist content", id: '23', background_color: 'rgb(252,227,135)', node_height: '100px', node_width: '400px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 3860, y: highFlowLineY + 1180 },
    },
    24: {
        id: '24',
        type: 'diamondNode',
        data: { handleLeft: true, handleRight: true, label: "Have you already implemented these specific measures?", id: '24', background_color: 'rgb(252,227,135)', text_translate: 'translateY(55px)', node_height: '180px', node_width: '180px', font_size: '15px', node_margins: '-2px 32px' },
        position: { x: 4500, y: highFlowLineY + 700 },
    },

    25: {
        id: '25',
        type: 'diamondNode',
        data: { incomingHandleLeft: true, outgoingHandleRight: true, label: "Have you reported to your residency Competent Authority about these specific measures?", id: '25', background_color: 'rgb(252,227,135)', text_translate: 'translateY(60px)', node_height: '180px', node_width: '180px', font_size: '15px', node_margins: '-2px 32px' },
        position: { x: 4950, y: highFlowLineY + 500 },
    },
    26: {
        id: '26',
        type: 'rectangleNode',
        data: { handleLeft: true, handleRight: true, label: "You should implement them as soon as possible and then...", id: '26', background_color: 'rgb(252,227,135)', node_height: '75px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 4900, y: highFlowLineY + 1000 },
    },
    27: {
        id: '27',
        type: 'rectangleNode',
        data: { incomingHandleLeft: true, incomingHandleBottom: true, outgoingHandleTop: true, label: "... you must report to your residency Competent Authority to determine the effectiveness and proportionality of the measures, as well as whether the safeguards are sufficient", id: '27', background_color: 'rgb(252,227,135)', node_height: '120px', node_width: '400px', border_radius: '10px', node_margins: '0', node_padding: '10px' },

        position: { x: 5500, y: highFlowLineY + 860 },
    },
    28: {
        id: '28',
        type: 'diamondNode',
        data: { incomingHandleLeft: true, outgoingHandleRight: true, incomingHandleBottom: true, label: 'In your Terms & Conditions, do you clearly state your policy for counterring terrorist content ?', id: '28', background_color: 'rgb(252,227,135)', text_color: 'black', text_translate: 'translateY(65px)', node_height: '180px', node_width: '180px', font_size: '14px', node_margins: '0px 32px' },
        position: { x: 5580, y: highFlowLineY + 500 },
    },
    29: {
        id: '29',
        type: 'rectangleNode',
        data: { handleLeft: true, handleRight: true, label: 'You must clearly state in your Terms and Conditions your policy for countering terrorist content - including explanations about the specific measures and use of automated tools', id: '29', background_color: 'rgb(252,227,135)', text_color: 'black', node_height: '104px', node_width: '410px', border_radius: '20px', node_margins: '0', font_size: '12px' },
        position: { x: 6030, y: highFlowLineY + 800 },

    },
    30: {
        id: '30',
        type: 'diamondNode',
        data: { incomingHandleLeft: true, incomingHandleBottom: true, outgoingHandleRight: true, label: 'Do you publish a yearly transparency report?', id: '30', background_color: 'rgb(248,163,146)', text_color: 'black', text_translate: 'translateY(73px)', node_height: '180px', node_width: '180px', font_size: '14px', node_margins: '0px 32px' },
        position: { x: 6480, y: highFlowLineY + 500 },
    },
    31: {
        id: '31',
        type: 'rectangleNode',
        data: { incomingHandleTop: true, incomingHandleBottom: true, outgoingHandleRight: true, label: 'You must publish a yearly transparency report about measures you took to identify and remove terrorist content', id: '31', background_color: 'rgb(248,163,146)', text_color: 'black', node_height: '104px', node_width: '410px', border_radius: '20px', node_margins: '0', font_size: '12px' },

        position: { x: 6700, y: highFlowLineY + 1000 },

    },
    32: {
        id: '32',
        type: 'rectangleNode',
        data: { incomingHandleTop: true, outgoingHandleBottom: true, incomingHandleLeft: true, label: 'Let\'s look at the information these transparency reports should include', id: '32', background_color: 'rgb(248,163,146)', text_color: 'black', node_height: '104px', node_width: '410px', border_radius: '20px', node_margins: '0', font_size: '12px' },
        position: { x: 7400, y: highFlowLineY + 1000 },
    },
    33: {
        id: '33',
        type: 'rectangleNode',
        data: { incomingHandleTop: true, outgoingHandleLeft: true, label: 'Measures to identify and remove content', id: '33', background_color: 'rgb(248,163,146)', text_color: 'black', node_height: '104px', node_width: '410px', border_radius: '20px', node_margins: '0', font_size: '12px' },
        position: { x: 7400, y: highFlowLineY + 1700 },
    },
    34: {
        id: '34',
        type: 'rectangleNode',
        data: { incomingHandleRight: true, outgoingHandleLeft: true, label: 'Measures to address the reappearance of terrorist content (in particular when using automated tools)', id: '34', background_color: 'rgb(248,163,146)', text_color: 'black', node_height: '104px', node_width: '410px', border_radius: '20px', node_margins: '0', font_size: '12px' },
        position: { x: 6500, y: highFlowLineY + 1700 },
    },
    35: {
        id: '35',
        type: 'rectangleNode',
        data: { incomingHandleRight: true, outgoingHandleLeft: true, label: 'Number of terrorist content/items removed or disabled in the EU (following a RO or specific measures) - and number of content not removed', id: '35', background_color: 'rgb(248,163,146)', text_color: 'black', node_height: '104px', node_width: '410px', border_radius: '20px', node_margins: '0', font_size: '12px' },
        position: { x: 5600, y: highFlowLineY + 1700 },
    },
    36: {
        id: '36',
        type: 'rectangleNode',
        data: { incomingHandleRight: true, outgoingHandleLeft: true, label: 'Number and outcome of complaints handled', id: '36', background_color: 'rgb(248,163,146)', text_color: 'black', node_height: '104px', node_width: '410px', border_radius: '20px', node_margins: '0', font_size: '12px' },
        position: { x: 4700, y: highFlowLineY + 1700 },
    },
    37: {
        id: '37',
        type: 'rectangleNode',
        data: { incomingHandleLeft: true, outgoingHandleRight: true, label: 'Number and outcome of admin or judicial review proceedings you requested', id: '37', background_color: 'rgb(248,163,146)', text_color: 'black', node_height: '104px', node_width: '410px', border_radius: '20px', node_margins: '0', font_size: '12px' },
        position: { x: 4700, y: highFlowLineY + 2050 },
    },
    38: {
        id: '38',
        type: 'rectangleNode',
        data: { incomingHandleLeft: true, outgoingHandleRight: true, label: 'Number of cases in which you were required to reinstate content following a review', id: '38', background_color: 'rgb(248,163,146)', text_color: 'black', node_height: '104px', node_width: '410px', border_radius: '20px', node_margins: '0', font_size: '12px' },
        position: { x: 5600, y: highFlowLineY + 2050 },
    },
    39: {
        id: '39',
        type: 'rectangleNode',
        data: { incomingHandleLeft: true, outgoingHandleRight: true, label: 'Number of cases in which the content was reinstated following a complaint from a user', id: '39', background_color: 'rgb(248,163,146)', text_color: 'black', node_height: '104px', node_width: '410px', border_radius: '20px', node_margins: '0', font_size: '12px' },
        position: { x: 6500, y: highFlowLineY + 2050 },

    },
    40: {
        id: '40',
        type: 'diamondNode',
        data: { incomingHandleBottom: true, outgoingHandleTop: true, label: 'How was the terrorist content detected?', id: '40', background_color: 'rgb(240,247,198)', text_translate: 'translateY(55px)', node_height: '150px', node_width: '150px', font_size: '15px', node_margins: '-2px 32px' },
        position: { x: 10, y: highFlowLineY + 200 },
    },
    41: {
        id: '41',
        type: 'rectangleNode',
        data: { incomingHandleLeft: true, outgoingHandleRight: true, label: 'In-house tools (AI / manual) & Monitoring', id: '41', background_color: 'rgb(235,245,179)', node_height: '60px', node_width: '240px', border_radius: '10px', node_margins: '0' },
        position: { x: 400, y: highFlowLineY - 600 },
    },
    42: {
        id: '42',
        type: 'rectangleNode',
        data: { handleLeft: true, handleRight: true, label: 'User Notices', id: '42', background_color: 'rgb(235,245,179)', node_height: '60px', node_width: '240px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 400, y: highFlowLineY - 400 },
    },
    43: {
        id: '43',
        type: 'rectangleNode',
        data: { handleLeft: true, handleBottom: true, label: 'Next steps depend of the tools you are using', id: '43', background_color: 'rgb(241,248,198)', node_height: '72px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 800, y: highFlowLineY - 500 },
    },
    44: {
        id: '44',
        type: 'rectangleNode',
        data: { incomingHandleLeft: true, outgoingHandleBottom: true, label: 'LEAs / "Competent Authorities"', id: '44', background_color: 'rgb(241,248,198)', node_height: '72px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 600, y: highFlowLineY - 200 },
    },

    45: {
        id: '45',
        type: 'rectangleNode',
        data: { incomingHandleTop: true, outgoingHandleRight: true, label: 'You have received a Removal Order', id: '45', background_color: 'rgb(223,183,230)', node_height: '80px', node_width: '300px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 618, y: highFlowLineY + 25 },
    },

    46: {
        id: '46',
        type: 'diamondNode',
        data: { incomingHandleLeft: true, outgoingHandleTop: true, outgoingHandleBottom: true, label: 'Is it the first one you receive?', id: '46', background_color: 'rgb(223,183,230)', text_translate: 'translateY(60px)', node_height: '150px', node_width: '150px', font_size: '15px', node_margins: '-2px 32px' },
        position: { x: 1120, y: highFlowLineY - 10 },
    },
    47: {
        id: '47',
        type: 'diamondNode',
        data: { incomingHandleTop: true, outgoingHandleRight: true, outgoingHandleBottom: true, label: "Have you received 2 (or more) final  Removal Orders in a 12 months period ?", id: '47', background_color: 'rgb(223,183,230)', text_translate: 'translateY(63px)', node_height: '180px', node_width: '180px', font_size: '15px', node_margins: '-2px 32px' },
        position: { x: 1105, y: highFlowLineY + 320 },
    },

    48: {
        id: '48',
        type: 'diamondNode',
        data: { incomingHandleLeft: true, outgoingHandleRight: true, outgoingHandleTop:true, outgoingHandleBottom: true, label: 'Does your residency Competent Authority decided you are "exposed to terrorist content" and has notified you of this ?', id: '48', background_color: 'rgb(223,183,230)', text_translate: 'translateY(60px)', node_height: '200px', node_width: '200px', font_size: '15px', node_margins: '-2px 32px' },
        position: { x: 1825, y: highFlowLineY + 305 },
    },
    49: {
        id: '49',
        type: 'diamondNode',
        data: { incomingHandleLeft: true,incomingHandleBottom: true, outgoingHandleTop: true, outgoingHandleRight:true, label: "Was it issued by the Residency Competent Authority ?", id: '49', background_color: 'rgb(223,183,230)', text_translate: 'translateY(56px)', node_height: '160px', node_width: '160px', font_size: '15px', node_margins: '-2px 32px' },
        position: { x: 1500, y: highFlowLineY - 150 },
    },


    50: {
        id: '50',
        type: 'rectangleNode',
        data: { handleLeft: true, handleRight: true, label: "You have received your first Removal Order", id: '50', background_color: 'rgb(223,183,230)', node_height: '75px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 1850, y: highFlowLineY - 372 },
    },
    51: {
        id: '51',
        type: 'diamondNode',
        data: { handleLeft: true, handleRight: true, label: "Were you provided with applicable procedures and deadlines 12 hours before the Removal Order was issued?", id: '51', background_color: 'rgb(223,183,230)', text_translate: 'translateY(60px)', node_height: '190px', node_width: '190px', font_size: '15px', node_margins: '-2px 36px' },
        position: { x: 2500, y: highFlowLineY - 425 },
    },

    52: {
        id: '52',
        type: 'rectangleNode',
        data: { handleLeft: true, outgoingHandleRight: true, label: "Procedures have been respected : 12 hours before issuing the Removal Order, the Competent Authority must provide applicable procedures and deadlines", id: '52', background_color: 'rgb(217,219,240)', node_height: '110px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 3010, y: highFlowLineY - 520 },
    },
    53: {
        id: '53',
        type: 'rectangleNode',
        data: { handleLeft: true, handleRight: true, label: "Procedures have not been respected : 12 hours before issuing the Removal Order, the Competent Authority must provide applicable procedures and deadlines", id: '53', background_color: 'rgb(223,183,230)', node_height: '100px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },

        position: { x: 3000, y: highFlowLineY - 180 },
    },
    54: {
        id: '54',
        type: 'diamondNode',
        data: { incomingHandleLeft: true, incomingHandleBottom: true, outgoingHandleRight: true, label: "Have you received the removal order through your single Contact Point?", id: '54', background_color: 'rgb(223,183,230)', text_translate: 'translateY(60px)', node_height: '180px', node_width: '180px', font_size: '15px', node_margins: '-2px 32px' },
        position: { x: 3600, y: highFlowLineY - 417 },
    },

    55: {
        id: '55',
        type: 'rectangleNode',
        data: { incomingHandleLeft: true, outgoingHandleRight: true, label: "You have received a cross-border Removal Order", id: '55', background_color: 'rgb(223,183,230)', node_height: '75px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 1820, y: highFlowLineY + 50 },
    },
    56: {
        id: '56',
        type: 'rectangleNode',
        data: { incomingHandleLeft: true, outgoingHandleRight: true, label: "The issuing Competent Authority must submit a copy of the Removal Order to the residency Competent Authority", id: '56', background_color: 'rgb(223,183,230)', node_height: '75px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 2250, y: highFlowLineY + 180 },
    },
    57: {
        id: '57',
        type: 'rectangleNode',
        data: { incomingHandleLeft: true, outgoingHandleRight: true, label: "The residency Competent Authority now has 72 hours to scrutinise the copy and determine potential fundamental rights and freedoms infringement", id: '57', background_color: 'rgb(223,183,230)', node_height: '100px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 2700, y: highFlowLineY + 168 },
    },
    58: {
        id: '58',
        type: 'rectangleNode',
        data: { incomingHandleLeft: true, outgoingHandleRight: true, label: "If fundamental rights and freedoms infringement are detected/adjudicated, you will have to reinstate the content", id: '58', background_color: 'rgb(223,183,230)', node_height: '75px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 3150, y: highFlowLineY + 180 },
    },
    59: {
        id: '59',
        type: 'rectangleNode',
        data: { incomingHandleLeft: true, outgoingHandleRight: true, label: "You should have established a single point of contact", id: '59', background_color: 'rgb(223,183,230)', node_height: '75px', node_width: '300px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 4100, y: highFlowLineY - 180 },
    },
    60: {
        id: '60',
        type: 'rectangleNode',
        data: { incomingHandleLeft: true, outgoingHandleRight: true, label: "You have received the Removal Order trough your Point of Contact", id: '60', background_color: 'rgb(217,219,240)', node_height: '75px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 4020, y: highFlowLineY + 14 },
    },
    61: {
        id: '61',
        type: 'rectangleNode',
        data: { incomingHandleLeft: true, outgoingHandleTop: true, label: "You must action the removal order: remove content or disable its access in the EU within one hour of receipt in all instance", id: '61', background_color: 'rgb(223,183,230)', node_height: '100px', node_width: '300px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 4500, y: highFlowLineY },
    },
    62: {
        id: '62',
        type: 'diamondNode',
        data: { incomingHandleBottom: true, outgoingHandleTop: true, outgoingHandleRight: true, label: "Does the removal order contain manifest errors or lack sufficient information?", id: '62', background_color: 'rgb(223,183,230)', text_translate: 'translateY(60px)', node_height: '180px', node_width: '180px', font_size: '15px', node_margins: '-2px 32px' },
        position: { x: 4530, y: highFlowLineY - 380 },
    },
    63: {
        id: '63',
        type: 'rectangleNode',
        data: { incomingHandleLeft: true, outgoingHandleBottom: true, label: "You must inform the Competent Authority without undue delay", id: '63', background_color: 'rgb(223,183,230)', node_height: '75px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 5020, y: highFlowLineY - 520 },
    },
    64: {
        id: '64',
        type: 'diamondNode',
        data: { incomingHandleLeft: true, incomingHandleTop: true, outgoingHandleRight: true, label: "Are you able remove the content or disable its access in the EU within one hour of receipt?", id: '64', background_color: 'rgb(223,183,230)', text_translate: 'translateY(67px)', node_height: '200px', node_width: '200px', font_size: '15px', node_margins: '-2px 32px' },
        position: { x: 5070, y: highFlowLineY - 102 },
    },
    65: {
        id: '65',
        type: 'diamondNode',
        data: { incomingHandleBottom: true, outgoingHandleTop: true, label: "Why?", id: '65', background_color: 'rgb(223,183,230)', text_translate: 'translateY(40px)', node_height: '100px', node_width: '100px', font_size: '15px', node_margins: '-2px 32px' },
        position: { x: 5625, y: highFlowLineY - 240 },
    },
    66: {
        id: '66',
        type: 'rectangleNode',
        data: { incomingHandleBottom: true, outgoingHandleTop: true, label: "Force majeure", id: '66', background_color: 'rgb(223,183,230)', node_height: '105px', node_width: '220px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 5400, y: highFlowLineY - 420 },
    },
    67: {
        id: '67',
        type: 'rectangleNode',
        data: { incomingHandleBottom: true, outgoingHandleTop: true, label: "Other impossibilities not attributable to you, including technical and operational reasons", id: '67', background_color: 'rgb(223,183,230)', node_height: '105px', node_width: '220px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 5800, y: highFlowLineY - 420 },
    },
    68: {
        id: '68',
        type: 'rectangleNode',
        data: { incomingHandleBottom: true, outgoingHandleRight: true, label: "You must inform the Competent Authority without undue delay", id: '68', background_color: 'rgb(223,183,230)', node_height: '75px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 5540, y: highFlowLineY - 680 },
    },
    69: {
        id: '69',
        type: 'rectangleNode',
        data: { incomingHandleLeft: true, outgoingHandleRight:true, label: "What do you risk if you fail to remove content within one hour of receiving the Removal Order?", id: '69', background_color: 'rgb(223,183,230)', node_height: '75px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 6100, y: highFlowLineY - 680 },
    },
    70: {
        id: '70',
        type: 'rectangleNode',
        data: { incomingHandleLeft: true, outgoingHandleBottom:true, label: "You face penalties, from formal warnings to fines (up to 4% of my global turnover for the preceding business year)", id: '70', background_color: 'rgb(245,245,245)', node_height: '75px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 6700, y: highFlowLineY - 680 },
    },
    90: {
        id: '90',
        type: 'rectangleNode',
        data: { incomingHandleTop: true, outgoingHandleBottom:true, label: 'So, apart from force majeure cases or impossibilities not attributable to you, you should be able to remove content in one hour. Let\'s go back to the general process', id: '90', background_color: 'rgb(223,183,230)', text_color: 'black', node_height: '104px', node_width: '410px', border_radius: '20px', node_margins: '0', font_size: '12px' },
        position: { x: 6660, y: highFlowLineY - 380 },

    },
    71: {
        id: '71',
        type: 'rectangleNode',
        data: { incomingHandleLeft:true, incomingHandleTop: true, outgoingHandleRight:true, label: "Have you informed the Competent Authority of the content removal without undue delay and specify the time of removal?", id: '71', background_color: 'rgb(223,183,230)', node_height: '100px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 6200, y: highFlowLineY - 57 },
    },


    72: {
        id: '72',
        type: 'diamondNode',
        data: { incomingHandleLeft:true, outgoingHandleRight:true, label: "Have you informed the user of the reasons why the content was removed / the access disabled and its right to challenge the removal order ?", id: '72', background_color: 'rgb(243,178,208)', text_color: 'black', text_translate: 'translateY(75px)', node_height: '220px', node_width: '220px', font_size: '14px', node_margins: '-2px 41px' },
        position: { x: 7200, y: highFlowLineY - 110 },
    },
    73: {
        id: '73',
        type: 'rectangleNode',
        data: { incomingHandleLeft: true, outgoingHandleRight:true, label: "Inform the user on the reasons the content was removed/disabled access and its right to challenge the order!", id: '73', background_color: 'rgb(223,183,230)', node_height: '50px', node_width: '200px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 6775, y: highFlowLineY - 140 },
    },
    74: {
        id: '74',
        type: 'diamondNode',
        data: { incomingHandleLeft: true, outgoingHandleRight:true, label: "Have you established user-friendly complaint mechanisms?", id: '74', background_color: 'rgb(243,178,208)', text_color: 'black', text_translate: 'translateY(95px)', node_height: '220px', node_width: '220px', font_size: '14px', node_margins: '-2px 41px' },
        position: { x: 8200, y: highFlowLineY - 110 },
    },
    75: {
        id: '75',
        type: 'rectangleNode',
        data: { incomingHandleLeft: true, outgoingHandleRight:true, label: "Establish user-friendly complaint mechanisms!", id: '75',background_color: 'rgb(243,178,208)', node_height: '50px', node_width: '200px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 7750, y: highFlowLineY - 140 },
    },
    76: {
        id: '76',
        type: 'diamondNode',
        data: { incomingHandleLeft: true, outgoingHandleBottom:true, label: "Your users now have the right to appeal", id: '76', background_color: 'rgb(243,178,208)', text_color: 'black', text_translate: 'translateY(95px)', node_height: '220px', node_width: '220px', font_size: '14px', node_margins: '-2px 41px' },
        position: { x: 9200, y: highFlowLineY - 110 },
    },
    77: {
        id: '77',
        type: 'rectangleNode',
        data: { incomingHandleLeft: true, outgoingHandleRight:true, label: "Inform the user about its rights to appeal", id: '77', background_color: 'rgb(243,178,208)', node_height: '50px', node_width: '200px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 8750, y: highFlowLineY - 140 },
    },
    91: {
        id: '91',
        type: 'rectangleNode',
        data: {incomingHandleTop:true, outgoingHandleBottom:true, label:'Do you also have the right to appeal?', id: '91', background_color: 'rgb(223,183,230)', text_color: 'black', node_height: '104px', node_width: '410px', border_radius: '20px', node_margins: '0', font_size: '12px' },
        position: { x: 9145, y: highFlowLineY + 250 },
    },
    78: {
        id: '78',
        type: 'rectangleNode',
        data: { incomingHandleTop: true, outgoingHandleBottom:true, label: "Yes! For cross-border removal orders, you and your users have the right to request a removal scrutiny to the residency Competent Authority within 72 hours. In general, you also have the right to challenge any removal order or decisions resulting from its review", id: '78', background_color: 'rgb(223,183,230)', text_color: 'black', node_height: '140px', node_width: '470px', border_radius: '20px', node_margins: '0', font_size: '12px', node_padding: '2px' },
        position: { x: 9115, y: highFlowLineY + 500 },
    },
    79: {
        id: '79',
        type: 'diamondNode',
        data: { incomingHandleTop: true, outgoingHandleBottom:true, outgoingHandleLeft:true, label: "Was the content removal unjustified?", id: '79', background_color: 'rgb(243,178,208)', text_color: 'black', text_translate: 'translateY(95px)', node_height: '220px', node_width: '220px', font_size: '14px', node_margins: '-2px 41px' },
        position: { x: 9200, y: highFlowLineY + 760 },
    },
    80: {
        id: '80',
        type: 'rectangleNode',
        data: { incomingHandleRight: true, outgoingHandleBottom: true, label: "You now have to reinstate the content and notify the user within 2 weeks", id: '80', background_color: 'rgb(243,178,208)', node_height: '100px', node_width: '400px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 8460, y: highFlowLineY + 815 },
    },
    81: {
        id: '81',
        type: 'diamondNode',
        data: { incomingHandleTop: true, outgoingHandleLeft:true, outgoingHandleBottom:true, label: "Were fundamental rights and freedoms infringements detected or adjudicated?", id: '81', background_color: 'rgb(243,178,208)', text_color: 'black', text_translate: 'translateY(85px)', node_height: '220px', node_width: '220px', font_size: '14px', node_margins: '-2px 41px' },
        position: { x: 9200, y: highFlowLineY + 1281},
    },
    82: {
        id: '82',
        type: 'rectangleNode',
        data: { incomingHandleRight:true, outgoingHandleLeft: true, label: "You now have to reinstate the content", id: '82', background_color: 'rgb(243,178,208)', node_height: '75px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 8460, y: highFlowLineY + 1347 },
    },
    83: {
        id: '83',
        type: 'diamondNode',
        data: { incomingHandleTop: true, outgoingHandleLeft:true, outgoingHandleBottom:true, label: "Have you informed the user that its appeal was rejected and provided an explainer?", id: '83', background_color: 'rgb(243,178,208)', text_color: 'black', text_translate: 'translateY(90px)', node_height: '220px', node_width: '220px', font_size: '14px', node_margins: '-2px 41px' },
        position: { x: 9200, y: highFlowLineY + 1800},
    },
    84: {
        id: '84',
        type: 'rectangleNode',
        data: { incomingHandleRight: true, outgoingHandleBottom:true, label: "Inform the user that about the rejection of the appeal and provide explanations", id: '84', background_color: 'rgb(243,178,208)', node_height: '75px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 8460, y: highFlowLineY + 1870 },
    },
    85: {
        id: '85',
        type: 'rectangleNode',
        data: { incomingHandleTop: true, incomingHandleRight:true, outgoingHandleLeft:true, label: "The Removal Order is now final  - the Removal Order is final after the expiry of the deadline for appeal, where no appeal has been lodged or upon confirmation following an appeal", id: '85', background_color: 'rgb(193,171,225)', node_height: '115px', node_width: '410px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 8423, y: highFlowLineY + 2200 },
    },
    86: {
        id: '86',
        type: 'diamondNode',
        data: { incomingHandleTop: true, incomingHandleRight:true, outgoingHandleLeft:true, label: "What should you do next?", id: '86', background_color: 'rgb(217,219,240)', text_translate: 'translateY(60px)', node_height: '150px', node_width: '150px', font_size: '15px', node_margins: '-2px 30px' },
        position: { x: 8000, y: highFlowLineY + 1314 },
    },
    92: {
        id: '92',
        type: 'diamondNode',
        data: {incomingHandleRight:true, outgoingHandleTop:true, label: "What should you do next?", id: '92', background_color: 'rgb(217,219,240)', text_translate: 'translateY(60px)', node_height: '150px', node_width: '150px', font_size: '15px', node_margins: '-2px 30px' },
        position: { x: 8000, y: highFlowLineY + 2184 },
    },
    87: {
        id: '87',
        type: 'rectangleNode',
        data: { incomingHandleBottom: true, outgoingHandleTop:true, label: "You must preserve all content removed and related data after a Removal Order for six months at least", id: '87', background_color: 'rgb(217,219,240)', node_height: '85px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 7935, y: highFlowLineY + 1860 },
    },
    88: {
        id: '88',
        type: 'rectangleNode',
        data: { incomingHandleBottom: true, outgoingHandleLeft:true, label: "You will need these informations for your transparency reports - this also concerns specific measures", id: '88', background_color: 'rgb(217,219,240)', node_height: '75px', node_width: '340px', border_radius: '10px', node_margins: '0', node_padding: '10px' },
        position: { x: 7935, y: highFlowLineY + 1515 },
    },


    89: {
        id: '89',
        type: 'rectangleNode',
        data: { incomingHandleLeft: true, label: 'Congratulations, you have gone through the all process ! You can now download the whole process map', id: '89', background_color: 'rgb(245,245,245)', text_color: 'black', node_height: '104px', node_width: '410px', border_radius: '20px', node_margins: '0', font_size: '12px' },
        position: { x: 7400, y: highFlowLineY + 2050 },
    },




}

export const initialEdges_1: Edge[] = [
    { id: "e1-2", source: "1", target: "2", label: "No", sourceHandle: 'source-3', },
    { id: "e2-3", source: "2", target: "3", label: "No / I don't know", },
    { id: "e3-5", source: "3", target: "5", label: "No", },
    { id: "e3-5", source: "2", target: "6", label: "Yes", },

    { id: "e6-7", source: "6", target: "7", label: "Yes", },

    { id: "e7-8", source: "7", target: "8", label: "Not Sure", sourceHandle: 'source-2' },
    { id: "e8-9", source: "8", target: "9", },
    { id: "e9-10", source: "9", target: "10", sourceHandle: 'source-1', targetHandle: 'target-3', label: "Yes", },
    { id: "e7-10", source: "7", target: "10", sourceHandle: 'source-1', targetHandle: 'target-3', label: "Yes", },
    { id: "e10-e11", source: "10", target: "11", targetHandle: 'target-3' },
    { id: "e11-12", source: "11", target: "12" },
    { id: "e12-13", source: "12", target: "13" },
    { id: "e13-14", source: "13", target: "14", label: "Got It!" },
    { id: "e14-15", source: "14", target: "15", label: "Got It!" },
    { id: "e15-16", source: "15", target: "16", label: "Got It!" },
    { id: "e16-17", source: "16", target: "17", label: "Got It!" },
    { id: "e17-18", source: "17", target: "18" },
    { id: "e18-19", source: "18", target: "19" },

    { id: "e43-11", source: "43", target: "11", label: "" },
    { id: "e42-43", source: "42", target: "43", },
    { id: "e41-43", source: "41", target: "43", },

    { id: "e19-20", source: "19", target: "20", label: "Got It!" },
    { id: "e20-21", source: "20", target: "21", label: "Got It!" },
    { id: "e21-22", source: "21", target: "22", label: "Got It!" },
    { id: "e22-23", source: "22", target: "23", label: "Got It!" },
    { id: "e23-24", source: "23", target: "24", label: "Got It!" },

    { id: "e24-25", source: "24", target: "25", label: "Yes" },
    { id: "e24-26", source: "24", target: "26", label: "Not Yet..." },

    { id: "e25-27", source: "25", target: "27", label: "No", targetHandle: 'target-4' },
    { id: "e25-28", source: "25", target: "28", label: "Yes", targetHandle: 'target-4' },

    { id: "e26-27", source: "26", target: "27" },
    { id: "e27-28", source: "27", target: "28" },

    { id: "e28-29", source: "28", target: "29", label: "No" },
    { id: "e28-30", source: "28", target: "30", label: "Yes", targetHandle: 'target-4' },
    { id: "e29-30", source: "29", target: "30" },

    { id: "e1-40", source: "1", target: "40", },
    { id: "e40-41", source: "40", target: "41", },
    { id: "e40-42", source: "40", target: "42", },
    { id: "e40-44", source: "40", target: "44", },
    { id: "e44-45", source: "44", target: "45", },
    { id: "e45-46", source: "45", target: "46", },
    { id: "e46-47", source: "46", target: "47", label: "No", sourceHandle: 'source-3', },
    { id: "47-48", source: "47", target: "48", label: "No", sourceHandle: 'source-2', },
    { id: "47-11", source: "47", target: "11", label: "Yes", sourceHandle: 'source-3', },
    { id: "47-11", source: "48", target: "11", label: "Yes", sourceHandle: 'source-3', },
    { id: "e46-49", source: "46", target: "49", label: "Yes", targetHandle: 'target-4'},
    { id: "e49-55", source: "49", target: "55", label: "No", sourceHandle: 'source-2', },
    { id: "e55-56", source: "55", target: "56" },

    { id: "e48-49", source: "48", target: "49", label: "No", sourceHandle: 'source-1', },

    { id: "e54-59", source: "54", target: "59", label: "No / I don't know" },
    { id: "e54-60", source: "54", target: "60", label: "Yes" },

    { id: "e59-61", source: "59", target: "61" },
    { id: "e60-61", source: "60 ", target: "61" },
    { id: "e61-62", source: "61", target: "62", },


    { id: "e30-31", source: "30", target: "31", label: "No" },
    { id: "e30-32", source: "30", target: "32", label: "Yes" },

    { id: "e31-32", source: "31", target: "32", targetHandle: 'target-4' },
    { id: "e32-33", source: "32", target: "33", },

    { id: "e33-34", source: "33", target: "34", label: "Got It!" },
    { id: "e34-35", source: "34", target: "35", label: "Got It!" },
    { id: "e35-36", source: "35", target: "36", label: "Got It!" },
    { id: "e36-37", source: "36", target: "37", label: "Got It!" },
    { id: "e37-38", source: "37", target: "38", label: "Got It!" },
    { id: "e38-39", source: "38", target: "39", label: "Got It!" },
    { id: "e39-89", source: "39", target: "89", },


    { id: "e56-57", source: "56", target: "57" },
    { id: "e57-58", source: "57", target: "58" },
    { id: "e58-54", source: "58", target: "54", targetHandle: 'target-3' },
    { id: "e49-50", source: "49", target: "50", label: "Yes" },
    { id: "e50-51", source: "50", target: "51" },
    { id: "e51-52", source: "51", target: "52", label: "Yes" },
    { id: "e51-53", source: "51", target: "53", label: "No" },
    { id: "e52-54", source: "52", target: "54", targetHandle: 'target-4', },
    { id: "e53-54", source: "53", target: "54" },

    { id: "e52-60", source: "52", target: "60" },
    { id: "e53-60", source: "53", target: "60" },
    { id: "e58-60", source: "58", target: "60" },

    { id: "e60-61", source: "60", target: "61" },
    { id: "e62-63", source: "62", target: "63", label: "Yes", targetHandle: 'target-4' },
    { id: "e63-64", source: "63", target: "64" },
    { id: "e61-63", source: "62", target: "64", label: "No", sourceHandle: 'source-2', targetHandle: 'target-4' },

    { id: "e64-65", source: "64", target: "65", label: "No" },
    { id: "e64-71", source: "64", target: "71", label: "Yes", targetHandle: 'target-4' },

    {id: "e70-90", source:"70", target:"90"},
    {id: "e69-70", source: "69", target: "70"},
    {id: "e68-69", source: "68", target: "69"},
    { id: "e90-71", source: "90", target: "71", targetHandle: 'target-1' },

    { id: "e65-66", source: "65", target: "66" },
    { id: "e65-67", source: "65", target: "67" },
    { id: "e66-68", source: "66", target: "68" },
    { id: "e67-68", source: "67", target: "68" },

    { id: "e71-73", source: '71', target: '73', label: "No", },
    { id: "e71-72", source: '71', target: '72', label: "Yes", targetHandle: 'target-4'},
    { id: "e73-72", source: '73', target: '72', targetHandle: 'target-4'},

    { id: "e72-74", source: '72', target: '74', label: "Yes", },
    { id: "e72-75", source: '72', target: '75', label: "No", },
    { id: "e75-74", source: '75', target: '74',},

    { id: "e74-76", source: '74', target: '76', label: "Yes", },
    { id: "e74-77", source: '74', target: '77', label: "No", },
    { id: "e77-76", source: '77', target: '76',},

    { id: "e76-91", source: '76', target: '91', },
    { id: "e91-78", source: "91", target: "78",},
    { id: "e78-79", source: "78", target: "79",},

    { id: "e79-80", source: "79", target: "80", label: "Yes", sourceHandle: 'source-4', },
    { id: "e80-86", source:"80", target:"86"},
    { id: "e86-31", source:"86", target:"31", targetHandle: 'target-3'},
    { id: "e79-81", source:"79", target:"81", label: "No", sourceHandle: 'source-3', },

    { id: "e81-82", source:"81", target:"82", label: "Yes", sourceHandle: 'source-4', },
    { id: "e82-86", source:"82", target:"86", targetHandle: 'target-2'},

    { id: "e81-83", source:"81", target:"83", label: "No", sourceHandle: 'source-3', },

    { id: "e83-84", source:"83", target:"84", label: "No", sourceHandle: 'source-4', },
    { id: "e83-85", source:"83", target:"85", label: "Yes", sourceHandle: 'source-3', targetHandle:'target-2' },
    { id: "e84-85", source:"84", target:"85",},

    { id: "e85-87", source:"85", target:"92",},
    { id: "e92--87", source:"92", target:"87",},
    { id: "e87-88", source:"87", target:"88",},
    { id: "e88-31", source:"88", target:"31", targetHandle: 'target-3'},
];


export const stateToQuestions: StateToQuestions = {
    1: {
        question: 'Are you an HSP offering its services in the EU that has been ‘exposed to terrorist content’?',
        answers: [{ answer_text: 'Yes', answer_add: [40] }, { answer_text: 'No', answer_add: [2] }]
    },
    40: {
        question: 'How was the terrorist content detected?',
        answers: [
            { answer_text: 'In house tools & Monitoring', answer_add: [41, 43] },
            { answer_text: 'User Notices', answer_add: [42, 43] },
            { answer_text: 'LEA\'s', answer_add: [44, 45, 46] }
        ]
    },
    43: {
        question: 'Next steps depend of the tools you are using',
        answers: [{ answer_text: 'Got It!', answer_add: [10, 11, 12, 13]}]
    },
    12: {
        question: 'Let\'s look at the types of specific measures you can take',
        answers: [{ answer_text: 'Continue', answer_add: [13]}]
    },
    2: {
        question: 'Do you think you might encounter terrorist content on your platform in the future?',
        answers: [{ answer_text: 'Yes', answer_add: [6] }, { answer_text: 'I don\'t know', answer_add: [3] }, { answer_text: 'No', answer_add: [3] }]
    },
    3: {
        question: 'Do you have user-generated content on you platform?',
        answers: [{ answer_text: 'Yes', answer_add: [4, 6] }, { answer_text: 'No', answer_add: [5] }]
    },
    5: {
        question: 'You should take the FRISCO\'s Self Assessment Questionnaire to make sure you are out of scope',
        answers: []
    },
    6: {
        question: 'Do you have the right tools in place?',
        answers: [{ answer_text: 'Yes', answer_add: [7] }, { answer_text: 'Not Sure', answer_add: [8, 9] }]
    },
    7: {
        question: 'Are you compliant with the TCO Regulation?',
        answers: [{ answer_text: 'Yes', answer_add: [10, 11, 12, 13] }, { answer_text: 'Not Sure', answer_add: [8, 9] }]
    },
    9: {
        question: 'Done?',
        answers: [{ answer_text: 'Yes', answer_add: [10, 11, 12, 13] }]
    },

    13: {
        question: 'Technical and operational measures (e.g. staffing, technical means, etc.)',
        answers: [{ answer_text: 'Got It!', answer_add: [14] }]
    },
    14: {
        question: 'Accessible and user-friendly reporting mechanisms: This can be a simple form or a dedicated email address.',
        answers: [{ answer_text: 'Got It!', answer_add: [15] }]
    },

    15: {
        question: 'Mechanisms to increase the awareness of terrorist content on services, such as mechanisms for user moderation',
        answers: [{ answer_text: 'Got It!', answer_add: [16] }]
    },

    16: {
        question: 'Any other measures to address the dissemination of terrorist content on your services: This can be through accessing the GIFCT hash sharing database, or through engaging with the FRISCO project.',
        answers: [{ answer_text: 'Got It!', answer_add: [17, 18, 19] }]
    },

    19: {
        question: 'You can decide on the types of the specific measures you take, but they should belong to these 4 categories',
        answers: [{ answer_text: 'Got It!', answer_add: [20] }]
    },

    20: {
        question: 'Measures must be targeted and proportionate (capabilities,financial resources, number of users, content available...)',
        answers: [{ answer_text: 'Got It!', answer_add: [21] }]
    },
    21: {
        question: 'Measures must respect fundamental rights (such as freedom of expression and information, privacy, protection of data...)',
        answers: [{ answer_text: 'Got It!', answer_add: [22] }]
    },
    22: {
        question: 'Measures must apply in a diligent and non-discriminatory manner',
        answers: [{ answer_text: 'Got It!', answer_add: [23] }]
    },
    23: {
        question: 'Measures must be effective in mitigating the level of exposure to terrorist content',
        answers: [{ answer_text: 'Got It!', answer_add: [24] }]
    },


    24: {
        question: 'Have you already implemented these specific measures?',
        answers: [{ answer_text: 'Yes', answer_add: [25] }, { answer_text: 'Not Yet...', answer_add: [26, 27, 28] }]
    },

    25: {
        question: 'Have you reported to your residency Competent Authority about these specific measures?',
        answers: [{ answer_text: 'Yes', answer_add: [28] }, { answer_text: 'No', answer_add: [27, 28] }]
    },

    28: {
        question: 'In your Terms & Conditions, do you clearly state your policy for counterring terrorist content?',
        answers: [{ answer_text: 'Yes', answer_add: [30] }, { answer_text: 'No', answer_add: [29, 30] }]
    },

    30: {
        question: 'Do you publish a yearly transparency report? <br> <div style="font-size: 0.9rem;">Do you need help building your transparency reports? Consider checking the following examples from Big Tech:</div> <a href="https://www.tiktok.com/transparency/en/tco-regulation/" style="font-size: 0.9rem; color: #2400a2;">Tiktok</a><br><a href="https://transparency.fb.com/sr/eu-online-report-ig-feb28-23" style="font-size: 0.9rem; color: #2400a2;">Instagram</a><br><a href="https://transparency.fb.com/sr/eu-online-report-fb-feb28-23" style="font-size: 0.9rem; color: #2400a2;">Facebook</a><br><a href="https://safety.twitch.tv/s/article/2023-EU-Terrorist-Content-Transparency-Report?language=en_US" style="font-size: 0.9rem; color: #2400a2;">Twitch</a><br><a href="https://transparency.automattic.com/tumblr/eu-terrorist-content-removal-orders/" style="font-size: 0.9rem; color: #2400a2;">Automattic</a>',
        answers: [{ answer_text: "Yes", answer_add: [32, 33] }, { answer_text: "No", answer_add: [31, 32, 33] }]
    },
    33: {
        question: 'Measures to identify and remove content',
        answers: [{ answer_text: "Got it!", answer_add: [34] }]
    },
    34: {
        question: 'Measures to address the reappearance of terrorist content (in particular when using automated tools)',
        answers: [{ answer_text: "Got it!", answer_add: [35] }]
    },
    35: {
        question: 'Number of terrorist content/items removed or disabled in the EU (following a RO or specific measures) - and number of content not removed',
        answers: [{ answer_text: "Got it!", answer_add: [36] }]
    },
    36: {
        question: 'Number and outcome of complaints handled',
        answers: [{ answer_text: "Got it!", answer_add: [37] }]
    },
    37: {
        question: 'Number and outcome of admin or judicial review proceedings you requested',
        answers: [{ answer_text: "Got it!", answer_add: [38] }]
    },
    38: {
        question: 'Number of cases in which you were required to reinstate content following a review',
        answers: [{ answer_text: "Got it!", answer_add: [39, 89] }]
    },

    46: {
        question: 'Is it the first one you receive?',
        answers: [{ answer_text: 'Yes', answer_add: [49] }, { answer_text: 'No', answer_add: [47] }]
    },

    47: {
        question: 'Have you received 2 (or more) final  Removal Orders in a 12 months period?',
        answers: [{ answer_text: 'Yes', answer_add: [11, 12, 13] }, { answer_text: 'No', answer_add: [48] }]
    },
    48: {
        question: 'Does your residency Competent Authority decided you are "exposed to terrorist content" and has notified you of this?',
        answers: [{ answer_text: 'Yes', answer_add: [11, 12, 13] }, { answer_text: 'No', answer_add: [49] }]
    },
    49: {
        question: 'Was it issued by the Residency Competent Authority?',
        answers: [{ answer_text: 'Yes', answer_add: [50, 51] }, { answer_text: 'No', answer_add: [55, 56, 57, 58, 60, 61, 62] }]
    },
    51: {
        question: 'Were you provided with applicable procedures and deadlines 12 hours before the Removal Order was issued?',
        answers: [{ answer_text: 'Yes', answer_add: [52, 60, 61, 62] }, { answer_text: 'No', answer_add: [53, 60, 61, 62] }]
    },
    54: {
        question: 'Have you received the removal order through your single Contact Point?',
        answers: [{ answer_text: 'No', answer_add: [60, 61, 62] }, { answer_text: 'I don\'t know', answer_add: [60, 61, 62] }, { answer_text: 'Yes', answer_add: [60, 61, 62] }]
    },
    62: {
        question: 'Does the removal order contain manifest errors or lack sufficient information?',
        answers: [{ answer_text: 'Yes', answer_add: [63, 64] }, { answer_text: 'No', answer_add: [64] }]
    },
    64: {
        question: 'Are you able remove the content or disable its access in the EU within one hour of receipt?',
        answers: [{ answer_text: "Yes", answer_add: [71] }, { answer_text: "No", answer_add: [65, 66, 67, 68, 69, 70, 90, 71] }]
    },
    71: {
        question: "Have you informed the Competent Authority of the content removal without undue delay and specify the time of removal?",
        answers: [{ answer_text: "Yes", answer_add: [72]}, {answer_text:"No", answer_add:[73,72]}]
    },
    72: {
        question: "Have you informed the user of the reasons why the content was removed / the access disabled and its right to challenge the removal order ?",
        answers: [{ answer_text: "Yes", answer_add: [74]}, {answer_text:"No", answer_add:[75, 74]}]
    },
    74: {
        question: "Have you established user-friendly complaint mechanisms?",
        answers: [{ answer_text: "Yes", answer_add: [76, 91, 78, 79]}, {answer_text:"No", answer_add:[77, 76, 91, 78, 79]}]
    },
    79: {
        question: "Was the content removal unjustified?",
        answers: [{ answer_text: "Yes", answer_add: [80, 86, 31, 32, 33]}, {answer_text:"No", answer_add:[81]}]
    },
    81: {
        question: "Were fundamental rights and freedoms infrigements detected or adjudicated?",
        answers: [{ answer_text: "Yes", answer_add: [82, 86, 31, 32, 33]}, {answer_text:"No", answer_add:[83]}]
    },
    83: {
        question: "Have you informed the user that its appeal was rejected and provided an explainer?",
        answers: [{ answer_text: "Yes", answer_add: [85, 92]}, {answer_text:"No", answer_add:[84, 85, 92]}]
    },
    92: {
        question: "What should you do next?",
        answers: [{answer_text: "Continue", answer_add:[87, 88, 31]}]
        
    },
    31: {
        question: "You must publish a yearly transparency report about measures you took to identify and remove terrorist content",
        answers: [{answer_text: "Got It", answer_add:[32, 33]}]
    },
    89: {
        question: "You can now download the whole process map",
        is_last_node: true,
    },
};