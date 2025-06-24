"use client";

import { signOutAction } from "@/actions/auth";
import { Button } from "@/components/ui";
import Link from "next/link";
import React from "react";

function LogoutPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Are you sure you want to logout?</h1>
            <Button onClick={() => signOutAction()}>Logout</Button>
            <Button asChild>
                <Link href="/home">Cancel</Link>
            </Button>
        </div>
    );
}

export default LogoutPage;
