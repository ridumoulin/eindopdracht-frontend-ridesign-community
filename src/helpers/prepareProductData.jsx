export function prepareProductData(data) {
    const preparedData = { ...data };

    if (preparedData.price) {
        preparedData.price = preparedData.price.replace(',', '.');
    }

    preparedData.price = parseFloat(preparedData.price);

    return preparedData;
}