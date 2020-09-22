import { iAddress } from "./address.interface";
import { iCAPProgram } from "./cap-program.interface";
import { iPerson } from "./person.interface";

export class CAPProgram implements iCAPProgram {
    contractId: string;
    formState: string;
    name: string;
    programTypeName: string;
    programId: string;
    programLocation: string;
    maxAmount: number;
    applicationAmount: number;
    typesOfModels: [];
    evaluation: boolean;
    evaluationDescription: string;
    additionalComments: string;

    additionalStaff: iPerson[];
    removedStaff: iPerson[];
    programContact: iPerson;

    constructor(program?: iCAPProgram) {
        if (program) Object.assign(this, program);
    }
}