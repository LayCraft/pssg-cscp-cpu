using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsMonthlyStatisticsAnswers
	{
		// this is the model that Dynamics expects back to update the organization level information
		public string BusinessBCeID { get; set; }
		public string UserBCeID { get; set; }
		public int ReportingPeriod { get; set; }


		// public DynamicsDataCollectionLineItemCollection[] ScheduleGCollection { get; set; }
		// public DynamicsScheduleGLineItemCollection[] ScheduleGLineItemCollection { get; set; }

	}
}
