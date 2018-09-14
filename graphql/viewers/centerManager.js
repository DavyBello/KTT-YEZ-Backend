const { CenterManagerTC, ViewerCenterManagerTC } = require('../composers');

const ViewerCenterManagerTCFields = {
  me: CenterManagerTC.getType(),
};
ViewerCenterManagerTC.addFields(ViewerCenterManagerTCFields);

ViewerCenterManagerTC.addResolver({
  kind: 'query',
  name: 'centerManagerAccess',
  type: ViewerCenterManagerTC,
  resolve: ({ context: { viewer } }) => ({ me: viewer }),
});
