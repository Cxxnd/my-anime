import Header from "../components/AnimeList/Header";
import AnimeList from "../components/AnimeList";
import Link from "next/link";
import { getAnime, getAnimeRecommend, reproduceAnime } from "../libs/service-api";

const Page = async () => {
let animeRecommend = await getAnimeRecommend("recommendations/anime", "entry");
const topAnime = await getAnime("top/anime", "limit=8");
animeRecommend = await reproduceAnime(animeRecommend, 8);

    return (
        <>
            <section>
                <Header title="Anime Populer" linkHref="/Manga" linkTitle="Lihat Manga"/>
                <AnimeList api={topAnime} />
            </section>
            <Link href="/populer" className="flex justify-center text-center m-5 text-color-primary hover:text-color-accent underline font-bold text-xl">Lihat Semua Anime</Link>
            <section>
                <Header title="Recommend Anime"/>
                <AnimeList api={animeRecommend} />
            </section>
        </>
    );
};

export default Page;
