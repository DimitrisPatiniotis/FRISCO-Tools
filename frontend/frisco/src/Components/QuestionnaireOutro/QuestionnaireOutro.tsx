import React, { useState, useEffect } from 'react';
import { ACTIVE_URL } from '../../constants';
import EmailQuestion from '../Question/EmailQuestion/EmailQuestion';
import NumberCounter from '../../utils/NumberCounter/NumberCounter';

interface QuestionnaireOutroProps {
  questionnaireId: number;
  questionnaireState?: string;
  responseId: string;
}

const QuestionnaireOutro: React.FC<QuestionnaireOutroProps> = ({ questionnaireId, responseId, questionnaireState }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
  const [complianceScore, setComplianceScore] = useState<number>(0);

  useEffect(() => {
    fetch(`${ACTIVE_URL}/api/questionnaire/${questionnaireId}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTitle(data.outro_title);
        setDescription(questionnaireState === 'notApplicable'
            ? 'It seems that your activities/organisation are not affected by the EU TCO Regulation, we sincerely appreciate your time and effort in completing the FRISCO self-assessment questionnaire'
            : data.outro_text);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [questionnaireId]);

  useEffect(() => {
    fetch(`${ACTIVE_URL}/api/response/${responseId}/get_score/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setComplianceScore(data.score);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [questionnaireId]);

  const sendEmail = async (email: string) => {
    console.log(responseId)
    try {

      const response = await fetch(`${ACTIVE_URL}/api/set_response_email/${responseId}/email/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'email': email }),
      });
      if (response.ok) {
        setEmailSubmitted(true);
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }



  const downloadResponse = async () => {

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const response = await fetch(`${ACTIVE_URL}/api/user_download_response/${responseId}/`, requestOptions);
      if (response.ok) {
        const filename = 'FRISCO_Questionnaire_Response_Overview.csv';

        const blob = await response.blob();
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        a.click();
      } else {
        console.error('Failed to fetch questions');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }

  const downloadPdf = async () => {

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const response = await fetch(`${ACTIVE_URL}/api/user_download_pdf/${responseId}/`, requestOptions);
      if (response.ok) {
        const contentDisposition = response.headers.get('content-disposition');
        const filename = contentDisposition
          ? contentDisposition.split('filename=')[1]
          : 'FRISCO_Response_Overview.pdf';

        const blob = await response.blob();
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        a.click();
      } else {
        console.error('Failed to fetch questions');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }

  return (

    <div className='text-center question-slide relative'>
      <h2 className='text-4xl font-bold mb-4 text-neutral-800'>{title}</h2>
      <p className='mb-2 text-neutral-600'>{description}</p>
      { questionnaireState !== 'notApplicable' && (
          <div className='flex justify-center text-3xl flex-col'>
            <h3 className='text-2xl font-bold mb-3 pt-3 text-neutral-800'>Your Compliance Score Is</h3>
            <div className='flex w-full items-center justify-center gap-1'>
              <NumberCounter endValue={complianceScore} duration={500} text_class={'text-frisco_orange'} />
              <span className='text-frisco_orange'>%</span>
            </div>
          </div>
      )
      }

      {emailSubmitted ? (
        <h3 className='text-2xl font-bold mb-4 pt-4 text-neutral-800'>Thank you for providing your email!</h3>
      ) : (
        <div>
          <h3 className='text-2xl font-bold mb-4 pt-4 text-neutral-800'>Let's stay in touch!</h3>
          <div className='flex items-center w-full justify-center'>
            <EmailQuestion placeholder='address@example.com' className='flex-row gap-3 justify-center w-full ' submitButtonText='Submit' sendEmail={sendEmail} />
          </div>
        </div>
      )}
      {complianceScore !== 0 && questionnaireState !== 'notApplicable' && (<>
          <h3 className='text-2xl font-bold mb-4 pt-4 text-neutral-800'>Export your response</h3>
          <div className='flex items-center justify-center gap-8'>
            <button
              onClick={downloadResponse}
              className="px-4 py-2 w-1/3 bg-frisco_purple text-white font-semibold rounded shadow-md transition-colors hover:bg-frisco_purple_light focus:outline-none"
            >
              Download CSV
            </button>
            {/* <button
              onClick={downloadPdf}
              className="px-4 py-2 w-1/3 bg-frisco_purple text-white font-semibold rounded shadow-md transition-colors hover:bg-frisco_purple_light focus:outline-none"
            >
              Download PDF
            </button> */}
          </div>
          </>
      )}
    </div>
  );
};

export default QuestionnaireOutro;