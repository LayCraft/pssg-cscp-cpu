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
		public DynamicsCrmProgramExpense[] ProgramExpenseCollection { get; set; }
		public DynamicsCrmProgramRevenueSource[] ProgramRevenueSourceCollection { get; set; }
		// 		{
		// 	"BusinessBCeID": "fd889a40-14b2-e811-8163-480fcff4f621",
		// 	"UserBCeID": "9e9b5111-51c9-e911-b80f-00505683fbf4",
		// 	"ProgramExpenseCollection": [],
		// 	"ProgramRevenueSourceCollection": []
		// }
	}
}
