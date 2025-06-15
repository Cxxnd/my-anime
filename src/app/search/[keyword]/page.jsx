import { getAnime } from "@/libs/service-api";
import AnimeList from "@/components/AnimeList";
import MangaList from "@/components/AnimeList/manga";

const Page = async ({ params }) => {
    const { keyword } = await params;
    const decoded = decodeURI(keyword);
    const searchResult = await getAnime("anime", `q=${decoded}`);
    const searchResultManga = await getAnime("manga", `q=${decoded}`);

    return (
        <section>
            <h1 className="text-2xl font-semibold mb-4 m-4 text-color-primary">Hasil Pencarian Anime: {decoded}</h1>
            <AnimeList api={searchResult} />
            <h1 className="text-2xl font-semibold mb-4 m-4 text-color-primary">Hasil Pencarian Manga: {decoded}</h1>
            <MangaList api={searchResultManga} />
        </section>
    );
}
export default Page;