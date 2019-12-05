import { iProgramApplication } from "./program-application.class";
import { iDynamicsScheduleFResponse } from "./dynamics-blob";
import { iHours } from "./hours.class";
import * as moment from 'moment';
import { convertToWeekDays } from '../constants/convert-to-week-days';

export class TransmogrifierProgramApplication {
  public organizationId: string;
  public userId: string;
  public programApplications: iProgramApplication[];

  constructor(g: iDynamicsScheduleFResponse) {
    this.programApplications = this.buildProgramApplications(g);
  }

  buildProgramApplications(g: iDynamicsScheduleFResponse): iProgramApplication[] {
    const applications: iProgramApplication[] = [];

    for (let p of g.ProgramCollection) {
      let temp: iProgramApplication = {
        name: p.vsd_name,
        formState: null,
        contractId: p._vsd_contractid_value,
        programId: p.vsd_programid,
        email: p.vsd_emailaddress,
        programLocation: p.vsd_city + '???',
        serviceArea: p.vsd_city + '???',
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
          me: null,
          lastName: null,
          firstName: null,
          email: null,
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
          //save the hours into a useful format.
          let hours: iHours = {
            open: null,
            closed: null,
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
