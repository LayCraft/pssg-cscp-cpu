import { TransmogrifierStatusReport } from "../transmogrifier-status-report.class";
import { iDynamicsPostStatusReport, iDynamicsAnswer } from "../dynamics-post";
import { iQuestionCollection } from "../question-collection.interface";
import { iQuestion } from "../status-report-question.interface";

export function convertStatusReportToDynamics(trans: TransmogrifierStatusReport): iDynamicsPostStatusReport {
  const types = {
    'number': 100000000,
    'boolean': 100000001,
    'string': 100000002,
  };
  const months = {
    "January": 100000000,
    "February": 100000001,
    "March": 100000002,
    "April": 100000003,
    "May": 100000004,
    "June": 100000005,
    "July": 100000006,
    "August": 100000007,
    "September": 100000008,
    "October": 100000009,
    "November": 100000010,
    "December": 100000011,
  }
  // build the answers into a flatter dynamics form
  const answers: iDynamicsAnswer[] = [];

  trans.statusReportQuestions.forEach((srq: iQuestionCollection) => {
    // for each question assemble shared elements
    srq.questions.forEach((q: iQuestion) => {
      const lineItem = {
        vsd_name: q.label,
        vsd_questioncategory: srq.name,
        vsd_questionorder: q.questionNumber,
        vsd_questiontype1: types[q.type]
      }
      // depending on types we add another property
      if (q.type === 'number') lineItem['vsd_number'] = q.number;
      if (q.type === 'boolean') lineItem['vsd_yesnoboolean'] = q.boolean;
      if (q.type === 'string') lineItem['vsd_textanswer'] = q.string;
      // add the line item to the answers list
      answers.push(lineItem);
    });
  });

  return {
    BusinessBCeID: trans.organizationId,
    UserBCeID: trans.userId,
    ReportingPeriod: months[trans.reportingPeriod] || 0,
    AnswerCollection: answers
  };
}
