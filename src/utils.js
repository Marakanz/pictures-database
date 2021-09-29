const paginate = (data) => {
    const itemPerPage = 20;
    const pages = Math.ceil(data.length/itemPerPage)

    const newImages = Array.from({length: pages }, (_, index) => {
        const start = index * itemPerPage
        return data.slice(start, start + itemPerPage)
    })
    return newImages
};

export default paginate;

