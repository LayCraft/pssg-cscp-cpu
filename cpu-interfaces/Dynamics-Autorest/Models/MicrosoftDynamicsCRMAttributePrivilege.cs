// <auto-generated>
// Code generated by Microsoft (R) AutoRest Code Generator.
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.
// </auto-generated>

namespace Gov.Jag.VictimServices.Interfaces.Models
{
    using Newtonsoft.Json;
    using System.Linq;

    /// <summary>
    /// AttributePrivilege
    /// </summary>
    public partial class MicrosoftDynamicsCRMAttributePrivilege
    {
        /// <summary>
        /// Initializes a new instance of the
        /// MicrosoftDynamicsCRMAttributePrivilege class.
        /// </summary>
        public MicrosoftDynamicsCRMAttributePrivilege()
        {
            CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the
        /// MicrosoftDynamicsCRMAttributePrivilege class.
        /// </summary>
        public MicrosoftDynamicsCRMAttributePrivilege(string attributeId = default(string), int? canCreate = default(int?), int? canRead = default(int?), int? canUpdate = default(int?))
        {
            AttributeId = attributeId;
            CanCreate = canCreate;
            CanRead = canRead;
            CanUpdate = canUpdate;
            CustomInit();
        }

        /// <summary>
        /// An initialization method that performs custom operations like setting defaults
        /// </summary>
        partial void CustomInit();

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "AttributeId")]
        public string AttributeId { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "CanCreate")]
        public int? CanCreate { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "CanRead")]
        public int? CanRead { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "CanUpdate")]
        public int? CanUpdate { get; set; }

    }
}
