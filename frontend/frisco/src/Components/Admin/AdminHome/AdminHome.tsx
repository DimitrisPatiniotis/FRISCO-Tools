import React, {useState, useEffect} from 'react';
import AdminMainHeader from '../AdminMainHeader/AdminMainHeader';
import AdminQuestionResults from './AdminQuestionResults/AdminQuestionResultsMC/AdminQuestionResults';
import { ACTIVE_URL } from '../../../constants';
import { useAuthContext } from '../../../utils/useAuthContext';
import { useNavigate } from 'react-router-dom';
import AdminMonthResponses from './AdminMonthResponses/AdminMonthResponses';

interface Response {
    question_type: string;
    question_category: string;
    question_id: number;
    question_text: string;
    response_counts: { text: string; count: string }[];
}

interface Responses extends Array<Response> {}

const AdminHome: React.FC = () => {
    const navigate = useNavigate();
    const context = useAuthContext();
    const { authTokens } = useAuthContext();
    const [responses, setResponses] = useState<Responses>({} as Responses);

    useEffect(() => {
        const fetchResponses = async () => {
            if (!authTokens || !authTokens.access) {
                return;
            }
            try {
                const response = await fetch(`${ACTIVE_URL}/api/get_questionnaire_answer_stats/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authTokens.access}`,
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setResponses(data);
                } else {
                    console.error('Failed to fetch responses');
                    if (response.status === 401) {
                        context.logoutUser();
                        navigate('/login');
                    }
                }
            } catch (error) {
                console.error('Error fetching responses:', error);
            }
        };

        fetchResponses();
    }, []);

    return (
        <div className='admin-home'>
            <AdminMainHeader pageTitle='Dashboard' />
            <AdminMonthResponses />
            <AdminQuestionResults responses={responses} />
        </div>
    )
};

export default AdminHome;