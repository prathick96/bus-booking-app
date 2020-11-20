const equality = (a) => {
  if (a === "yes") return true;
  else return false;
};

const equal = (a, b) => {
  return a === b;
};

const rating = (a) => {
  if (a < 2.5) {
    return true;
  } else {
    return false;
  }
};

module.exports = { equality, equal, rating };
