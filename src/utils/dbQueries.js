import Moralis from "moralis";

export const initObject = (object) => {
  const Object = Moralis.Object.extend(object);
  const query = new Moralis.Query(Object);
  return [Object, query];
};

export const checkIfUserExists = async (address) => {
  const [Object, query] = initObject("user");
  query.equalTo("walletAddress", address);
  const results = await query.find();
  return results;
};

export const addUser = async (userData, setUser) => {
  console.log(userData);
  const [User] = initObject("user");
  const user = new User();
  const result = await user.save(userData);
  return result;
};

export const addCompany = async (companyData, address) => {
  const [Company, query] = initObject("Company");
  const company = new Company();
  await company.save(companyData);
  const user = (await checkIfUserExists(address))[0];
  console.log(user);
  user.set("Company", company);
  await user.save();
  console.log("Company data added to database");
};

export const getCompanyInfo = async (user) => {
  const company = user.get("Company");
  const data = await company.fetch();
  return data.attributes;
};

export const getParticularInvoice = async (user) => {
  const invoice = user.get("invoices");
  console.log(invoice);
  const data = await invoice[0].fetch();
  console.log(data);
  return data.attributes;
};

export const getInvoices = async (user) => {
  const invoice = user.get("invoices");
  return invoice;
};

export const addInvoice = async (user, invoiceData) => {
  const invoices = await getInvoices(user);
  const [Invoice] = initObject("Invoice");
  const invoice = new Invoice();
  await invoice.save(invoiceData);
  await user.save("invoices", [...invoices, invoice]);
};
