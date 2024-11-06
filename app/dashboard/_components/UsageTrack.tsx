"use client"
import { Button } from '@/components/ui/button'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { AIOutput, UserSubscription } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { HISTORY } from '../history/page'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { UserSubscriptionContext } from '@/app/(context)/userSubscriptionContext'
import { UpdateCreditUsageContext } from '@/app/(context)/updateCreditUsageContext'

const UsageTrack = () => {
    const { user } = useUser();
    const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
    const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
    const { updateCreditUsage, setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);
    const [maxWords, setMaxWords] = useState(10000);

    useEffect(() => {
        user && getData();
        user && isUserSubscriber();
    }, [user]);

    useEffect(() => {
        user && getData();
    }, [updateCreditUsage && user])

    const getData = async () => {
        const result: HISTORY[] = await db.select().from(AIOutput).where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress));
        getTotalUsage(result);
    }

    const isUserSubscriber = async () => {
        const result = await db.select().from(UserSubscription).where(eq(UserSubscription.email, user?.primaryEmailAddress?.emailAddress));

        if (result) {
            setUserSubscription(true);
            setMaxWords(100000);
        }
    }

    const getTotalUsage = (result: HISTORY[]) => {
        let total: number = 0
        result.forEach(element => {
            total = total + Number(element.aiResponse?.length)
        })
        setTotalUsage(total);
    }
    return (
        <div className='m-5'>
            <div className='bg-purple-600 text-white rounded-lg p-3'>
                <h2 className='font-medium'>Credits</h2>
                <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
                    <div className="h-2 bg-white rounded-full" style={{ width: (totalUsage / maxWords) * 100 + '%' }}></div>
                </div>
                <h2 className='text-sm my-2'>{totalUsage}/{maxWords} Credits used</h2>
            </div>
            <Button variant={'secondary'} className='w-full my-3 text-purple-600'>Upgrade</Button>
        </div>
    )
}

export default UsageTrack
