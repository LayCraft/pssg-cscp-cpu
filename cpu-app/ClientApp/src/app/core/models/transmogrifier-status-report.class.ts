import { iDynamicsMonthlyStatisticsQuestions, iDynamicsMonthlyStatisticsQuestionsQuestion } from "./dynamics-blob";
import { iQuestionCollection, iQuestion } from "./status-report-question.interface"
import { uuidv4 } from "../constants/uuidv4";
// a collection of the expense item guids as K/V pairs for generating line items
export class TransmogrifierStatusReport {
  public organizationId: string;
  public userId: string;
  public programType: string;
  public statusReportQuestions: iQuestionCollection[] = []; // this is a collection of objects

  constructor(g: iDynamicsMonthlyStatisticsQuestions) {
    this.userId = g.Userbceid;// this is the user's bceid
    this.organizationId = g.Businessbceid; // this is the organization's bceid
    this.buildStatusReport(g);
  }
  private buildStatusReport(g: iDynamicsMonthlyStatisticsQuestions): void {
    // for every category of questions collect the matching items
    for (let category of g.CategoryCollection) {
      const q: iQuestionCollection = {
        name: category.vsd_name,
        questions: g.QuestionCollection
          .filter((q: iDynamicsMonthlyStatisticsQuestionsQuestion) => category.vsd_monthlystatisticscategoryid === q._vsd_categoryid_value)
          .sort((a: iDynamicsMonthlyStatisticsQuestionsQuestion, b: iDynamicsMonthlyStatisticsQuestionsQuestion) => {
            // arrange from smallest to largest
            if (a.vsd_questionorder > b.vsd_questionorder) {
              return 1;
            }
            if (a.vsd_questionorder < b.vsd_questionorder) {
              return -1;
            }
            return 0;
          })
          .map((d: iDynamicsMonthlyStatisticsQuestionsQuestion): iQuestion => {
            // look up the value once
            const type = this.fieldType(d.vsd_questiontype);
            const q: iQuestion = {
              label: d.vsd_name,
              type,
              uuid: uuidv4(),
            }
            // instantiate the correct property with the freshest null value
            q[type] = null;
            // return the object
            return q;
          })
      };
      // push the status report questions
      this.statusReportQuestions.push(q);
    }
  }

  private fieldType(d: number): string {
    // convert the field type into a string
    let type: string;
    switch (d) {
      case (100000000): {
        type = 'number';
        break;
      }
      case (100000001): {
        type = 'boolean';
        break;
      }
      case (100000002): {
        type = 'string';
        break;
      }
      default: {
        type = undefined;
        break;
      }
    }
    return type;
  }
}
