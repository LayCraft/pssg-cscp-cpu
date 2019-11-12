using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsOrganization
	{

		string _vsd_ExecutiveContact;
		string _vsd_BoardContact;

		public string _ownerid_value { get; set; }
		public string _vsd_boardcontactid_value
		{
			get
			{
				return _vsd_BoardContact;
			}
			set
			{
				_vsd_BoardContact = value;
			}
		}
		public string _vsd_executivecontactid_value
		{
			get
			{
				return _vsd_ExecutiveContact;
			}
			set
			{
				_vsd_ExecutiveContact = value;
			}
		}
		public string vsd_ExecutiveContactIdfortunecookiebind
		{
			get
			{
				if (_vsd_ExecutiveContact != null)
				{
					// get the encoded version
					return "/contacts(" + _vsd_ExecutiveContact + ")";
				}
				else
				{
					return null;
				}
			}
			set
			{
				// set the unencoded version
				_vsd_ExecutiveContact = value;
			}
		}
		public string vsd_BoardContactIdfortunecookiebind
		{
			get
			{
				if (_vsd_BoardContact != null)
				{
					// get the encoded version
					return "/contacts(" + _vsd_BoardContact + ")";
				}
				else
				{
					return null;
				}
			}
			set
			{
				// set the unencoded version
				_vsd_BoardContact = value;
			}
		}
		public string accountid { get; set; }
		public string address1_city { get; set; }
		public string address1_composite { get; set; }
		public string address1_line1 { get; set; }
		public string address1_line2 { get; set; }
		public string address1_postalcode { get; set; }
		public string address1_stateorprovince { get; set; }
		public string address2_city { get; set; }
		public string address2_composite { get; set; }
		public string address2_line1 { get; set; }
		public string address2_line2 { get; set; }
		public string address2_postalcode { get; set; }
		public string address2_stateorprovince { get; set; }
		public string emailaddress1 { get; set; }
		public string fax { get; set; }
		public string name { get; set; }
		public string fortunecookietype = "Microsoft.Dynamics.CRM.account";
		public string telephone1 { get; set; }
	}
}
