"use client"
import React, { useState } from 'react'
import { TEMPLATE } from './TemplateListSection'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'
interface PROPS {
    selectedTemplate?: TEMPLATE,
    userFormInput: any,
    loading: boolean
}
const FormSection = ({ selectedTemplate, userFormInput, loading }: PROPS) => {
    const [formData, setFormData] = useState<any>();

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        userFormInput(formData);
        loading
    }
    return (
        <div className={cn("p-5 shadow-md border rounded-lg bg-white")}>
            <Image src={selectedTemplate?.icon} alt='icon' height={70} width={70} />
            <h2 className='font-bold text-2xl mb-2 text-purple-600'>{selectedTemplate?.name}</h2>
            <p className="text-gray-500 text-sm">{selectedTemplate?.desc}</p>
            <form className='mt-6' onSubmit={handleSubmit}>
                {selectedTemplate?.form?.map((item, index) => (
                    <div className='my-2 flex flex-col gap-2 mb-7'>
                        <label className='font-bold' htmlFor={item.label}>{item?.label}</label>
                        {
                            item.field == 'input' ? <Input name={item.name} required={item?.required} onChange={handleInputChange} />
                                : item.field == 'textarea' ? <Textarea name={item.name} required={item?.required} onChange={handleInputChange} /> : null
                        }
                    </div>
                ))}
                <Button className='py-6 w-full bg-purple-600' disabled={loading}>{loading && <Loader2Icon className='animate-spin' />}Generate Content</Button>
            </form>
        </div>
    )
}

export default FormSection
