import { iProgramApplication } from "./program-application.class";
import { iDynamicsScheduleFResponse, iDynamicsCrmProgram } from "./dynamics-blob";
import { iContract } from "./contract";

export class TransmogrifierProgramApplication {
  public organizationId: string;
  public userId: string;
  public programApplication: iContract;

  constructor(g: iDynamicsScheduleFResponse) {
    this.programApplication = this.buildContract(g);
  }

  buildContract(g: iDynamicsScheduleFResponse): iContract {
    const c: iContract = {
      category: 'upcoming',
      contractId: '',
      contractNumber: '',
      status: '',
      programs: [],
      tasks: [],
    };

    return c;
  }
}


