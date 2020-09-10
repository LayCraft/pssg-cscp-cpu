

import * as _ from 'lodash';
import { iSurplusItem } from './surplus-item.interface';
import { iDynamicsProgramSurplusResponse, iDynamicsSurplusPlanLineItem, iDynamicsEligibleExpenseItem } from './dynamics-blob';

export class TransmogrifierProgramSurplus {
    contractId: string;
    contractNumber: string;
    organizationId: string;
    organizationName: string;
    programId: string;
    programName: string;

    surplusPlanId: string;
    lineItems: iSurplusItem[];

    userId: string;

    constructor(g: iDynamicsProgramSurplusResponse) {
        this.contractId = g.Contract.vsd_contractid;
        this.contractNumber = g.Contract.vsd_name;
        this.organizationId = g.Businessbceid;
        this.organizationName = g.Organization.name;
        this.programId = g.Program.vsd_programid;
        this.programName = g.Program.vsd_name;
        this.userId = g.Userbceid;
        this.surplusPlanId = g.SurplusPlan.vsd_surplusplanreportid;
        this.lineItems = this.buildSurplusLineItems(g)
    }

    buildSurplusLineItems(g: iDynamicsProgramSurplusResponse) {
        let ret: iSurplusItem[] = [];
        let lineItems: iDynamicsSurplusPlanLineItem[] = g.SurplusPlanLineItems;

        lineItems.forEach(item => {
            let obj: iSurplusItem = {
                id: item.vsd_surpluslineitemid,
                name: item.vsd_name,
                expense_name: this.getExpenseName(item._vsd_eligibleexpenseitemid_value, g.EligibleExpenseItemCollection),
                justification: item.vsd_justificationdetails,
                surplus_plan_id: item._vsd_surplusplanid_value,
                allocated_amount: item.vsd_allocatedamount,
                allocated_amount_mask: item.vsd_allocatedamount.toString(),
                expenditures_q1: item.vsd_actualexpenditures,
                expenditures_q2: item.vsd_actualexpenditures2,
                expenditures_q3: item.vsd_actualexpenditures3,
                expenditures_q4: item.vsd_actualexpenditures4,
            }
            ret.push(obj)
        });

        return ret;
    }

    getExpenseName(expense_id, expenses: iDynamicsEligibleExpenseItem[]) {
        let ret = expenses.find(ex => ex.vsd_eligibleexpenseitemid === expense_id);
        if (ret) return ret.vsd_name;
        else return "";
    }

}