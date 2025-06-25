import Link from "next/link";
import InputSearch from "./inputSearch";
import UserActivations from "./UserActivations";

const Navbar = () => {
    return (
        <header className="bg-color-accent rounded-b-xl shadow-lg">
            <div className="flex md:flex-row flex-col justify-between md:items-center p-4">
                <Link href="/" className="font-bold text-2xl text-color-primary hover:text-color-secondary">ANIMELIST</Link>
                <InputSearch/>
                <UserActivations/>
            </div>
        </header>
    )
}

export default Navbar;