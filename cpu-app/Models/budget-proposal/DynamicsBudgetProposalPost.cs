namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsBudgetProposalPost
	{
		public string BusinessBCeID { get; set; }
		public string UserBCeID { get; set; }
		public DynamicsCrmProgramExpense[] ProgramExpenseCollection { get; set; }
		public DynamicsCrmProgramRevenueSource[] ProgramRevenueSourceCollection { get; set; }
	}
}
