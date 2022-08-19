function getStateItemsByIds(itemsIds, stateEntities) {
    if (stateEntities) {
        const itemsArray = [];
        
        for (const id of itemsIds) {
            for (const item of stateEntities) {
                if (item._id === id) {
                    itemsArray.push(item);
                    break;
                }
            }
        }
        return itemsArray;
    }
    return [];
}

export default getStateItemsByIds;
