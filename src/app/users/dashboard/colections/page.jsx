import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Dashboard/Header";
import prisma from "@/libs/prisma";
import { authUserSession } from "@/libs/autlibs";

const Page = async() => {
    const user = await authUserSession();
    const collections = await prisma.Collections.findMany({
        where: {
            user_email: user.email
        }
    })
    if (!collections || collections.length === 0) {
        return (
            <section className="mt-4 px-4 w-full">
                <Header title={"My Collection"}/>
                <h1 className="text-color-primary p-4">You haven't collections</h1>
            </section>
        )
    }

    return(
        <section className="mt-4 px-4 w-full">
            <Header title={"My Collection"}/>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {collections.map((collect, index )=> {
                    return(
                        <Link key={index} href={`/anime/${collect.mal_id}`} className="relative">
                            <Image 
                                src={collect.anime_image}
                                alt={collect.anime_image}
                                width={250}
                                height={250}
                                className="w-full"
                                />
                            <div className="absolute bottom-0 w-full items-center justify-center flex bg-color-accent h-16">
                                <h5 className="text-xl text-center font-semibold">{collect.anime_title}</h5>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default Page;