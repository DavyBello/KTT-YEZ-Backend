module.exports = ({ TC, refPath }) => TC.getResolver('removeById').wrapResolve((next) => async (rp) => {
	// get sourceUser from resolveParams (rp)
	const { sourceUser, sourceUserType } = rp;
	if (TC.hasField(refPath)) {
		rp.beforeRecordMutate = async function (doc, rp) {
			// console.log(`${doc[refPath]}` == `${sourceUser._id}`);
			// if (doc[refPath] != sourceUser._id) {
			if (`${doc[refPath]}` != `${sourceUser._id}`) {
				throw new Error('this user cannot delete this document');
			}
			  return doc;
		};
		// run removeById resolver
		return next(rp);
	}
	Promise.reject('invalid refPath');
});
