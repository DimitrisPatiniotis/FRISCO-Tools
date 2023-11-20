import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface CKEditorComponentProps {
    onChange: (value: string) => void;
    initialValue?: string;
}

const CKEditorComponent: React.FC<CKEditorComponentProps> = ({ onChange, initialValue }) => {
    const [editor, setEditor] = useState<ClassicEditor>();
    const [editorContent, setEditorContent] = useState(initialValue || ''); 

    useEffect(() => {
        if (editor) {
            editor.model.document.on('change:data', () => {
                const data = editor.getData();
                onChange(data);
            });
        }
    }, [editor, onChange]);

    return (

            <div className='h-full my-2'>
                <CKEditor
                    editor={ClassicEditor}
                    onReady={(editor) => {
                        setEditor(editor);
                        editor.setData(editorContent);
                    }}
                />
            </div>

    );
};

export default CKEditorComponent;
