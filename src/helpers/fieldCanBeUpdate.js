const isFieldCanBeUpdate = (updateFields, body) => {
    const bodyUpdates = Object.keys(body);
    return bodyUpdates.every(field => updateFields.includes(field));
};

module.exports = isFieldCanBeUpdate;
