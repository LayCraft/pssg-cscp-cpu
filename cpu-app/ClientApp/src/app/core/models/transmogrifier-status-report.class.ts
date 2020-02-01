import { iDynamicsMonthlyStatisticsQuestions, iDynamicsMonthlyStatisticsQuestionsQuestion, iDynamicsMonthlyStatisticsQuestionsMcQuestion } from "./dynamics-blob";
import { iQuestion, iMultipleChoice } from "./status-report-question.interface"
import { iQuestionCollection } from "./question-collection.interface";
import { iDynamicsPostStatusReport } from "./dynamics-post";
// a collection of the expense item guids as K/V pairs for generating line items
export class TransmogrifierStatusReport {
  public organizationId: string;
  public userId: string;
  public programId: string;
  public programName: string;
  public programType: string;
  public reportingPeriod: string;
  public statusReportQuestions: iQuestionCollection[] = []; // this is a collection of objects

  constructor(g: iDynamicsMonthlyStatisticsQuestions) {
    this.userId = g.Userbceid;// this is the user's bceid
    this.organizationId = g.Businessbceid;// this is the organization's bceid
    this.programId = g.Program.vsd_programid;
    this.reportingPeriod = null; // TODO: where does this come from
    this.programType = g.ProgramTypeCollection.filter(f => g.Program._vsd_programtype_value === f.vsd_programtypeid).map(f => f.vsd_name)[0];
    this.programName = g.Program.vsd_name;

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
            if (a.vsd_questionorder > b.vsd_questionorder) return 1;
            if (a.vsd_questionorder < b.vsd_questionorder) return -1;
            console.log('These items have the same question number.', a, b);
            return 0;
          })
          .map((d: iDynamicsMonthlyStatisticsQuestionsQuestion): iQuestion => {
            // look up the value once
            const type = this.fieldType(d.vsd_questiontype);
            const q: iQuestion = {
              label: d.vsd_name,
              type,
              uuid: d.vsd_cpustatisticsmasterdataid, // I was generating it but may as well use the one from master data.
              questionNumber: d.vsd_questionorder,
              categoryID: d._vsd_categoryid_value,
              multiChoiceAnswers: this.getMultipleChoice(d.vsd_cpustatisticsmasterdataid, g.MultipleChoiceCollection),
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

  private getMultipleChoice(id: string, questionCollection: iDynamicsMonthlyStatisticsQuestionsMcQuestion[]): iMultipleChoice[] {
    // Get multiple choice options for this question - returns only ones related to this question
    let tempQuestionCollection: iMultipleChoice[] = [];
    for (let mcQuestion of questionCollection) {
      const mc: iMultipleChoice = {
        label: mcQuestion.vsd_name,
        masterDataID: mcQuestion.vsd_cpustatisticsmasterdataanswerid,
        uuid: mcQuestion._vsd_questionid_value,
      }
      if (mc.uuid == id) {
        tempQuestionCollection.push(mc);
      }
    }
    if (tempQuestionCollection.length > 0) {
      return tempQuestionCollection;
    }
    else {
      return; 
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

