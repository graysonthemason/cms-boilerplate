const getIconClass = (name) => {
  let str = 'fa fa-';
  switch (name) {
    case 'Coffee':
      str += 'coffee';
      break;
    case 'Water':
      str += 'tint';
      break;
    case 'Refrigerator':
      str += 'utensils';
      break;
    case 'Workstation':
      str += 'desktop';
      break;
    case 'Phone':
      str += 'mobile-alt';
      break;
    case 'Soap':
      str += 'shower';
      break;
    case 'Libation':
      str += 'glass-cheers';
      break;
    case 'Greenery':
      str += 'leaf';
      break;
    case 'customization':
      str = 'fas fa-tools';
      break;
    case 'lightbulb':
      str = 'fas fa-lightbulb'
      break;
    case 'wifi':
      str = 'fas fa-wifi'
      break;
    case 'fitnessCenter':
      str = 'fas fa-dumbbell'
      break;
    case 'washerDryer':
      str = 'fas fa-tshirt'
      break;
    case 'balcony':
      str = 'fas fa-cloud-sun'
      break;
    case 'cookware':
      str = 'fas fa-utensils'
      break;
    case 'premiumSoap':
      str = 'fas fa-bath'
      break;
    case 'workstation':
      str = 'fas fa-desktop'
      break;
    case 'automatedHeating':
      str = 'fas fa-temperature-high'
      break;
    case 'sound':
      str = 'fas fa-volume-down'
      break;
    default:
      if (name) {
        str = name
      } else {
        str += 'question';
      }
      break;
  }
  return str;
}

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
  getIconClass,
  filterInput
};
