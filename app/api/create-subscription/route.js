//api/create-subscription
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY
})

export async function POST(req, res) {
    try {

        const order = await razorpay.orders.create({
            amount: 100,
            currency: "INR",
            receipt: "receipt" + Math.random().toString(36).substring(7)
        })

        return NextResponse.json({ orderId: order.id }, { status: 200 })
    } catch (err) {
        console.error("Error Creating Order");
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}