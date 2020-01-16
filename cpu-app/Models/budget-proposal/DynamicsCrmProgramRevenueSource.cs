namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsCrmProgramRevenueSource
	{
		public string fortunecookietype { get { return "#Microsoft.Dynamics.CRM.vsd_programrevenuesource"; } }
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
		public string vsd_programrevenuesourceid { get; set; }
		public float vsd_cashcontribution { get; set; }
		public float vsd_cpu_revenuesourcetype { get; set; }
		public float vsd_inkindcontribution { get; set; }
	}
}