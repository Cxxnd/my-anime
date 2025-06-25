import { authUserSession } from "@/libs/autlibs"
import Image from "next/image";
import Link from "next/link";

const page = async() => {
    const user = await authUserSession();

    return (
        <div className="mt-8 flex flex-col justify-center items-center text-color-primary gap-2">
            <h5 className="text-2xl font-bold flex-col bottom-0">
                DASHBOARD
            </h5>
            <h5 className="text-2xl font-bold">
                {user?.name}
                </h5>
            <Image src={user?.image} alt="..." width={250} height={250} className="rounded-full"/>
            <div className="py-8  flex flex-wrap gap-4">
                <Link
                className="bg-color-accent text-color-primary font-bold px-4 py-2 text-xl" 
                href="/users/dashboard/colections">My Colection</Link>
                <Link
                className="bg-color-accent text-color-primary font-bold px-4 py-2 text-xl" 
                href="/users/dashboard/comment">My Comment</Link>
            </div>
        </div>
    )
}

export default page;