namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsRequestModel
	{
		public string BusinessBCeID;
		public string UserBCeID;
		public DynamicsRequestModel(string UserBCeID, string BusinessBCeID)
		{
			this.BusinessBCeID = BusinessBCeID;
			this.UserBCeID = UserBCeID;
		}
	}
}
