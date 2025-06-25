import { getAnime } from "@/libs/service-api";
import TrailerVideo from "@/components/Utilities/TrailerVideo";
import Image from "next/image";
import CollectionsButton from "@/components/AnimeList/CollectionsButton";
import { authUserSession } from "@/libs/autlibs";
import prisma from "@/libs/prisma";
import CommentInput from "@/components/AnimeList/CommentInput";
import CommentsBox from "@/components/AnimeList/CommentsBox";

const page = async props => {
    const params = await props.params;
    const { id } = params;
    const anime = await getAnime(`anime/${id}`);
    const user = await authUserSession();
    const collection = await prisma.Collections.findFirst({
        where: {user_email: user?.email, mal_id: Number(id)}
    })


    return(
        <>
        <div className="pt-4 px-4 text-color-primary text-2xl">
            <h3>
                {anime.data.title} - {anime.data.year}   {anime.data.title_japanese}
            </h3>
            {collection && <p className="text-sm text-color-accent flex justify-end items-end">Already in your collection</p>}
            {!collection && user && <CollectionsButton mal_id={id} user_email={user?.email} anime_title={anime.data.title} anime_image={anime.data.images.webp.image_url}/>}
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
                    <h3>Rating</h3>
                    <p className="text-color-primary">{anime.data.rating}</p>
                </div>
                <div className="w-36 flex flex-col justify-center items-center border border-blue-700 p-2">
                    <h3>Source</h3>
                    <p className="text-color-primary">{anime.data.source}</p>
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
        <div className="p-4">
            { user && <CommentInput mal_id={id} username={user?.name} user_email={user?.email} anime_title={anime.data.title}/> }
            <h3 className="text-color-primary text-2xl py-3">Comments</h3>
            <CommentsBox mal_id={id}/>
        </div>
        <div>
            <TrailerVideo videoId={anime.data.trailer.youtube_id}/>
        </div>
        </>
    );
}

export default page;
