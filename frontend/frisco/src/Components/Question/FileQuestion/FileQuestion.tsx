import React, { useState } from 'react';
import { Input } from "../../../@/components/ui/input";
import QuestionFooter from '../QuestionFooter/QuestionFooter';

interface FileQuestionProps {
    sendFile: (file: File) => void;
    deleteAnswer: () => void;
    lastAnswerId: number | undefined;
}

const FileQuestion: React.FC<FileQuestionProps> = ({ sendFile, deleteAnswer, lastAnswerId }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const selected = files[0];
            // Check if the selected file is an image (you can customize the accepted image types)
            if (selected.type.startsWith('image/')) {
                setSelectedFile(selected);
            } else {
                // Display an error message or handle invalid file type
                console.log('Invalid file type. Please select an image.');
            }
        }
    };

    const handleSubmit = () => {
        if (selectedFile) {
            sendFile(selectedFile);
            setSelectedFile(null);
        }
    };

    return (
        <div>

            <Input id="picture" type="file" onChange={handleFileChange} disabled={!!selectedFile} accept="image/jpeg, image/jpg, image/png, image/gif" />
            {selectedFile && (
                <p className="text-white text-sm mt-1 ml-1">Επιλεγμένο Αρχείο: {selectedFile.name}</p>
            )}
            <QuestionFooter onClickNext={handleSubmit} onClickBack={deleteAnswer} isFirstQuestion={lastAnswerId === undefined} />
        </div>
    );
};

export default FileQuestion;