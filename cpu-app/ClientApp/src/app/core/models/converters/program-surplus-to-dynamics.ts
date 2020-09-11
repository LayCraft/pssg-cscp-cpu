import { iDynamicsPostSurplusPlan } from "../dynamics-post";
import { TransmogrifierProgramSurplus } from "../transmogrifier-program-surplus.class";

export function convertProgramSurplusToDynamics(trans: TransmogrifierProgramSurplus): iDynamicsPostSurplusPlan {
    let ret: iDynamicsPostSurplusPlan = {
        BusinessBCeID: trans.organizationId,
        UserBCeID: trans.userId,
        SurplusPlanCollection: [{
            vsd_surplusplanreportid: trans.surplusPlanId,
            vsd_surplusremittance: trans.pay_with_cheque
        }],
        SurplusPlanLineItemCollection: []
    };

    trans.lineItems.forEach(item => {
        ret.SurplusPlanLineItemCollection.push({
            vsd_surpluslineitemid: item.id,
            vsd_surplusplanid: item.surplus_plan_id,
            vsd_justificationdetails: item.justification,
            vsd_proposedexpenditures: item.amount,
            vsd_actualexpenditures: item.expenditures_q1,
            vsd_actualexpenditures2: item.expenditures_q2,
            vsd_actualexpenditures3: item.expenditures_q3,
            vsd_actualexpenditures4: item.expenditures_q4,
        });
    });

    return ret;
}