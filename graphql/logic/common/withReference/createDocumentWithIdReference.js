module.exports = ({ TC, refPath, onCompleted }) => TC.get('$createOne').wrapResolve(next => async (rp) => {
  // get viewer from resolveParams (rp)
  const { context: { viewer } } = rp;
  if (TC.hasField(refPath)) {
    rp.args.record[refPath] = viewer._id;
    rp.args.record.createdAt = Date.now();
    // run createOne resolver
    const result = await next(rp);
    if (onCompleted && typeof onCompleted === 'function') {
      onCompleted(result, rp);
    }
    return result;
  }
  return Promise.reject(Error('invalid refPath'));
});
