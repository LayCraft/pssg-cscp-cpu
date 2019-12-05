import { iProgramApplication } from "./program-application.class";
import { iDynamicsScheduleFResponse, iDynamicsCrmProgram } from "./dynamics-blob";
import { iContract } from "./contract";
import { contractCode } from "../constants/contract-code";
import { iProgram } from "./program";

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
        name: p.vsd_name,//string;
        formState: null,//string;
        contractId: p._vsd_contractid_value,//string;
        programId: p.vsd_programid,//string;
        email: p.vsd_emailaddress,//string;
        programLocation: p.vsd_city + '???',//string;
        serviceArea: p.vsd_city + '???',//string;
        phoneNumber: "",//string;
        faxNumber: "",//string;
        mainAddress: null,//iAddress;
        mailingAddress: null,//iAddress;
        programContact: null,//iPerson;
        revenueSources: [],//iRevenueSource[];
        additionalStaff: [],//iPerson[];
        operationHours: [],//iHours[];
        standbyHours: [],//iHours[];

      }
      // iterate over all of the programs to collect the impo
      applications.push(temp)
    }
    return applications;
  }
}


