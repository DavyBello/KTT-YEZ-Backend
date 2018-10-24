// Wrap a resolver with a default value
module.exports = ({ resolver, value }) => resolver.wrapResolve(next => async (rp) => {
  const result = await next(rp);
  if (result) return result;
  return value;
});
