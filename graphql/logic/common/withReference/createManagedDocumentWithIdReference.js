const keystone = require('keystone');

// Create and add id of relationship document (Cloudinary file) to the viewer/Self
module.exports = ({ field, TC, managedModelType }) => TC.get('$createOne').addArgs({
  managedId: 'String!',
  // managedModelType: 'String!'
}).wrapResolve(next => async (rp) => {
  // get viewer from resolveParams (rp)
  const { context: { viewer }, args: { managedId } } = rp;
  try {
    const Model = keystone.list(managedModelType).model;
    // console.log(Model);
    const item = await Model.findOne({ _id: managedId });
    if (item) {
      const _field = item[field];
      if (Array.isArray(_field)) {
        // console.log(viewer._id);
        rp.args.record.owner = managedId;
        if (field === 'caseFiles') {
          rp.args.record.fileNumber = item[field].length + 1;
        }
        // rp.args.record.uploadedBy = viewer._id;
        rp.args.record.createdBy = viewer._id;
        rp.args.record.lastEditedBy = viewer._id;
        rp.args.record.createdAt = Date.now();
        rp.args.record.updatedAt = Date.now();
        console.log(rp.args);
        // add field to db and get result of createOne resolver
        const result = await next(rp);
        item[field].push(result.recordId);
        try {
          await item.save();
          return result;
        } catch (e) {
          // Placeholder function to stop the field from saving to the db
          result.record.remove().exec();
          return Error(`Unexpected error adding the document to ${managedModelType.toLowerCase()}`);
        }
      } else {
        return Error(`Field: ${field} is not a collection in ${managedModelType}`);
      }
    } else {
      return Error(`Cannot find "${managedModelType}" with specified _id`);
    }
  } catch (e) {
    // console.log(e);
    if (e.message === `Unknown keystone list "${managedModelType}"`) {
      throw new Error(`Unknown model type "${managedModelType}"`);
    }

    if (e.message === `Cast to ObjectId failed for value "${managedId}" at path "_id" for model "${managedModelType}"`) {
      throw new Error(`Invalid Id supplied for model type "${managedModelType}"`);
    }

    return e;

    // console.log(e.message === `Unknown keystoone list "asda"`);
    // throw new Error(`Unexpected error adding the document to ${managedModelType.toLowerCase()}`);
  }
});
