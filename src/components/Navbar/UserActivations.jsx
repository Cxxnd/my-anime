import Link from "next/link"
import { authUserSession } from "@/libs/autlibs"

const UserActivations = async() => {
    const user = await authUserSession();
    const actionLabel = user ? "Sign Out" : "Sign In";
    const actionUrl = user ? "/api/auth/signout" : "/api/auth/signin";

    return (
        <div className="flex justify-between gap-2">
            {
                user ? <Link href="/users/dashboard" className="py-1 hover:text-color-primary font-bold">DashBoard</Link> : null
            }
            
            <Link href={actionUrl} 
            className="bg-color-dark text-color-accent py-1 px-22 inline-block rounded hover:text-color-primary font-bold transition-all">
                {actionLabel}
            </Link>
        </div>
    );
}

export default UserActivations;