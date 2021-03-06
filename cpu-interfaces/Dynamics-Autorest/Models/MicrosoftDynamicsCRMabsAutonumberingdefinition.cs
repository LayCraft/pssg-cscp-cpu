// <auto-generated>
// Code generated by Microsoft (R) AutoRest Code Generator.
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.
// </auto-generated>

namespace Gov.Jag.VictimServices.Interfaces.Models
{
    using Newtonsoft.Json;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;

    /// <summary>
    /// abs_autonumberingdefinition
    /// </summary>
    public partial class MicrosoftDynamicsCRMabsAutonumberingdefinition
    {
        /// <summary>
        /// Initializes a new instance of the
        /// MicrosoftDynamicsCRMabsAutonumberingdefinition class.
        /// </summary>
        public MicrosoftDynamicsCRMabsAutonumberingdefinition()
        {
            CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the
        /// MicrosoftDynamicsCRMabsAutonumberingdefinition class.
        /// </summary>
        public MicrosoftDynamicsCRMabsAutonumberingdefinition(System.DateTimeOffset? createdon = default(System.DateTimeOffset?), int? absLastnumberissued = default(int?), int? importsequencenumber = default(int?), string absFormat = default(string), string _organizationidValue = default(string), string absName = default(string), int? statecode = default(int?), int? absRandomsuffixlength = default(int?), int? utcconversiontimezonecode = default(int?), int? absDigits = default(int?), int? timezoneruleversionnumber = default(int?), int? absIncrement = default(int?), System.DateTimeOffset? overriddencreatedon = default(System.DateTimeOffset?), long? versionnumber = default(long?), string absLock = default(string), int? statuscode = default(int?), string _createdonbehalfbyValue = default(string), string _modifiedbyValue = default(string), string _createdbyValue = default(string), string _modifiedonbehalfbyValue = default(string), int? absInitialvalue = default(int?), System.DateTimeOffset? modifiedon = default(System.DateTimeOffset?), string absAutonumberingdefinitionid = default(string), string absDatetimeformat = default(string), MicrosoftDynamicsCRMsystemuser createdbyname = default(MicrosoftDynamicsCRMsystemuser), MicrosoftDynamicsCRMsystemuser createdonbehalfbyname = default(MicrosoftDynamicsCRMsystemuser), MicrosoftDynamicsCRMsystemuser modifiedbyname = default(MicrosoftDynamicsCRMsystemuser), MicrosoftDynamicsCRMsystemuser modifiedonbehalfbyname = default(MicrosoftDynamicsCRMsystemuser), MicrosoftDynamicsCRMorganization organizationid = default(MicrosoftDynamicsCRMorganization), IList<MicrosoftDynamicsCRMsyncerror> absAutonumberingdefinitionSyncErrors = default(IList<MicrosoftDynamicsCRMsyncerror>), IList<MicrosoftDynamicsCRMduplicaterecord> absAutonumberingdefinitionDuplicateMatchingRecord = default(IList<MicrosoftDynamicsCRMduplicaterecord>), IList<MicrosoftDynamicsCRMduplicaterecord> absAutonumberingdefinitionDuplicateBaseRecord = default(IList<MicrosoftDynamicsCRMduplicaterecord>), IList<MicrosoftDynamicsCRMasyncoperation> absAutonumberingdefinitionAsyncOperations = default(IList<MicrosoftDynamicsCRMasyncoperation>), IList<MicrosoftDynamicsCRMbulkdeletefailure> absAutonumberingdefinitionBulkDeleteFailures = default(IList<MicrosoftDynamicsCRMbulkdeletefailure>), IList<MicrosoftDynamicsCRMabsAutonumberedentity> absAutonumberedentityAutoNumberingDefinition = default(IList<MicrosoftDynamicsCRMabsAutonumberedentity>))
        {
            Createdon = createdon;
            AbsLastnumberissued = absLastnumberissued;
            Importsequencenumber = importsequencenumber;
            AbsFormat = absFormat;
            this._organizationidValue = _organizationidValue;
            AbsName = absName;
            Statecode = statecode;
            AbsRandomsuffixlength = absRandomsuffixlength;
            Utcconversiontimezonecode = utcconversiontimezonecode;
            AbsDigits = absDigits;
            Timezoneruleversionnumber = timezoneruleversionnumber;
            AbsIncrement = absIncrement;
            Overriddencreatedon = overriddencreatedon;
            Versionnumber = versionnumber;
            AbsLock = absLock;
            Statuscode = statuscode;
            this._createdonbehalfbyValue = _createdonbehalfbyValue;
            this._modifiedbyValue = _modifiedbyValue;
            this._createdbyValue = _createdbyValue;
            this._modifiedonbehalfbyValue = _modifiedonbehalfbyValue;
            AbsInitialvalue = absInitialvalue;
            Modifiedon = modifiedon;
            AbsAutonumberingdefinitionid = absAutonumberingdefinitionid;
            AbsDatetimeformat = absDatetimeformat;
            Createdbyname = createdbyname;
            Createdonbehalfbyname = createdonbehalfbyname;
            Modifiedbyname = modifiedbyname;
            Modifiedonbehalfbyname = modifiedonbehalfbyname;
            Organizationid = organizationid;
            AbsAutonumberingdefinitionSyncErrors = absAutonumberingdefinitionSyncErrors;
            AbsAutonumberingdefinitionDuplicateMatchingRecord = absAutonumberingdefinitionDuplicateMatchingRecord;
            AbsAutonumberingdefinitionDuplicateBaseRecord = absAutonumberingdefinitionDuplicateBaseRecord;
            AbsAutonumberingdefinitionAsyncOperations = absAutonumberingdefinitionAsyncOperations;
            AbsAutonumberingdefinitionBulkDeleteFailures = absAutonumberingdefinitionBulkDeleteFailures;
            AbsAutonumberedentityAutoNumberingDefinition = absAutonumberedentityAutoNumberingDefinition;
            CustomInit();
        }

        /// <summary>
        /// An initialization method that performs custom operations like setting defaults
        /// </summary>
        partial void CustomInit();

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "createdon")]
        public System.DateTimeOffset? Createdon { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "abs_lastnumberissued")]
        public int? AbsLastnumberissued { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "importsequencenumber")]
        public int? Importsequencenumber { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "abs_format")]
        public string AbsFormat { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "_organizationid_value")]
        public string _organizationidValue { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "abs_name")]
        public string AbsName { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "statecode")]
        public int? Statecode { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "abs_randomsuffixlength")]
        public int? AbsRandomsuffixlength { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "utcconversiontimezonecode")]
        public int? Utcconversiontimezonecode { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "abs_digits")]
        public int? AbsDigits { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "timezoneruleversionnumber")]
        public int? Timezoneruleversionnumber { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "abs_increment")]
        public int? AbsIncrement { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "overriddencreatedon")]
        public System.DateTimeOffset? Overriddencreatedon { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "versionnumber")]
        public long? Versionnumber { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "abs_lock")]
        public string AbsLock { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "statuscode")]
        public int? Statuscode { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "_createdonbehalfby_value")]
        public string _createdonbehalfbyValue { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "_modifiedby_value")]
        public string _modifiedbyValue { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "_createdby_value")]
        public string _createdbyValue { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "_modifiedonbehalfby_value")]
        public string _modifiedonbehalfbyValue { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "abs_initialvalue")]
        public int? AbsInitialvalue { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "modifiedon")]
        public System.DateTimeOffset? Modifiedon { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "abs_autonumberingdefinitionid")]
        public string AbsAutonumberingdefinitionid { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "abs_datetimeformat")]
        public string AbsDatetimeformat { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "createdbyname")]
        public MicrosoftDynamicsCRMsystemuser Createdbyname { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "createdonbehalfbyname")]
        public MicrosoftDynamicsCRMsystemuser Createdonbehalfbyname { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "modifiedbyname")]
        public MicrosoftDynamicsCRMsystemuser Modifiedbyname { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "modifiedonbehalfbyname")]
        public MicrosoftDynamicsCRMsystemuser Modifiedonbehalfbyname { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "organizationid")]
        public MicrosoftDynamicsCRMorganization Organizationid { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "abs_autonumberingdefinition_SyncErrors")]
        public IList<MicrosoftDynamicsCRMsyncerror> AbsAutonumberingdefinitionSyncErrors { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "abs_autonumberingdefinition_DuplicateMatchingRecord")]
        public IList<MicrosoftDynamicsCRMduplicaterecord> AbsAutonumberingdefinitionDuplicateMatchingRecord { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "abs_autonumberingdefinition_DuplicateBaseRecord")]
        public IList<MicrosoftDynamicsCRMduplicaterecord> AbsAutonumberingdefinitionDuplicateBaseRecord { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "abs_autonumberingdefinition_AsyncOperations")]
        public IList<MicrosoftDynamicsCRMasyncoperation> AbsAutonumberingdefinitionAsyncOperations { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "abs_autonumberingdefinition_BulkDeleteFailures")]
        public IList<MicrosoftDynamicsCRMbulkdeletefailure> AbsAutonumberingdefinitionBulkDeleteFailures { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "abs_autonumberedentity_AutoNumberingDefinition")]
        public IList<MicrosoftDynamicsCRMabsAutonumberedentity> AbsAutonumberedentityAutoNumberingDefinition { get; set; }

    }
}
