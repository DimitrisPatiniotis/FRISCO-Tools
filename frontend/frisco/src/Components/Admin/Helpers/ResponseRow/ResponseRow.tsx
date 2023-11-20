import React from 'react';
import './ResponseRow.css';
import StatusCircle from '../StatusCyrcle/StatusCircle';
import { IonIcon } from '@ionic/react';
import { ACTIVE_URL } from '../../../../constants';
import { useAuthContext } from '../../../../utils/useAuthContext';
import { useNavigate } from 'react-router-dom';

interface ResponseRowProps {
  id: number;
  status: "completed" | 'pending' | 'abandoned';
  score: string;
  dateCompleted: string;
  q_answered: string;
}

const ResponseRow: React.FC<ResponseRowProps> = ({ id, score, q_answered, dateCompleted, status }) => {
  const { authTokens } = useAuthContext();
  const navigate = useNavigate();
  const context = useAuthContext();
  let circleColor = '';

  switch (status) {
    case 'completed':
      circleColor = 'green';
      break;
    case 'pending':
      circleColor = 'orange';
      break;
    case 'abandoned':
      circleColor = 'red';
      break;
    default:
      circleColor = 'gray';
  }

  const downloadResponse = async () => {
    if (!authTokens || !authTokens.access) {
      return;
    }
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens.access}`,
      },

    }
    try {
      const response = await fetch(`${ACTIVE_URL}/api/download_response/${id}/`, requestOptions);
      if (response.ok) {
        const contentDisposition = response.headers.get('content-disposition');
        const filename = contentDisposition
          ? contentDisposition.split('filename=')[1]
          : 'FRISCO_Response_' + id + '.csv';

        const blob = await response.blob();
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        a.click();

      } else {
        console.error('Failed to fetch questions');
        if (response.status === 401) {
          // context.logoutUser();
          // navigate('/login');
        }
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }

  return (
    <div className='response-row-wrapper'>
      <div>{q_answered}</div>
      <div>{score}</div>
      <div>{dateCompleted}</div>
      <div className='flex'><StatusCircle circleColorHex={circleColor} />{status.charAt(0).toUpperCase() + status.slice(1)}</div>
      <IonIcon icon='download-outline' className='response-row-icon' onClick={downloadResponse} ></IonIcon>
    </div>
  );
};

export default ResponseRow;