import { getAnime } from "@/libs/service-api";
import Image from "next/image";
import CollectionsButton from "@/components/AnimeList/CollectionsButton";
import { authUserSession } from "@/libs/autlibs";

const page = async props => {
    const params = await props.params;
    const { id } = params;
    const anime = await getAnime(`manga/${id}`);
    const user = await authUserSession();


    return(
        <>
        <div className="pt-4 px-4 text-color-primary text-2xl">
            <h3>
                {anime.data.title} - {anime.data.year}   {anime.data.title_japanese}
            </h3>
            <CollectionsButton mal_id={id} user_email={user?.email}/>
        </div>
        <div className="pt-4 px-4 gap-3 flex text-color-accent overflow-x-auto">
            <div className="w-36 flex flex-col justify-center items-center border border-blue-700 p-2">
                    <h3>Rank</h3>
                    <p className="text-color-primary">{anime.data.rank}</p>
                </div>
                <div className="w-36 flex flex-col justify-center items-center border border-blue-700 p-2">
                    <h3>Skor</h3>
                    <p className="text-color-primary">{anime.data.score}</p>
                </div>
                <div className="w-36 flex flex-col justify-center items-center border border-blue-700 p-2">
                    <h3>genre</h3>
                    {anime.data.genres?.length > 0 ? (
        <ul>
            {anime.data.genres.map((genre, index) => (
                <p className="text-color-primary" key={index}>{genre.name}</p>
            ))}
        </ul>
    ) : (
        <p>No genres available</p>
    )}
                </div>
                <div className="w-36 flex flex-col justify-center items-center border border-blue-700 p-2">
                    <h3>episode</h3>
                    <p className="text-color-primary">{anime.data.episodes}</p>
                    <p className="text-color-primary">{anime.data.status}</p>
                </div>
                <div className="w-36 flex flex-col justify-center items-center border border-blue-700 p-2">
                    <h3>members</h3>
                    <p className="text-color-primary">{anime.data.members}</p>
                </div>
                <div className="w-36 flex flex-col justify-center items-center border border-blue-700 p-2">
                    <h3>Favorit</h3>
                    <p className="text-color-primary">{anime.data.favorites}</p>
                </div>
                <div className="w-36 flex flex-col justify-center items-center border border-blue-700 p-2">
                    <h3>Chapters</h3>
                    <p className="text-color-primary">{anime.data.chapters}</p>
                </div>
                <div className="w-36 flex flex-col justify-center items-center border border-blue-700 p-2">
                    <h3>Status</h3>
                    <p className="text-color-primary">{anime.data.status}</p>
                </div>
        </div>
        <div className="pt-4 px-4 gap-2 flex sm:flex-nowrap flex-wrap text-color-primary">
            <Image
            src={anime.data.images.webp.image_url}
            alt={anime.data.images.jpg.image_url}
            height={250}
            width={250}
            className="w-full rounded-xl object-cover"
            />
            <p className="text-justify text-xl">{anime.data.synopsis}</p>
        </div>
        </>
    );
}

export default page;
