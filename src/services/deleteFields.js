const deleteFields = (excludedFields, queryObj) => {
    excludedFields.forEach(el => delete queryObj[el])
    return queryObj
}

module.exports = deleteFields