const Pagination = ({ page, lastPage, setPage }) => {

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prevState) => prevState - 1);
            scrollTop()
            }
    }
    const handleNextPage = () => {
        if (page < lastPage) {
            setPage((prevState) => prevState + 1);
            scrollTop()
        }
    }
    return(
        <div className="flex justify-center items-center px-2 py-4 gap-4 text-color-primary text-xl">
            <button className="transition-all hover:text-color-accent" onClick={handlePrevPage}>Prev</button>
            <p>{page} / {lastPage}</p>
            <button className="transition-all hover:text-color-accent" onClick={handleNextPage}>Next</button>
        </div>
    );
}

export default Pagination;