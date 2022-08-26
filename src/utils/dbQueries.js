import Moralis from "moralis";

export const initObject = (object) => {
  const Object = Moralis.Object.extend(object);
  const query = new Moralis.Query(Object);
  return { Object, query };
};

export function checkIfUserExists(address) {
  return new Promise( async (resolve, reject)=>{
    try{
      console.log(address, "In db queries");
      const { query } = initObject("user");
      query.equalTo("walletAddress", address);
      const results = await query.find();
      console.log(results);
      resolve (results);
    } catch (e){
      reject (e);
    }
  })
}

export const addUser = (userData) => {
  return new Promise(async (resolve, reject)=>{
    try{
      console.log(userData);
      const { Object: User } = initObject("user");
      const user = new User();
      const result = await user.save(userData);
      resolve (result);
    } catch (e){
      reject(e);
    }
  })
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

export const getParticularInvoice = (id) => {
  return new Promise( async (resolve, reject)=>{
      try{
          const Invoice = Moralis.Object.extend("Invoice");
          const query = new Moralis.Query(Invoice);
          query.equalTo("invoice_id", Number(id));
          const results = await query.find()
          console.log(results);
          resolve(results[0]);
      }
      catch(e){
          reject({...e})
      }
  })
}

export const getInvoices = async (user) => {
  const invoice = user.get("invoices");
  return invoice;
};

export const addInvoice = async (invoiceData) => {
  return new Promise(async (resolve, reject)=>{
    try{
      const { Object: Invoice } = initObject("Invoice");
      const invoice = new Invoice();
      await invoice.save(invoiceData);
      resolve({ok: true, message: "completed"})
    }
    catch(e){
      reject({ok: false, message: "Could not add Invoice"});
    }
  })
};