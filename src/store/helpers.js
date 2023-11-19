export function addToList(list, obj) {
    return list.push(obj)
}

export function removeFromList(list, id) {
    return list.filter((obj) => obj.id !== id)
}

export function updateObjInList(list, findObj) {    
    const objIndex = list.findIndex((obj) => obj.id === findObj.id)    
    return (list[objIndex] = findObj)
}

export function getObjById(list, objId) {
    return list.find(obj => obj.id == objId)
}


