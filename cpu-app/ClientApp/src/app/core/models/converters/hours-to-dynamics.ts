import { iHours } from "../hours.interface";
import { iDynamicsSchedule } from "../dynamics-blob";
import { encodeToWeekDayCodes } from "../../constants/encode-to-week-days";

export function convertHoursToDynamics(hours: iHours, programId: string, standByHours = false): iDynamicsSchedule {

  return {
    vsd_scheduledendtime: "17:00",
    vsd_scheduledstarttime: "8:00",
    vsd_days: encodeToWeekDayCodes(hours),
    vsd_scheduleid: hours.hoursId,
    _vsd_programid_value: programId,
    vsd_cpu_scheduletype: standByHours ? 100000001 : 100000000,
  };
}
