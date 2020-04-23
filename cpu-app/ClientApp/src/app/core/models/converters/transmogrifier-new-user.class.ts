import { iDynamicsContactNotApproved } from "../dynamics-blob";
import { iPerson } from "../person.interface";
import { iServiceProvider } from "../service-provider.interface";
import { Person } from "../person.class";
import { ServiceProvider } from "../service-provider.class";

// a collection of the expense item guids as K/V pairs for generating line items
export class TransmogrifierNewUser {
    public organizationId: string;
    public userId: string;
    public person: iPerson;
    public serviceProvider: iServiceProvider;
    public isContractorContact: boolean;

    constructor(g: iDynamicsContactNotApproved = {}) {
        if (g) {
            this.userId = g.Userbceid;// this is the user's bceid
            this.organizationId = g.Businessbceid;// this is the organization's bceid
        }
        this.person = new Person();
        this.serviceProvider = new ServiceProvider();
        this.isContractorContact = false;
    }

}

