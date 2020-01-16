using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsCrmProgramExpense
	{

		public string vsd_EligibleExpenseItemIdfortunecookiebind
		{
			get
			{
				if (vsd_EligibleExpenseItemIdfortunecookiebind != null)
				{
					return "/vsd_eligibleexpenseitems(" + vsd_EligibleExpenseItemIdfortunecookiebind + ")";
				}
				else
				{
					return null;
				}
			}
			set { vsd_EligibleExpenseItemIdfortunecookiebind = value; }
		}

		public string vsd_ProgramIdfortunecookiebind
		{
			get
			{
				if (vsd_ProgramIdfortunecookiebind != null)
				{
					return "/vsd_programs(" + vsd_ProgramIdfortunecookiebind + ")";
				}
				else
				{
					return null;
				}
			}
			set { vsd_ProgramIdfortunecookiebind = value; }
		}
		public string vsd_cpu_titleposition { get; set; }
		public string fortunecookietype { get { return "#Microsoft.Dynamics.CRM.vsd_programexpense"; } }
		public string vsd_programexpenseid { get; set; }
		public int vsd_cpu_programexpensetype { get; set; }
		public float vsd_totalcost { get; set; }
		public float vsd_inputamount { get; set; }
		public float vsd_cpu_salary { get; set; }
		public float vsd_cpu_fundedfromvscp { get; set; }
		public float vsd_cpu_benefits { get; set; }
		// Actual values expected
		// 	"vsd_EligibleExpenseItemIdfortunecookiebind": "53c1c560-2eba-e911-b80f-00505683fbf4",
		// 	"vsd_ProgramIdfortunecookiebind": "0e309304-c4e6-e911-b811-00505683fbf4"
		// 	"vsd_ProgramIdfortunecookiebind": "0e309304-c4e6-e911-b811-00505683fbf4"
		// 	"vsd_cpu_titleposition": "Case Worker",
		// 	"vsd_programexpenseid": "cb040f98-33fb-e911-b812-00505683fbf4",
		// 	"vsd_cpu_programexpensetype": 100000000,
		// 	"vsd_cpu_programexpensetype": 100000001,
		// 	"vsd_cpu_benefits": 4000.0000,
		// 	"vsd_cpu_fundedfromvscp": 25000.0000,
		// 	"vsd_cpu_fundedfromvscp": 6000.0000,
		// 	"vsd_cpu_salary": 550000.0000,
		// 	"vsd_inputamount": 6000.0000,
		// 	"vsd_totalcost": 5000.00,
		// 	"vsd_totalcost": 504000.00,
	}
}