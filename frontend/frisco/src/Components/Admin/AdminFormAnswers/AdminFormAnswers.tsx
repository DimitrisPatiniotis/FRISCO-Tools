import React, { useState, useEffect } from 'react';
import AdminMainHeader from '../AdminMainHeader/AdminMainHeader';
import AdminBox from '../Helpers/AdminBox/AdminBox';
import ResponseRow from '../Helpers/ResponseRow/ResponseRow';
import AdimBoxTitle from '../Helpers/AdminBoxTitle/AdimBoxTitle';
import ResponseRowHeader from '../Helpers/ResponseRowHeader/ResponseRowHeader';
import { DatePickerWithRange } from '../Helpers/DatePicker/DatePicker';
import AdminSelect from '../Helpers/AdminSelect/AdminSelect';
import './AdminFormAnswers.css';
import { addDays, format } from "date-fns";
import { Button } from '../../../@/components/ui/button';
import { IonIcon } from '@ionic/react';
import { ACTIVE_URL } from '../../../constants';
import { useAuthContext } from '../../../utils/useAuthContext';
import { useNavigate } from 'react-router-dom';

const AdminForm: React.FC = () => {
    const { authTokens } = useAuthContext();
    const context = useAuthContext();
    const [fromDate, setFromDate] = useState<string>(format(addDays(new Date(), -6), "dd-MM-y"));
    const [toDate, setToDate] = useState<string>(format(new Date(), "dd-MM-y"));
    const [responses, setResponses] = useState([]);
    const [status, setStatus] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const navigate = useNavigate();

    const downloadResults = async () => {

        try {
            if (!authTokens || !authTokens.access) {
                return;
            }
            const response = await fetch(`${ACTIVE_URL}/api/export_responses/${fromDate}/${toDate}/${status}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`,
                }
            });
            if (response.ok) {
                const contentDisposition = response.headers.get('content-disposition');
                const filename = contentDisposition
                    ? contentDisposition.split('filename=')[1]
                    : 'FRISCO_Responses.csv';

                const blob = await response.blob();
                const a = document.createElement('a');
                a.href = window.URL.createObjectURL(blob);
                a.download = filename;
                a.click();
            } else {
                console.error('Failed to download responses');
                if (response.status === 401) {
                    context.logoutUser();
                    navigate('/login');
                }
            }
        } catch (error) {
            console.error('Error downloading responses:', error);
        }
    };


    useEffect(() => {
        const fetchResponses = async () => {
            if (!authTokens || !authTokens.access) {
                return;
            }
            try {
                const response = await fetch(`${ACTIVE_URL}/api/all_responses/${fromDate}/${toDate}/`, {
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
    }, [fromDate, toDate]);

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
        setCurrentPage(1);
    };

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        setCurrentPage(1);
    };

    let filteredResponses = status === 'all' ? responses : responses.filter((r) => r['status'] === status);
    useEffect(() => {
        filteredResponses = status === 'all' ? responses : responses.filter((r) => r['status'] === status);
    }, [status]);

    return (
        <div className=''>
            <AdminMainHeader pageTitle='Form Responses' />
            <AdminBox>
                <AdimBoxTitle title='Filter Form Responses' />
                <div className='form-responses-filter--wrapper'>
                    <div className='form-responses-filter-options'>
                        <div>
                            <div className='form-responses-filter-title'>
                                Dates
                            </div>
                            <DatePickerWithRange onFromDateChange={(newFromDate) => setFromDate(newFromDate)} onToDateChange={(newToDate) => setToDate(newToDate)} />
                        </div>
                        <div>
                            <div className='form-responses-filter-title'>
                                Response Status
                            </div>
                            <AdminSelect selectTitle='Status' options={['all', 'completed', 'pending', 'abandoned']} onStringOptionChange={handleStatusChange} />
                        </div>
                        <div>
                            <div className='form-responses-filter-title'>
                                Results Per Page
                            </div>
                            <AdminSelect selectTitle='Results Per Page' options={[10, 20, 50, 100]} onNumberOptionChange={handlePageSizeChange} />
                        </div>
                    </div>
                    <div className='form-responses-filter--download-all'>
                        <Button variant="outline" className='download-all-responses' onClick={downloadResults}>Download Results <IonIcon icon='download' className='ml-1 text-lg'></IonIcon></Button>
                    </div>
                </div>
                <ResponseRowHeader />
                {filteredResponses.map((r) => (
                    <ResponseRow
                        key={r['id']}
                        id={r['id']}
                        score={r['score']}
                        q_answered={r['q_answered']}
                        dateCompleted={r['last_edited']}
                        status={r['status']}
                    />
                ))}
            </AdminBox>
        </div>
    )
};

export default AdminForm;