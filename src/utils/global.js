const filterInput = (inputType, data, introspectionTypes) => {
  const inputTypeData = introspectionTypes.find(
    r => r.name === inputType
  );

  if (!inputTypeData) {
    console.log(`Input type ${inputType} does not exist`)
    return null;
  };

  const returnObj = {}

  const {
    inputFields
  } = inputTypeData
  // iterate thru data;
  Object.keys(data).forEach((attr) => {
    let curType = inputFields.find(inputField => {
      return inputField.name === attr
    })
    // if it's not on the inputType move on
    if (curType) {
      if (curType.type.kind === "INPUT_OBJECT") {
        // deal with nested object via recursion:
        let recursiveObj = filterInput(curType.type.name, data[attr], introspectionTypes)
        if (recursiveObj) returnObj[attr] = recursiveObj
      } else {
        returnObj[attr] = data[attr]
      }
    }
  })
  return returnObj
}

module.exports = {
  filterInput
};
