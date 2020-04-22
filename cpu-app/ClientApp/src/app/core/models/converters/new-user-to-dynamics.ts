import { iPerson } from "../person.interface";
import { iDynamicsPostRegisterNewUser, iDynamicsCrmContactPost, iDynamicsCrmServiceProviderPost } from "../dynamics-post";
import { TransmogrifierNewUser } from "./transmogrifier-new-user.class";
import { convertPersonToDynamics } from "./person-to-dynamics";
import { iServiceProvider } from "../service-provider.interface";


export function convertNewUserToDynamics(trans: TransmogrifierNewUser): iDynamicsPostRegisterNewUser {
    let newContact: iDynamicsCrmContactPost = convertPersonToDynamics(trans.person);
    let serviceProvider: iDynamicsCrmServiceProviderPost = convertServiceProviderToDynamics(trans.serviceProvider);
    return {
        BusinessBCeID: trans.organizationId,
        UserBCeID: trans.userId,
        NewContact: newContact,
        NewServiceProvider: serviceProvider
    };
}

function convertServiceProviderToDynamics(sp: iServiceProvider) {
    const post: iDynamicsCrmServiceProviderPost = {};
  // add all properties that are non null
  if (sp.address && sp.address.city) post.vsd_city = sp.address.city;
  if (sp.address && sp.address.line1) post.vsd_addressline1 = sp.address.line1;
  if (sp.address && sp.address.line2) post.vsd_addressline2 = sp.address.line2;
  if (sp.address && sp.address.postalCode) post.vsd_postalcodezip = sp.address.postalCode;
  if (sp.address && sp.address.province) post.vsd_provincestate = sp.address.province;
  if (sp.email) post.vsd_emailaddress = sp.email;
  if (sp.fax) post.vsd_fax = sp.fax;
  if (sp.phone) post.vsd_phonenumber = sp.phone;
  // return the person
  return post;
}



