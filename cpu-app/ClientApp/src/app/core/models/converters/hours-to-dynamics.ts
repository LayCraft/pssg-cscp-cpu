import { iHours } from "../hours.interface";
import { iDynamicsSchedule } from "../dynamics-blob";
import { encodeToWeekDayCodes } from "../../constants/encode-to-week-days";
import * as moment from 'moment';

export function convertHoursToDynamics(hours: iHours, programId: string, standByHours = false): iDynamicsSchedule {
  return {
    vsd_scheduledendtime: convertToDynamicsTimeString(hours.closed),
    vsd_scheduledstarttime: convertToDynamicsTimeString(hours.open),
    vsd_days: encodeToWeekDayCodes(hours),
    vsd_scheduleid: hours.hoursId,
    vsd_ProgramIdfortunecookiebind: programId,
    vsd_cpu_scheduletype: standByHours ? 100000001 : 100000000,
    statecode: hours.isActive ? 0 : 1,
  };
}
function convertToDynamicsTimeString(time: string): string {
  // input is 24 hour clock. e.g. 23:11
  // output is am pm e.g. 11:11pm
  return moment()
    .hour(
      parseInt(time.substring(0, 2))
    )
    .minute(
      parseInt(time.substring(3, 5))
    )
    .format('hh:mma');
}
export function makeViewTimeString(dynamicsTime: string): string {
  // input is AM/PM clock. e.g. 11:11pm
  // output is 24 hour e.g. 23:11
  let hour = parseInt(dynamicsTime.substring(0, 2));
  if (dynamicsTime.includes('p')) hour += 12;
  const minute = parseInt(dynamicsTime.substring(3, 5));
  return moment()
    .hour(hour)
    .minute(minute)
    .format('HH:mm');
}
