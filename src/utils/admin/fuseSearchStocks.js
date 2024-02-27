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

export default function fuseSearchStocks(query, limit, products) {
    let result

    products.forEach(p => {
            let childNames = []
            if (p.children.length>0){
                p.children.forEach(pc =>{
                    childNames.push(pc.Наименование)
                    }
                )
            }
            p.search = `${p.Наименование} ${p['Наименование (крат опис)']} ${p.Код} ${childNames.join(" ")}`
        })
    const fuse = new Fuse(products, fuseOptions)
    result = fuse.search(query, {limit})

    return result

}