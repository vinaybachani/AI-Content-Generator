"use client";

import { useAuth } from "@clerk/nextjs"
import Link from "next/link";
import Typewriter from 'typewriter-effect';
import { Button } from "./button";

export const LandingHero = () => {
    const { isSignedIn } = useAuth();
    return (
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>The Best AI Tool for</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 py-3">
                    <Typewriter options={{
                        strings: ['Blog Generation', 'Code Detection', 'Youtube Content Generation', 'HashTag Generation'],
                        autoStart: true,
                        loop: true,
                    }} />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">Create Content using AI 10x faster.</div>
            <div>
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button className="md:text-lg p-4 md:p-6 rounded-full font-semibold bg-gradient-to-r from-purple-400 to-pink-600 py-3">Start Generating For Free</Button>
                </Link>
            </div>
            <div className="text-zinc-400 text-xs md:text-sm font-normal">No Credit Card Required</div>
        </div>
    )
}