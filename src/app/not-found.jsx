'use client';
import { FileMagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";


const Page = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center text-center gap-3">
        
        <div>
          <p className="font-bold text-4xl text-color-accent">404</p>
          <div className="flex justify-center">
            <FileMagnifyingGlass size={32}/>
          </div>
            <h3 className="font-bold text-color-accent text-2xl">PAGE NOT FOUND</h3>
            <button onClick={() => router.back()} className="text-color-primary hover:text-color-accent underline">Back to Page</button>
        </div>
    </div>
  );
}
export default Page;