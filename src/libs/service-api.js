export const getAnime = async (resource, query) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`,{
        timeout: 100000,
        next: { revalidate: 100 }
        }
    );
    const data = await response.json();
    return data;
};

export const getAnimeRecommend = async (resource, objectAnime) => {
    const response = await getAnime(resource);
    return response.data.flatMap(item => item[objectAnime]);
}

export const reproduceAnime = async (data, gap) => {
    const first = ~~(Math.random() * data.length - gap) + 1;
    const last = first + gap;

    const response = {
        data: data.slice(first, last),
        
    }
    return response
}