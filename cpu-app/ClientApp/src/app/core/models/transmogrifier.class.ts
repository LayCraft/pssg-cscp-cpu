import { iOrganizationMeta } from './organization-meta.class';
import { iAddress } from './address.class';
import { iContactInformation } from './contact-information.class';
import { iPerson } from './person.class';
import { iMinistryUser } from './ministry-user';
import { iContract } from './contract';
import { iTask } from './task';
import { iProgram } from './program';
import { iDynamicsBlob, iDynamicsCrmContact, iDynamicsOrganization, iDynamicsPostOrg, iDynamicsPostUsers } from './dynamics-blob';
import { formType } from '../constants/form-type';
import { contractCode } from '../constants/contract-code';
import { taskCode } from '../constants/task-code';

export class Transmogrifier {
  // collections of viewmodels
  public organizationMeta: iOrganizationMeta;
  public persons: iPerson[];
  public contracts: iContract[];
  public ministryContact: iMinistryUser;

  constructor(b: iDynamicsBlob) {
    this.organizationMeta = this.buildOrganizationMeta(b);
    this.persons = this.buildPersons(b);
    this.ministryContact = this.buildMinistryContact(b);
    this.contracts = this.buildContracts(b);
    if (!this.organizationMeta.organizationId || !this.organizationMeta.userId) {
      alert('There is a major problem with the content returned from the backend. BCEID information is missing which makes it impossible to interact in a meaningful way.');
    }
  }
  private buildTasks(b: iDynamicsBlob, contractId: string): iTask[] {
    const tasks: iTask[] = [];
    for (let task of b.Tasks) {
      // if the task matches the supplied contract return it
      if (task._regardingobjectid_value === contractId) {
        tasks.push({
          // convert the status from a meaningless dynamics number to a meaningful string
          status: taskCode(task.statuscode),
          // convert the numeric completion state from meaningless dynamics number to a useful boolean
          isCompleted: this.isCompleted(task.statecode),
          taskName: formType(task._vsd_tasktypeid_value, true),
          taskTitle: task.subject,
          taskDescription: task.description,
          // make a date from the supplied date. TODO MomentJS
          deadline: task.scheduledend ? new Date(task.scheduledend) : null,
          // lookups are dumb coming back from Dynamics we unify lookups so that we don't have Dynamics idiocy running wild in the forms.
          // sometimes we look up by a scheduleG ID, sometimes by a contractId, sometimes by a programId. :-(
          // the front end doesn't need to handle guids differently. They all act as a lookup key.
          // this is shorthand for an if statement in an if statement
          taskId: formType(task._vsd_tasktypeid_value) === "expense_report"
            ? task._vsd_schedulegid_value
            : formType(task._vsd_tasktypeid_value) === "budget_proposal" ? task._vsd_programid_value : contractId,
          // what kind of form is this?
          formType: formType(task._vsd_tasktypeid_value),
        });
      }
    }
   ) return tasks;

  }
  private buildPrograms(b: iDynamicsBlob, contractId: string): iProgram[] {
    const programs: iProgram[] = [];
    for (let program of b.Programs) {
      if (program._vsd_contractid_value === contractId) {
        programs.push({
          // build an address
          address: {
            city: program.vsd_city,
            line1: program.vsd_addressline1,
            line2: program.vsd_addressline2,
            postalCode: program.vsd_city,
            province: program.vsd_provincestate,
          },
          email: program.vsd_emailaddress,
          fax: program.vsd_fax,
          // build an address
          mailingAddress: {
            city: program.vsd_mailingcity,
            line1: program.vsd_mailingaddressline1,
            line2: program.vsd_mailingaddressline2,
            postalCode: program.vsd_mailingcity,
            province: program.vsd_mailingprovincestate,
          },
          phone: program.vsd_phonenumber,
          programId: program.vsd_programid,
          programName: program.vsd_name,
        });
      }
    }
    return programs;
  }
  private isCompleted(code: number): boolean {
    if (code === 1) {
      return true; // this is completed
    } else {
      return false; // this is not completed
    }
  }
  private buildContracts(b: iDynamicsBlob): iContract[] {
    const contracts: iContract[] = [];
    if (b.Contracts.length > 0) {
      for (let contract of b.Contracts) {
        const status: [string, string] = contractCode(contract.statuscode);
        contracts.push({
          // upcoming, current, past
          category: status[0],
          // Sent, Received, Processing, Recommended for Approval, Escalated, Information Denied, Approved, Archived, No Status
          contractId: contract.vsd_contractid,
          contractNumber: contract.vsd_name,
          // isCompleted: this.isCompleted(contract.statecode), //TODO: Is this actually meaningful in the FE?
          programs: this.buildPrograms(b, contract.vsd_contractid),
          status: status[1],
          tasks: this.buildTasks(b, contract.vsd_contractid),
        });
      }
    }
    return contracts;
  }
  private buildMinistryContact(b: iDynamicsBlob): iMinistryUser {
    return {
      firstName: b.MinistryUser.firstname,
      lastName: b.MinistryUser.lastname,
      email: b.MinistryUser.internalemailaddress,
      phone: b.MinistryUser.address1_telephone1,
    };
  }
  private buildOrganizationMeta(b: iDynamicsBlob): iOrganizationMeta {
    // collect the organization meta and structure it into a new shape
    return {
      userId: b.Userbceid || null,
      accountId: b.Organization.accountid || null, // the dynamics id must be included when posting back sometimes.
      organizationId: b.Businessbceid || null,
      organizationName: b.Organization.name || null,
      contactInformation: {
        phoneNumber: b.Organization.telephone1 || null,
        emailAddress: b.Organization.emailaddress1 || null,
        faxNumber: b.Organization.fax || null,
        mainAddress: {
          city: b.Organization.address1_city || null,
          line1: b.Organization.address1_line1 || null,
          line2: b.Organization.address1_line2 || null,
          postalCode: b.Organization.address1_postalcode || null,
          province: b.Organization.address1_stateorprovince || null,
        } as iAddress,
        mailingAddress: {
          city: b.Organization.address2_city || null,
          line1: b.Organization.address2_line1 || null,
          line2: b.Organization.address2_line2 || null,
          postalCode: b.Organization.address2_postalcode || null,
          province: b.Organization.address2_stateorprovince || null,
        } as iAddress,
        executiveContact: {
          email: b.ExecutiveContact.emailaddress1 || null,
          fax: b.ExecutiveContact.fax || null,
          firstName: b.ExecutiveContact.firstname || null,
          lastName: b.ExecutiveContact.lastname || null,
          middleName: b.ExecutiveContact.middlename || null,
          personId: b.ExecutiveContact.contactid || null,
          phone: b.ExecutiveContact.mobilephone || null,
          title: b.ExecutiveContact.jobtitle || null,
          address: {
            city: b.ExecutiveContact.address1_city || null,
            line1: b.ExecutiveContact.address1_line1 || null,
            line2: b.ExecutiveContact.address1_line2 || null,
            postalCode: b.ExecutiveContact.address1_postalcode || null,
            province: b.ExecutiveContact.address1_stateorprovince || null,
          } as iAddress
        },
        boardContact: {
          email: b.BoardContact.emailaddress1 || null,
          fax: b.BoardContact.fax || null,
          firstName: b.BoardContact.firstname || null,
          lastName: b.BoardContact.lastname || null,
          middleName: b.BoardContact.middlename || null,
          personId: b.BoardContact.contactid || null,
          phone: b.BoardContact.mobilephone || null,
          title: b.BoardContact.jobtitle || null,
          address: {
            city: b.BoardContact.address1_city || null,
            line1: b.BoardContact.address1_line1 || null,
            line2: b.BoardContact.address1_line2 || null,
            postalCode: b.BoardContact.address1_postalcode || null,
            province: b.BoardContact.address1_stateorprovince || null,
          } as iAddress
        },
      } as iContactInformation
    } as iOrganizationMeta;
  }
  private buildPersons(b: iDynamicsBlob): iPerson[] {
    const personList: iPerson[] = [];
    for (let p of b.Staff) {
      const person: iPerson = {
        address: {
          city: p.address1_city || null,
          line1: p.address1_line1 || null,
          line2: p.address1_line2 || null,
          postalCode: p.address1_postalcode || null,
          province: p.address1_stateorprovince || null,
        },
        email: p.emailaddress1 || null,
        fax: p.fax || null,
        firstName: p.firstname || null,
        lastName: p.lastname || null,
        middleName: p.middlename || null,
        personId: p.contactid || null,
        userId: p.vsd_bceid || null,
        phone: p.mobilephone || null,
        title: p.jobtitle || null,
        // if this person has the right value it is me.
        me: p.vsd_bceid ? true : false,
        // if the state code is zero or null the user is active
        deactivated: !p.statecode || p.statecode === 0 ? false : true || null,
      }
      personList.push(person);
    }
    return personList.sort((a: iPerson, b: iPerson) => {
      // same last name? sort by first name
      if (a.lastName === b.lastName) {
        // same first name? sort by middle name
        if (a.firstName === b.firstName) {
          // same middle name? just give up.
          if (a.middleName === b.middleName) {
            return 0
          }
          // sort by middle name
          if (a.middleName < b.middleName) {
            return -1;
          }
          if (a.middleName > a.middleName) {
            return 1;
          }
        }
        // sort by first name
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
      }
      // sort by last name
      if (a.lastName < b.lastName) {
        return -1;
      }
      if (a.lastName > b.lastName) {
        return 1;
      }
      // if there is an edge case return 0 so nothing breaks.
      return 0;
    });
  }
}

// this is a mapper function for posting the organization back to dynamics
export function DynamicsPostOrganization(userId: string, organizationId: string, accountId: string, f: iContactInformation): iDynamicsPostOrg {
  const org: iDynamicsOrganization = {};
  // map contact info to the dynamics format
  if (f.boardContact && f.boardContact.personId) org.vsd_BoardContactIdfortunecookiebind = f.boardContact.personId;
  if (f.emailAddress) org.emailaddress1 = f.emailAddress;
  if (f.executiveContact && f.executiveContact.personId) org.vsd_ExecutiveContactIdfortunecookiebind = f.executiveContact.personId;
  if (f.faxNumber) org.fax = f.faxNumber;
  if (f.mailingAddress && f.mailingAddress.city) org.address2_city = f.mailingAddress.city;
  if (f.mailingAddress && f.mailingAddress.line1) org.address2_line1 = f.mailingAddress.line1;
  if (f.mailingAddress && f.mailingAddress.line2) org.address2_line2 = f.mailingAddress.line2;
  if (f.mailingAddress && f.mailingAddress.postalCode) org.address2_postalcode = f.mailingAddress.postalCode;
  if (f.mailingAddress && f.mailingAddress.province) org.address2_stateorprovince = f.mailingAddress.province;
  if (f.mainAddress && f.mainAddress.city) org.address1_city = f.mainAddress.city;
  if (f.mainAddress && f.mainAddress.line1) org.address1_line1 = f.mainAddress.line1;
  if (f.mainAddress && f.mainAddress.line2) org.address1_line2 = f.mainAddress.line2;
  if (f.mainAddress && f.mainAddress.postalCode) org.address1_postalcode = f.mainAddress.postalCode;
  if (f.mainAddress && f.mainAddress.province) org.address1_stateorprovince = f.mainAddress.province;
  if (f.phoneNumber) org.telephone1 = f.phoneNumber;
  // add the account id to the object
  org["accountid"] = accountId;
  return {
    BusinessBCeID: organizationId,
    UserBCeID: userId,
    Organization: org,
  } as iDynamicsPostOrg;
}
//this is a mapper function for converting people into dynamics users
export function DynamicsPostUsers(userId: string, organizationId: string, people: iPerson[]): iDynamicsPostUsers {
  const ppl: iDynamicsCrmContact[] = [];
  for (let person of people) {
    // convert the person to a contact
    const p: iDynamicsCrmContact = convertPersonToCrmContact(person);
    // add person to the collection
    ppl.push(p);
  }
  return {
    UserBCeID: userId,
    BusinessBCeID: organizationId,
    StaffCollection: ppl
  } as iDynamicsPostUsers;
}
// this is a mapper function that converts one person into a crm contact
export function convertPersonToCrmContact(person: iPerson): iDynamicsCrmContact {
  const p: iDynamicsCrmContact = {};
  // add all properties that are non null
  if (person.address && person.address.city) p.address1_city = person.address.city;
  if (person.address && person.address.line1) p.address1_line1 = person.address.line1;
  if (person.address && person.address.line2) p.address1_line2 = person.address.line2;
  if (person.address && person.address.postalCode) p.address1_postalcode = person.address.postalCode;
  if (person.address && person.address.province) p.address1_stateorprovince = person.address.province;
  if (person.deactivated) p.statecode = 1; // sending a 1 statuscode means soft delete the record
  if (person.email) p.emailaddress1 = person.email;
  if (person.fax) p.fax = person.fax;
  if (person.firstName) p.firstname = person.firstName;
  if (person.lastName) p.lastname = person.lastName;
  if (person.middleName) p.middlename = person.middleName;
  if (person.personId) p.contactid = person.personId;
  if (person.phone) p.mobilephone = person.phone;
  if (person.title) p.jobtitle = person.title;
  // return the person
  return p;
}
