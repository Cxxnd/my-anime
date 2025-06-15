'use client'

import React, { useEffect, useState } from "react";
import HeaderMenu from "@/components/Utilities/HeaderMenu";
import Pagination from "@/components/Utilities/Paginstion";
import MangaList from "@/components/AnimeList/manga";
import { getAnime } from "../../libs/service-api";


const Manga = () => {
    const [page, setpage] = useState(1)
    const [data, setData] = useState([])

    const fetchData = async () => {
        const Anime = await getAnime("manga", `page=${page}`);
            setData(Anime);
        }

        useEffect(() => {
            fetchData();
        }, [page]);
    return(
        <>
            <HeaderMenu title={`Manga # ${page}`}/>
            <MangaList api={data} />
            <Pagination page={page} lastPage={data.pagination?.last_visible_page}
            setPage={setpage}
            />
        </>
    )
}

export default Manga;