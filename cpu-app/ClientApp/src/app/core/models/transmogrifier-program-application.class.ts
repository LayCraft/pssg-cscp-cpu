import { iProgramApplication } from "./program-application.class";
import { iDynamicsScheduleFResponse, iDynamicsCrmProgram } from "./dynamics-blob";
import { iContract } from "./contract";
import { contractCode } from "../constants/contract-code";
import { iProgram } from "./program";

export class TransmogrifierProgramApplication {
  public organizationId: string;
  public userId: string;
  public programApplication: iContract;

  constructor(g: iDynamicsScheduleFResponse) {
    this.programApplication = this.buildContract(g);
  }

  buildContract(g: iDynamicsScheduleFResponse): iContract {
    const c: iContract = {
      category: contractCode(g.Contract.statuscode)[0],
      status: contractCode(g.Contract.statuscode)[1], // uneeded this is for the
      contractId: g.Contract.vsd_contractid,
      contractNumber: g.Contract.vsd_name,
      programs: [],
    };

    for (let program of g.ProgramCollection) {
      let temp: iProgram = {
        email: program.vsd_emailaddress,
        fax: program.vsd_fax,
        phone: program.vsd_phonenumber,
        programId: program.vsd_programid,
        programName: program.vsd_name,
        mailingAddress: {
          line1: program.vsd_mailingaddressline1,
          line2: program.vsd_mailingaddressline2,
          city: program.vsd_mailingcity,
          postalCode: program.vsd_mailingpostalcodezip,
          province: program.vsd_mailingprovincestate,
        },
        address: {
          line1: program.vsd_addressline1,
          line2: program.vsd_addressline2,
          city: program.vsd_city,
          postalCode: program.vsd_postalcodezip,
          province: program.vsd_provincestate,
        },
      }
      // iterate over all of the programs to collect the impo
      c.programs.push(temp)
    }
    return c;
  }
}


