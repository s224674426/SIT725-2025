module.exports = function priceWithTax(amount, rate = 0.1) {
  if (typeof amount !== "number" || amount < 0) throw new Error("Invalid amount");
  if (typeof rate !== "number" || rate < 0) throw new Error("Invalid tax rate");
  return +(amount * (1 + rate)).toFixed(2);
};
