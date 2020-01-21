import { iHours } from "../hours.interface";
import { iDynamicsSchedule } from "../dynamics-blob";
import { encodeToWeekDayCodes } from "../../constants/encode-to-week-days";
import * as moment from 'moment';

export function convertHoursToDynamics(hours: iHours, programId: string, standByHours = false): iDynamicsSchedule {
  console.log(hours.open);
  return {
    vsd_scheduledendtime: moment(hours.closed).format('HH:mm'),
    vsd_scheduledstarttime: moment(hours.open).format('HH:mm'),
    vsd_days: encodeToWeekDayCodes(hours),
    vsd_scheduleid: hours.hoursId,
    _vsd_programid_value: programId,
    vsd_cpu_scheduletype: standByHours ? 100000001 : 100000000,
  };
}
