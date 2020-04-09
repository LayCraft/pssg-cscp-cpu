import { iPerson } from "../person.interface";
import { iDynamicsPostRegisterNewUser, iDynamicsCrmContactPost, iDynamicsCrmServiceProviderPost } from "../dynamics-post";
import { TransmogrifierNewUser } from "./transmogrifier-new-user.class";
import { convertPersonToDynamics } from "./person-to-dynamics";


export function convertNewUserToDynamics(trans: TransmogrifierNewUser): iDynamicsPostRegisterNewUser {
    let newContact: iDynamicsCrmContactPost = convertPersonToDynamics(trans.person);
    let serviceProvider: iDynamicsCrmServiceProviderPost = { name: trans.serviceProvider.name };
    return {
        BusinessBCeID: trans.organizationId,
        UserBCeID: trans.userId,
        NewContact: newContact,
        NewServiceProvider: serviceProvider
    };
}



