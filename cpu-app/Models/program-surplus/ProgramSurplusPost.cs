namespace Gov.Cscp.Victims.Public.Models
{
    public class ProgramSurplusPost
    {
        public string BusinessBCeID { get; set; }
        public string UserBCeID { get; set; }
        public DynamicsProgramSurplusLineItemPost[] SurplusPlanLineItemCollection { get; set; }
        
        //depending on answer from Mano this may be a single record, or a collection, don't know yet, it's not added to the API at the moment
        // public DynamicsProgramSurplus[] SurplusPlanCollection { get; set; }

    }
}
