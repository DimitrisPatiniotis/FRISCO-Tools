import React, { useEffect, useState } from 'react';
import { ACTIVE_URL } from '../../../../constants';
import { useAuthContext } from '../../../../utils/useAuthContext';
import { useNavigate } from 'react-router-dom';
import LineChart from '../../Helpers/LineChart/LineChart';
import NumberCounter from '../../../../utils/NumberCounter/NumberCounter';

interface BasicStats {
    total_responses: number;
    responses_per_day: { [day: string]: number };
    average_score: number;
    current_month: string;
    current_year: string;
}

const AdminMonthResponses = () => {
    const navigate = useNavigate();
    const context = useAuthContext();
    const { authTokens } = useAuthContext();

    const [stats, setStats] = useState<BasicStats>({} as BasicStats);

    useEffect(() => {
        const fetchResponses = async () => {
            if (!authTokens || !authTokens.access) {
                return;
            }
            try {
                const response = await fetch(`${ACTIVE_URL}/api/get_basic_admin_stats/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authTokens.access}`,
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setStats(data);
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

    if (!stats || !stats.responses_per_day) {
        // TODO: Add loading spinner or error handling
        return <div></div>;
    }

    // Convert the responses_per_day dictionary to an array
    const chartData = Object.entries(stats.responses_per_day).map(([day, count]) => ({
        label: day,
        value: count,
    }));

    return (
        <div className='flex flex-wrap justify-between'>
            <div className='w-2/3 pr-1'>
                <div className='py-5 px-4 border shadow-sm my-2 bg-white rounded-md h-60'>
                    <div className='flex items-center w-full justify-center'>
                        <h2 className='text-2xl py-2'>Per Day Responses - {stats.current_month} {stats.current_year}</h2>
                    </div>
                    <div className='my-1'>
                        <LineChart data={chartData} />
                    </div>

                </div>
            </div>
            <div className='w-1/3 pl-1'>
                <div className='py-5 px-4 border shadow-sm my-2 bg-white rounded-md h-60'>
                    <div className='flex items-center w-full justify-center h-1/4'>
                        <h2 className='text-2xl py-2'>General Stats - {stats.current_month} {stats.current_year}</h2>
                    </div>
                    <div className='flex h-3/4'>
                        <div className='w-1/2 flex items-center justify-center flex-col'>
                            <div className='text-lg mb-2'>Total Responses:</div>
                            <div className='text-3xl'><NumberCounter endValue={stats.total_responses} duration={1300}/></div>
                        </div>
                        <div className='w-1/2 flex items-center justify-center flex-col'>
                            <div className='text-lg mb-2'>Average Score:</div>
                            <div className='text-3xl'><NumberCounter endValue={stats.average_score} duration={1300} decimals={2} /></div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default AdminMonthResponses;
