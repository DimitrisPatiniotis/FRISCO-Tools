import React from 'react';
import DonutChart from '../../../Helpers/DonutChart/DonutChart';
import BarChart from '../../../Helpers/BarChart/BarChart';
import { IonIcon } from '@ionic/react';

interface Response {
    question_type: string;
    question_category: string;
    question_id: number;
    question_text: string;
    response_counts: { text: string; count: string }[];
}

interface Responses extends Array<Response> { }

interface AdminQuestionResultsProps {
    responses: Responses;
}

const AdminQuestionResults: React.FC<AdminQuestionResultsProps> = ({ responses }) => {
    if (!responses || !responses[0]) {
        // TODO: Add loading spinner
        return <div className='h-screen'></div>;
    }

    const isOdd = (num: number) => num % 2;

    return (
        <div className='flex flex-wrap justify-between'>
            {responses.map((response) => (
                <div className={`w-2/4 ${isOdd(responses.indexOf(response)) ? 'pl-2' : 'pr-2'}`} key={response.question_id}>
                    <div key={response.question_id} className='py-3 px-4 border shadow-sm my-2  bg-white rounded-md'>
                        <div className='mb-2 flex justify-between items-center'>
                            <div>
                                <p className='text-md my-1'>{response.question_category}</p>
                                <h3 className='text-lg mb-1'>{response.question_text}</h3>
                            </div>
                            <div className='flex items-center justify-center'>
                                <IonIcon icon="ellipsis-vertical" className='text-gray-700 text-lg cursor-pointer' />
                            </div>
                        </div>
                    
                        {response.question_type === 'multiple_choice' && (
                                <DonutChart data={Object.entries(response.response_counts).map(([key, value]) => ({
                                    label: key,
                                    value: parseInt(value.toString()),
                                }))} />
                        )}
                        {response.question_type === 'multiple_select' && (
                            <BarChart data={Object.entries(response.response_counts).map(([key, value]) => ({
                                label: key,
                                value: parseInt(value.toString()),
                            }))} />
                        )}
                    </div>
                </div>

            ))}
        </div>
    );
};

export default AdminQuestionResults;
