namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsRequestModel
	{
		public string Businessbceid;
		public string Userbceid;
		public DynamicsRequestModel(string UserBCeID, string BusinessBCeID)
		{
			this.Businessbceid = BusinessBCeID;
			this.Userbceid = UserBCeID;
		}
	}
}
