"use client"
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import Templates from '@/app/(data)/Templates'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'
import { Copy } from 'lucide-react'

export interface HISTORY {
    id: Number,
    formData: string,
    aiResponse: string,
    templateSlug: string,
    createdBy: string,
    createdAt: string
}

const historyPage = () => {
    const { user } = useUser();
    const [historyData, setHistoryData] = useState<any>();
    const GetData = async () => {
        if (user) {
            const result: HISTORY = await db.select().from(AIOutput).where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress));
            setHistoryData(result);
        }
    }

    const handleCopy = (aiResponse) => {
        navigator.clipboard.writeText(aiResponse);
        toast.success('Content Copied to Clipboard');
    }

    useEffect(() => {
        if (user) {
            GetData();
        }
    }, [user]);

    const findTemplate = (slug: string) => {
        return Templates.find(template => template.slug === slug);
    };

    return (
        <div>
            <div className="bg-white m-4 p-4">
                <h2 className='font-bold text-2xl'>History</h2>
                <p className='text-gray-400 text-sm'>Search your previously generate AI content</p>

                <Table className='mt-4'>
                    <TableCaption>A list of your recent Searches.</TableCaption>
                    <TableHeader className='bg-gray-100'>
                        <TableRow>
                            <TableHead className="w-[200px] text-black font-bold text-md">TEMPLATE</TableHead>
                            <TableHead className="w-[100px] text-black font-bold text-md">AI RESP</TableHead>
                            <TableHead className="w-[100px] text-black font-bold text-md">DATE</TableHead>
                            <TableHead className="w-[100px] text-black font-bold text-md">WORDS</TableHead>
                            <TableHead className="w-[100px] text-black font-bold text-md">COPY</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            historyData && historyData.length > 0 ? (
                                historyData.map(data => {
                                    const template = findTemplate(data?.templateSlug);
                                    return (
                                        <TableRow key={data.id}>
                                            <TableCell className="flex items-center">
                                                {template && template.icon ? (
                                                    <img src={template.icon} alt={template.name} className="w-6 h-6 mr-2" />
                                                ) : null}
                                                {template ? template.name : 'Unknown Template'}
                                            </TableCell>
                                            <TableCell className="truncate max-w-[300px]">{data.aiResponse}</TableCell>
                                            <TableCell>{data.createdAt}</TableCell>
                                            <TableCell>{data.aiResponse.length}</TableCell>
                                            <TableCell><Button className='flex gap-2 bg-purple-600' onClick={() => handleCopy(data.aiResponse)}><Copy className='h-4 w-4' />Copy</Button></TableCell>
                                        </TableRow>
                                    )
                                }
                                )
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">No data available</TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>

            </div>
        </div>
    )
}

export default historyPage
