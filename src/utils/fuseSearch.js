import {fetchPublishedProducts} from "../http/searchAPI";
import Fuse from "fuse.js";
const fuseOptions = {
    isCaseSensitive: false,
    findAllMatches: true,
    useExtendedSearch: true,
    minMatchCharLength: 2,
    threshold: 0.5,
    distance: 300,
    ignoreLocation: true,
    ignoreFieldNorm: true,
    keys: [
        'search'
    ]
};

export default async function fuseSearch(query, limit) {
    let result
    await fetchPublishedProducts().then((data) => {
        data.products.forEach(p => {
            p.search = `${p.title} ${p.shortDescription} ${p.SKU}`
        })
        const fuse = new Fuse(data.products, fuseOptions)
        result = fuse.search(query, {limit})
    })
    return result
}