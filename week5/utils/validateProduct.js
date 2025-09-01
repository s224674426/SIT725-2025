module.exports = function validateProduct(body) {
  const errors = [];
  if (!body || typeof body !== "object") errors.push("body required");
  else {
    if (!body.name || body.name.trim().length < 3) errors.push("name min length 3");
    if (typeof body.price !== "number" || body.price < 0) errors.push("price must be >= 0");
  }
  return { ok: errors.length === 0, errors };
};
