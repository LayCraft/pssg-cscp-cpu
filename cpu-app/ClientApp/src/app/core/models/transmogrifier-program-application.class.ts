import { iProgramApplication } from "./program-application.class";
import { iDynamicsScheduleFResponse } from "./dynamics-blob";
import { iHours } from "./hours.class";
import * as moment from 'moment';
import { convertToWeekDays } from '../constants/convert-to-week-days';
import { iContactInformation, ContactInformation } from "./contact-information.class";
import { iAdministrativeInformation, AdministrativeInformation } from "./administrative-information.class";

export class TransmogrifierProgramApplication {
  organizationId: string;
  userId: string;
  contractId: string;
  administrativeInformation: iAdministrativeInformation;
  cglInsurance: string; // commercial general liability insurance detail string picked from options.
  contactInformation: iContactInformation;
  programApplications: iProgramApplication[];

  constructor(g: iDynamicsScheduleFResponse) {
    this.organizationId = undefined;
    this.userId = g.Contract.vsd_contractid;
    this.contractId = g.Contract.vsd_contractid;
    this.administrativeInformation = new AdministrativeInformation();
    this.contactInformation = this.buildContactInformation(g);
    this.programApplications = this.buildProgramApplications(g);
  }
  private buildContactInformation(b: iDynamicsScheduleFResponse): iContactInformation {
    return {
      phoneNumber: b.Organization.telephone1 || null,
      emailAddress: b.Organization.emailaddress1 || null,
      faxNumber: b.Organization.fax || null,
      mainAddress: {
        city: b.Organization.address1_city || null,
        line1: b.Organization.address1_line1 || null,
        line2: b.Organization.address1_line2 || null,
        postalCode: b.Organization.address1_postalcode || null,
        province: b.Organization.address1_stateorprovince || null,
      },
      mailingAddress: {
        city: b.Organization.address2_city || null,
        line1: b.Organization.address2_line1 || null,
        line2: b.Organization.address2_line2 || null,
        postalCode: b.Organization.address2_postalcode || null,
        province: b.Organization.address2_stateorprovince || null,
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
        me: null,
        address: {
          city: b.ExecutiveContact.address1_city || null,
          line1: b.ExecutiveContact.address1_line1 || null,
          line2: b.ExecutiveContact.address1_line2 || null,
          postalCode: b.ExecutiveContact.address1_postalcode || null,
          province: b.ExecutiveContact.address1_stateorprovince || null,
        }
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
        me: null,
        address: {
          city: b.BoardContact.address1_city || null,
          line1: b.BoardContact.address1_line1 || null,
          line2: b.BoardContact.address1_line2 || null,
          postalCode: b.BoardContact.address1_postalcode || null,
          province: b.BoardContact.address1_stateorprovince || null,
        }
      }
    }
  }
  private buildProgramApplications(g: iDynamicsScheduleFResponse): iProgramApplication[] {
    const applications: iProgramApplication[] = [];

    for (let p of g.ProgramCollection) {
      let temp: iProgramApplication = {
        name: p.vsd_name,
        formState: undefined,
        contractId: p._vsd_contractid_value,
        programId: p.vsd_programid,
        email: p.vsd_emailaddress,
        programLocation: undefined,
        serviceArea: undefined,
        phoneNumber: p.vsd_phonenumber,
        faxNumber: p.vsd_fax,
        mainAddress: {
          line1: p.vsd_addressline1,
          line2: p.vsd_addressline2,
          city: p.vsd_city,
          postalCode: p.vsd_postalcodezip,
          province: p.vsd_provincestate
        },
        mailingAddress: {
          city: p.vsd_mailingcity,
          line1: p.vsd_mailingaddressline1,
          line2: p.vsd_mailingaddressline2,
          postalCode: p.vsd_mailingpostalcodezip,
          province: p.vsd_mailingprovincestate
        },
        programContact: {
          personId: p._vsd_contactlookup_value,
          me: undefined,
          lastName: undefined,
          firstName: undefined,
          email: undefined,
        },
        revenueSources: [],//iRevenueSource[];
        additionalStaff: [],//iPerson[];
        operationHours: [],//iHours[];
        standbyHours: [],//iHours[];
      }
      // add operation and standby hours
      for (let sched of g.ScheduleCollection) {
        // if the schedule matches this program collect it.
        if (sched._vsd_programid_value === p.vsd_programid) {
          // split the times into something that we can turn into moment
          const open: number[] = sched.vsd_scheduledstarttime.split(':').map(x => parseInt(x));
          const closed: number[] = sched.vsd_scheduledstarttime.split(':').map(x => parseInt(x));

          const hours: iHours = {
            //save the hours into moment format.
            open: moment().hours(open[0]).minutes(open[1]),
            closed: moment().hours(closed[0]).minutes(closed[1]),
            // save the identifier for the post back to dynamics
            hoursId: sched.vsd_scheduleid,
            // convert the nasty comma seperated string version to useful week day boolean
            ...convertToWeekDays(sched.vsd_days)
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
}
