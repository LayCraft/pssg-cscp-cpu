import { iProgramApplication } from "./program-application.class";
import { iDynamicsScheduleFResponse } from "./dynamics-blob";

export class TransmogrifierExpenseReport {
  public organizationId: string;
  public userId: string;
  public programApplication: iProgramApplication;

  constructor(g: iDynamicsScheduleFResponse) {
    this.programApplication = this.buildProgramApplication(g);
  }
  buildProgramApplication(g: iDynamicsScheduleFResponse): iProgramApplication {
    // for every item in the schedule g's
    const p: iProgramApplication = {
      name: 'string',
      formState: 'string',
      contractId: 'string',
      programId: 'string',
      email: 'string',
      programLocation: 'string',
      serviceArea: 'string',
      phoneNumber: 'string',
      faxNumber: 'string',

      mainAddress: null,
      mailingAddress: null,
      programContact: null,

      revenueSources: [],
      additionalStaff: [],
      operationHours: [],
      standbyHours: []
    };

    return p;
  }
}


