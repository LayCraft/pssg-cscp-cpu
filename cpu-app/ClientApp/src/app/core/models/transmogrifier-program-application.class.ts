import * as moment from 'moment';
import { decodeCcseaMemberType } from '../constants/decode-ccsea-member-type';
import { decodeCglInsurance } from '../constants/decode-cgl-insurance-type';
import { decodeToWeekDays } from '../constants/decode-to-week-days';
import { iAdministrativeInformation } from "./administrative-information.interface";
import { iContactInformation } from "./contact-information.interface";
import { iDynamicsScheduleFResponse, iDynamicsCrmContact } from "./dynamics-blob";
import { iHours } from "./hours.interface";
import { iPerson } from "./person.interface";
import { iProgramApplication } from "./program-application.interface";
import { iSignature } from '../../authenticated/subforms/program-authorizer/program-authorizer.component';

export class TransmogrifierProgramApplication {
  contractId: string;
  contractName: string;
  contractNumber: string;
  organizationId: string;
  organizationName: string;
  userId: string;
  administrativeInformation: iAdministrativeInformation;
  cglInsurance: string; // commercial general liability insurance detail string picked from options.
  contactInformation: iContactInformation;
  programApplications: iProgramApplication[];
  signature: iSignature;

  constructor(g: iDynamicsScheduleFResponse) {
    this.contractId = g.Contract.vsd_contractid;
    this.contractName = g.Contract.vsd_name;
    this.contractNumber = g.Contract.vsd_name;
    this.organizationId = g.Businessbceid;
    this.organizationName = g.Organization.name;
    this.userId = g.Userbceid;
    this.cglInsurance = decodeCglInsurance(g.Contract.vsd_cpu_insuranceoptions);
    this.administrativeInformation = this.buildAdministrativeInformation(g);
    this.contactInformation = this.buildContactInformation(g);
    this.programApplications = this.buildProgramApplications(g);
    this.signature = this.buildSignature(g);
  }
  private buildSignature(b: iDynamicsScheduleFResponse): iSignature {
    // @TODO: Get signature and load it
    return undefined;
  }
  private buildAdministrativeInformation(b: iDynamicsScheduleFResponse): iAdministrativeInformation {
    const staffSubcontractedPersons: iPerson[] = [];
    b.StaffCollection.map((s: iDynamicsCrmContact): iPerson => {
      return {
        email: s.emailaddress1 || null,
        fax: s.fax || null,
        firstName: s.firstname || null,
        lastName: s.lastname || null,
        middleName: s.middlename || null,
        personId: s.contactid || null,
        phone: s.mobilephone || null,
        title: s.jobtitle || null,
        userId: s.vsd_bceid || null,
        address: {
          city: s.address1_city || null,
          country: s.address1_country || 'Canada',
          line1: s.address1_line1 || null,
          line2: s.address1_line2 || null,
          postalCode: s.address1_postalcode || null,
          province: s.address1_stateorprovince || null,
        },
      };
    });

    return {
      ccseaMemberType: decodeCcseaMemberType(b.Contract.vsd_cpu_memberofcssea),
      compliantEmploymentStandardsAct: b.Contract.vsd_cpu_humanresourcepolicies ? b.Contract.vsd_cpu_humanresourcepolicies.includes("100000000") : null,
      compliantHumanRights: b.Contract.vsd_cpu_humanresourcepolicies ? b.Contract.vsd_cpu_humanresourcepolicies.includes("100000001") : null,
      compliantWorkersCompensation: b.Contract.vsd_cpu_humanresourcepolicies ? b.Contract.vsd_cpu_humanresourcepolicies.includes("100000002") : null,
      staffSubcontractedPersons,
      staffUnion: b.Contract.vsd_cpu_specificunion,
      staffSubcontracted: b.Contract.vsd_cpu_programstaffsubcontracted,
      staffUnionized: b.Contract.vsd_cpu_staffunionized,
    };
  }
  private buildContactInformation(b: iDynamicsScheduleFResponse): iContactInformation {
    return {
      emailAddress: b.Organization.emailaddress1 || null,
      faxNumber: b.Organization.fax || null,
      phoneNumber: b.Organization.telephone1 || null,
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
          country: b.BoardContact.address1_country || 'Canada',
          line1: b.BoardContact.address1_line1 || null,
          line2: b.BoardContact.address1_line2 || null,
          postalCode: b.BoardContact.address1_postalcode || null,
          province: b.BoardContact.address1_stateorprovince || null
        },
      },
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
          country: b.ExecutiveContact.address1_country || 'Canada',
          line1: b.ExecutiveContact.address1_line1 || null,
          line2: b.ExecutiveContact.address1_line2 || null,
          postalCode: b.ExecutiveContact.address1_postalcode || null,
          province: b.ExecutiveContact.address1_stateorprovince || null,
        }
      },
      mailingAddress: {
        city: b.Organization.address2_city || null,
        country: b.Organization.address2_country || 'Canada',
        line1: b.Organization.address2_line1 || null,
        line2: b.Organization.address2_line2 || null,
        postalCode: b.Organization.address2_postalcode || null,
        province: b.Organization.address2_stateorprovince || null
      },
      mainAddress: {
        city: b.Organization.address1_city || null,
        country: b.Organization.address1_country || 'Canada',
        line1: b.Organization.address1_line1 || null,
        line2: b.Organization.address1_line2 || null,
        postalCode: b.Organization.address1_postalcode || null,
        province: b.Organization.address1_stateorprovince || null
      }
    }
  }
  private buildProgramApplications(g: iDynamicsScheduleFResponse): iProgramApplication[] {
    const applications: iProgramApplication[] = [];
    for (let p of g.ProgramCollection) {
      let temp: iProgramApplication = {
        contractId: p._vsd_contractid_value,
        email: p.vsd_emailaddress || g.Organization.emailaddress1 || null, // fallback to organization email address
        faxNumber: p.vsd_fax,
        formState: 'untouched',// untouched	incomplete invalid complete info,
        name: p.vsd_name,
        phoneNumber: p.vsd_phonenumber,
        programId: p.vsd_programid,
        programLocation: p._vsd_cpu_regiondistrict_value,
        serviceArea: p._vsd_cpu_regiondistrict_value,
        mainAddress: {
          line1: p.vsd_addressline1 || null,
          line2: p.vsd_addressline2 || null,
          city: p.vsd_city || null,
          postalCode: p.vsd_postalcodezip || null,
          province: p.vsd_provincestate || null,
          country: p.vsd_country || 'Canada',
        },
        mailingAddress: {
          city: p.vsd_mailingcity || null,
          line1: p.vsd_mailingaddressline1 || null,
          line2: p.vsd_mailingaddressline2 || null,
          postalCode: p.vsd_mailingpostalcodezip || null,
          province: p.vsd_mailingprovincestate || null,
          country: p.vsd_mailingcountry || 'Canada',
        },
        programContact: g.StaffCollection
          .filter((c: iDynamicsCrmContact): boolean => p._vsd_contactlookup_value === c.contactid)
          .map(p => this.makePerson(p))[0],
        // revenueSources: [],//iRevenueSource[];
        additionalStaff: g.ProgramContactCollection
          .filter((c: iDynamicsCrmContact) => c.vsd_programid = p.vsd_programid)
          .map(p => this.makePerson(p)),// iPerson[];
        operationHours: [],//iHours[];
        standbyHours: [],//iHours[];
      }
      // add operation and standby hours
      for (let sched of g.ScheduleCollection) {
        // if the schedule matches this program collect it.
        if (sched._vsd_programid_value === p.vsd_programid) {
          // split the times into something that we can turn into moment
          const open: number[] = sched.vsd_scheduledstarttime.split(':').map(x => parseInt(x));
          const closed: number[] = sched.vsd_scheduledendtime.split(':').map(x => parseInt(x));

          const hours: iHours = {
            //save the hours into moment format.
            open: moment().hours(open[0]).minutes(open[1]).toString(),
            closed: moment().hours(closed[0]).minutes(closed[1]).toString(),
            // save the identifier for the post back to dynamics
            hoursId: sched.vsd_scheduleid,
            // convert the nasty comma seperated string version to useful week day boolean
            ...decodeToWeekDays(sched.vsd_days)
          };
          // check for which collection of hours this is
          if (sched.vsd_cpu_scheduletype === 100000000) {
            // The type is active hours
            temp.operationHours.push(hours);
          } else if (sched.vsd_cpu_scheduletype === 100000001) {
            // the type is standby hours
            temp.standbyHours.push(hours);
          }
        }
      }
      // add to the collection of program applications
      applications.push(temp)
    }
    return applications;
  }
  private makePerson(c: iDynamicsCrmContact): iPerson {
    return {
      email: c.emailaddress1 || null,
      fax: c.fax || null,
      firstName: c.firstname || null,
      lastName: c.lastname || null,
      middleName: c.middlename || null,
      personId: c.contactid || null,
      phone: c.mobilephone || null,
      title: c.jobtitle || null,
      userId: c.vsd_bceid || null,
      address: {
        line1: c.address1_line1 || null,
        line2: c.address1_line2 || null,
        city: c.address1_city || null,
        postalCode: c.address1_postalcode || null,
        province: c.address1_stateorprovince || null,
        country: c.address1_country || 'Canada',
      },
    }
  }
}

