function getHeaderData() {
  const header = {};
  return header;
}

const action = definition => {
  const data = {
    ...definition,
  };
  if (data && data.payload && data.payload.request) {
    const header = data.payload.request.headers || {};
    const basicHeader = getHeaderData(definition);
    const updatedHeader = {
      ...basicHeader,
      ...header,
    };
    data.payload.request.headers = updatedHeader;
  }
  return data;
};

export default action;
