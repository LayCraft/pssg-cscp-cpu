using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.Victims.Public.Models
{
    public class DynamicsRegisterNewUserServiceProviderPost
    {
        public string fortunecookietype { get { return "Microsoft.Dynamics.CRM.account"; } }
        public string name { get; set; }
    }
}
