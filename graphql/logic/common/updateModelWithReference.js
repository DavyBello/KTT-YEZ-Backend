module.exports = ({ TC, refPath }) => TC.getResolver('updateById').wrapResolve((next) => async (rp) => {
	// get sourceUser from resolveParams (rp)
	const { sourceUser, sourceUserType } = rp;
	rp.args.record[refPath] = sourceUser._id;
	if (TC.hasField(refPath)) {
		rp.beforeRecordMutate = async function (doc, rp) {
			// console.log(`${doc[refPath]}` == `${sourceUser._id}`);
			// if (doc[refPath] != sourceUser._id) {
			if (`${doc[refPath]}` != `${sourceUser._id}`) {
				throw new Error('this user cannot update this document');
			}
			  doc.updatedAt = new Date();
			  return doc;
		};
		if (rp.args.record[refPath] == sourceUser._id) {

		}
		rp.args.record.createdAt = Date.now();
		// run updateById resolver
		return next(rp);
	}
	Promise.reject('invalid refPath');
});
