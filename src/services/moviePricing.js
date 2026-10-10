const priceTiers = [
    {throughYear: 1969, buy: 29, rent: 9},
    {throughYear: 1999, buy: 69, rent: 29},
    {throughYear: 2019, buy: 89, rent: 49},
    {throughYear: Infinity, buy: 109, rent: 69},
];

export function getMoviePrices(releaseDate) {
    const year = Number(releaseDate?.slice(0, 4));

    if (!Number.isInteger(year) || year <= 0) {
        return null;
    }

    const tier = priceTiers.find((priceTier) => year <= priceTier.throughYear);

    return {
        buy: tier.buy,
        rent: tier.rent,
    };
}