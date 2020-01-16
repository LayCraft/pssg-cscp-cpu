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
		public int vsd_cpu_programexpensetype { get; set; }
		public float vsd_totalcost { get; set; }
		public float vsd_inputamount { get; set; }
		public float vsd_cpu_salary { get; set; }
		public float vsd_cpu_fundedfromvscp { get; set; }
		public float vsd_cpu_benefits { get; set; }
		public string vsd_programexpenseid { get; set; }
	}
}