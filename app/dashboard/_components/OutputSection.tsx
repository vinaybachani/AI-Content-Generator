"use client"
import React, { useEffect, useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor'
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from 'react-toastify';

interface props {
    aiOutput: string
}
const OutputSection = ({ aiOutput }: props) => {
    const editorRef: any = useRef();
    useEffect(() => {
        const editorInstance = editorRef.current.getInstance();
        editorInstance.setMarkdown(aiOutput)
    }, [aiOutput]);

    const handleCopy = () => {
        navigator.clipboard.writeText(aiOutput);
        toast.success('Content Copied to Clipboard');
    }
    return (
        <div className='bg-white shadow-lg border rounded-lg'>
            <div className='flex justify-between items-center p-5'>
                <h2 className='font-medium text-lg'>Your Result</h2>
                <Button className='flex gap-2 bg-purple-600' onClick={handleCopy}><Copy className='h-4 w-4' />Copy</Button>
            </div>
            <Editor
                ref={editorRef}
                initialValue="Your result will appear here"
                height="600px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                onChange={() => console.log(editorRef.current.getInstance().getMarkdown())}
            />
        </div>
    )
}

export default OutputSection
