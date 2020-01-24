using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsBudgetProposalPost
	{
		public string BusinessBCeID { get; set; }
		public string UserBCeID { get; set; }
		public DynamicsCrmProgramExpensePost[] ProgramExpenseCollection { get; set; }
		public DynamicsCrmProgramRevenueSourcePost[] ProgramRevenueSourceCollection { get; set; }

	}
}
