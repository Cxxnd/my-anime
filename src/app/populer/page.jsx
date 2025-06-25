'use client'

import React, { useEffect, useState } from "react";
import HeaderMenu from "@/components/Utilities/HeaderMenu";
import Pagination from "@/components/Utilities/Paginstion";
import AnimeList from "@/components/AnimeList";
import { getAnime } from "../../libs/service-api";


const Page = () => {
    const [page, setpage] = useState(1)
    const [data, setData] = useState([])

    const fetchData = async () => {
        const populer = await getAnime("top/anime", `page=${page}`);
        setData(populer);
        }
        
        useEffect(() => {
            fetchData();
        }, [page]);

    return(
        <>
            <HeaderMenu title={`Anime Populer ${page} !`}/>
            <AnimeList api={data} />
            <Pagination page={page} lastPage={data.pagination?.last_visible_page}
            setPage={setpage}
            />
        </>
    )
}

export default Page;