"use client"
import { Rewind } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = ({ title }) => {
    const router = useRouter();
    const headlerBack = (event) => {
        event.preventDefault();
        router.back();
    }


    return(
        <div className="flex justify-between mb-4 items-center">
            <button className="text-color-primary hover:bg-color-accent hover:scale-110"> <Rewind size={32} onClick={headlerBack} /> </button>
            <h3 className="text-2xl font-bold text-color-primary">
                {title}
            </h3>
        </div>
    )
}

export default Header;