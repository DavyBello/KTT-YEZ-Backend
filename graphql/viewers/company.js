const { CompanyTC, ViewerCompanyTC } = require('../composers');

const ViewerCompanyTCFields = {
  me: CompanyTC.getType(),
};
ViewerCompanyTC.addFields(ViewerCompanyTCFields);

ViewerCompanyTC.addResolver({
  kind: 'query',
  name: 'companyAccess',
  type: ViewerCompanyTC,
  resolve: ({ context: { viewer } }) => ({ me: viewer }),
});
