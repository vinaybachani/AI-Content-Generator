"use client"
import { Button } from '@/components/ui/button'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/db'
import { UserSubscription } from '@/utils/schema'
import moment from 'moment'
import { UserSubscriptionContext } from '@/app/(context)/userSubscriptionContext'
import Script from 'next/script'
import { CircleCheckBig } from 'lucide-react'

const Billing = () => {
    const { user } = useUser();
    const Amount = 100;
    const [loading, setLoading] = useState(false);
    const [paymentData, setPaymentData] = useState(null);
    const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext)

    const makePayment = () => {
        setLoading(true);
        try {
            axios.post('/api/create-subscription', {})
                .then(resp => {
                    console.log("Payment Response: ", resp.data);
                    setPaymentData(resp.data);
                }).catch(error => {
                    setLoading(false);
                    console.log("Payment Error: ", error);
                })

            //Initialize Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: Amount * 100,
                name: 'Ai Content Generator',
                description: 'Monthly Subscription',
                handler: async (resp: any) => {
                    if (resp) {
                        SaveSubscription(resp?.razorpay_payment_id)
                    }
                    setLoading(false);
                }
            }
            // @ts-ignore
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
        }
    }

    const SaveSubscription = async (paymentId: string) => {
        const result = await db.insert(UserSubscription).values({
            email: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            active: true,
            paymentId: paymentId,
            joinDate: moment().format('DD/MM/yyyy')
        });
        if (result) window.location.reload();
    }
    return (
        <div>
            <div className='mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-28 lg:py-24'>
                <Script
                    src="https://checkout.razorpay.com/v1/checkout.js"
                    strategy="lazyOnload"
                />
                <h2 className='text-center font-bold text-3xl my-3'>Upgrade With Monthly Plan</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center">
                    <div className="rounded-2xl bg-white border border-gray-200 p-2 py-10">
                        <div className="text-center">
                            <h2 className="text-lg font-medium text-gray-900">
                                Free
                                <span className="sr-only">Plan</span>
                            </h2>
                            <p className="mt-2 sm:mt-4">
                                <strong className="text-3xl font-bold text-gray-900 sm:text-2xl">
                                    0$
                                    <span className="text-sm font-medium text-gray-700">/month</span>
                                </strong>
                            </p>
                            <ul className='flex justify-start flex-col p-2'>
                                <li className='flex my-2'>
                                    <CircleCheckBig height={20} width={20} className='mt-1 text-purple-700' />
                                    <span className='ml-2'>10,000 words/month</span>
                                </li>
                                <li className='flex my-2'>
                                    <CircleCheckBig height={20} width={20} className='mt-1 text-purple-700' />
                                    <span className='ml-2'>50+ Content Templates</span>
                                </li>
                                <li className='flex my-2'>
                                    <CircleCheckBig height={20} width={20} className='mt-1 text-purple-700' />
                                    <span className='ml-2'>Unlimited Download & Copy</span>
                                </li>
                                <li className='flex my-2'>
                                    <CircleCheckBig height={20} width={20} className='mt-1 text-purple-700' />
                                    <span className='ml-2'>1 Month of History</span>
                                </li>
                            </ul>
                            <Button className='bg-gray-500 rounded-lg p-5 mt-4'>Currently Active Plan</Button>
                        </div>
                    </div>
                    <div className="rounded-2xl bg-white border border-gray-200 p-2 py-10">
                        <div className="text-center">
                            <h2 className="text-lg font-medium text-gray-900">
                                Monthly
                                <span className="sr-only">Plan</span>
                            </h2>
                            <p className="mt-2 sm:mt-4">
                                <strong className="text-3xl font-bold text-gray-900 sm:text-2xl">
                                    300₹
                                    <span className="text-sm font-medium text-gray-700">/month</span>
                                </strong>
                            </p>
                            <ul className='flex justify-start flex-col p-2'>
                                <li className='flex my-2'>
                                    <CircleCheckBig height={20} width={20} className='mt-1 text-purple-700' />
                                    <span className='ml-2'>1,00,000 words/month</span>
                                </li>
                                <li className='flex my-2'>
                                    <CircleCheckBig height={20} width={20} className='mt-1 text-purple-700' />
                                    <span className='ml-2'>50+ Templates Access</span>
                                </li>
                                <li className='flex my-2'>
                                    <CircleCheckBig height={20} width={20} className='mt-1 text-purple-700' />
                                    <span className='ml-2'>Unlimited Download & Copy</span>
                                </li>
                                <li className='flex my-2'>
                                    <CircleCheckBig height={20} width={20} className='mt-1 text-purple-700' />
                                    <span className='ml-2'>1 Year of History</span>
                                </li>
                            </ul>
                            <Button type='button' className='bg-purple-700 p-5 mt-4' disabled={loading} onClick={() => makePayment()}>
                                {loading && <Loader2Icon className='animate-spin' />}   {userSubscription ? 'Active Plan' : 'Get Started'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Billing
