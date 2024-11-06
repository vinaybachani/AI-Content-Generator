"use client"
import React, { ReactNode, useState } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import { TotalUsageContext } from "../(context)/TotalUsageContext";
import { UserSubscriptionContext } from "../(context)/userSubscriptionContext";
import { UpdateCreditUsageContext } from "../(context)/updateCreditUsageContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DashboardLayout({
    children
}: Readonly<{ children: React.ReactNode }>) {
    const [totalUsage, setTotalUsage] = useState<Number>(0)
    const [userSubscription, setUserSubscription] = useState<boolean>(false);
    const [udpateCreditUsage, setUpdateCreditUsage] = useState<any>()
    return (
        <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
            <UserSubscriptionContext.Provider value={{ userSubscription, setUserSubscription }}>
                <UpdateCreditUsageContext.Provider value={{ udpateCreditUsage, setUpdateCreditUsage }}>
                    <div className="h-screen">
                        <div className="md:w-64 hidden md:block fixed">
                            <SideNav />
                        </div>
                        <div className="md:ml-64">
                            <Header />
                            {children}
                        </div>
                    </div>
                    <ToastContainer
                        position="bottom-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </UpdateCreditUsageContext.Provider>
            </UserSubscriptionContext.Provider>
        </TotalUsageContext.Provider>
    )
}