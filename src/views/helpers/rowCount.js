const rowend = (a) => {
  if (a == 8 || a == 16 || a == 25 || a == 36) return true;
  else return false;
};

const rowstart = (a) => {
  if (a == 1 || a == 9 || a == 17 || a == 18) return true;
  else return false;
};

const rowfour = (a) => {
  if (a == 18 || a == 26) return true;
  else return false;
};
const rowmid = (a) => {
  if (a == 16) return true;
  else return false;
};

module.exports = { rowend, rowstart, rowmid, rowfour };
