function filterBySearch(data, searchQuery, filterParam) {
    return searchQuery
        ? data.filter(
            (item) => item[filterParam]
                .toLowerCase()
                .indexOf(searchQuery.toLowerCase()) !== -1)
        : data;
}

export default filterBySearch;
