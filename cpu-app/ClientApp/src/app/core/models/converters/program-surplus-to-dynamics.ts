import { iPerson } from "../person.interface";
import { iDynamicsPostSurplusPlan } from "../dynamics-post";
import { TransmogrifierProgramSurplus } from "../transmogrifier-program-surplus.class";
import { iSurplusItem } from "../surplus-item.interface";
import { iDynamicsSurplusPlanLineItem } from "../dynamics-blob";

//this is a mapper function for converting people into dynamics users
export function convertProgramSurplusToDynamics(trans: TransmogrifierProgramSurplus): iDynamicsPostSurplusPlan {
    let ret: iDynamicsPostSurplusPlan = {
        BusinessBCeID: trans.organizationId,
        UserBCeID: trans.userId,
        SurplusPlanLineItemCollection: []
    };

    trans.lineItems.forEach(item => {
        ret.SurplusPlanLineItemCollection.push({
            vsd_surpluslineitemid: item.id,
            vsd_surplusplanid: item.surplus_plan_id,
            vsd_justificationdetails: item.justification,
            vsd_allocatedamount: item.allocated_amount,
            vsd_actualexpenditures: item.expenditures_q1,
            vsd_actualexpenditures2: item.expenditures_q2,
            vsd_actualexpenditures3: item.expenditures_q3,
            vsd_actualexpenditures4: item.expenditures_q4,
        });
    });

    return ret;
}