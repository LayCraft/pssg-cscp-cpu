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
    /// principal
    /// </summary>
    public partial class MicrosoftDynamicsCRMprincipal
    {
        /// <summary>
        /// Initializes a new instance of the MicrosoftDynamicsCRMprincipal
        /// class.
        /// </summary>
        public MicrosoftDynamicsCRMprincipal()
        {
            CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the MicrosoftDynamicsCRMprincipal
        /// class.
        /// </summary>
        public MicrosoftDynamicsCRMprincipal(string ownerid = default(string), IList<MicrosoftDynamicsCRMexchangesyncidmapping> ownerExchangesyncidmapping = default(IList<MicrosoftDynamicsCRMexchangesyncidmapping>), IList<MicrosoftDynamicsCRMinteractionforemail> ownerNewInteractionforemail = default(IList<MicrosoftDynamicsCRMinteractionforemail>), IList<MicrosoftDynamicsCRMknowledgearticle> ownerKnowledgearticle = default(IList<MicrosoftDynamicsCRMknowledgearticle>), IList<MicrosoftDynamicsCRMsharepointsite> ownerSharepointsite = default(IList<MicrosoftDynamicsCRMsharepointsite>), IList<MicrosoftDynamicsCRMsharepointdocumentlocation> ownerSharepointdocumentlocation = default(IList<MicrosoftDynamicsCRMsharepointdocumentlocation>), IList<MicrosoftDynamicsCRMentitlement> ownerEntitlement = default(IList<MicrosoftDynamicsCRMentitlement>), IList<MicrosoftDynamicsCRMgoal> ownerGoal = default(IList<MicrosoftDynamicsCRMgoal>), IList<MicrosoftDynamicsCRMmailbox> ownerMailbox = default(IList<MicrosoftDynamicsCRMmailbox>), IList<MicrosoftDynamicsCRMbookableresource> ownerBookableresource = default(IList<MicrosoftDynamicsCRMbookableresource>), IList<MicrosoftDynamicsCRMbookableresourcebooking> ownerBookableresourcebooking = default(IList<MicrosoftDynamicsCRMbookableresourcebooking>), IList<MicrosoftDynamicsCRMbookableresourcebookingheader> ownerBookableresourcebookingheader = default(IList<MicrosoftDynamicsCRMbookableresourcebookingheader>), IList<MicrosoftDynamicsCRMbookableresourcecategory> ownerBookableresourcecategory = default(IList<MicrosoftDynamicsCRMbookableresourcecategory>), IList<MicrosoftDynamicsCRMbookableresourcecategoryassn> ownerBookableresourcecategoryassn = default(IList<MicrosoftDynamicsCRMbookableresourcecategoryassn>), IList<MicrosoftDynamicsCRMbookableresourcecharacteristic> ownerBookableresourcecharacteristic = default(IList<MicrosoftDynamicsCRMbookableresourcecharacteristic>), IList<MicrosoftDynamicsCRMbookableresourcegroup> ownerBookableresourcegroup = default(IList<MicrosoftDynamicsCRMbookableresourcegroup>), IList<MicrosoftDynamicsCRMbookingstatus> ownerBookingstatus = default(IList<MicrosoftDynamicsCRMbookingstatus>), IList<MicrosoftDynamicsCRMcharacteristic> ownerCharacteristic = default(IList<MicrosoftDynamicsCRMcharacteristic>), IList<MicrosoftDynamicsCRMratingmodel> ownerRatingmodel = default(IList<MicrosoftDynamicsCRMratingmodel>), IList<MicrosoftDynamicsCRMratingvalue> ownerRatingvalue = default(IList<MicrosoftDynamicsCRMratingvalue>), IList<MicrosoftDynamicsCRMpersonaldocumenttemplate> ownerPersonaldocumenttemplates = default(IList<MicrosoftDynamicsCRMpersonaldocumenttemplate>), IList<MicrosoftDynamicsCRMaccount> ownerAccounts = default(IList<MicrosoftDynamicsCRMaccount>), IList<MicrosoftDynamicsCRMgoalrollupquery> ownerGoalrollupquery = default(IList<MicrosoftDynamicsCRMgoalrollupquery>), IList<MicrosoftDynamicsCRMsalesorder> ownerSalesorders = default(IList<MicrosoftDynamicsCRMsalesorder>), IList<MicrosoftDynamicsCRMpostfollow> ownerPostfollows = default(IList<MicrosoftDynamicsCRMpostfollow>), IList<MicrosoftDynamicsCRMworkflow> ownerWorkflows = default(IList<MicrosoftDynamicsCRMworkflow>), IList<MicrosoftDynamicsCRMlist> ownerLists = default(IList<MicrosoftDynamicsCRMlist>), IList<MicrosoftDynamicsCRMuserquery> ownerUserquerys = default(IList<MicrosoftDynamicsCRMuserquery>), IList<MicrosoftDynamicsCRMimportmap> ownerImportmaps = default(IList<MicrosoftDynamicsCRMimportmap>), IList<MicrosoftDynamicsCRMmailmergetemplate> ownerMailmergetemplates = default(IList<MicrosoftDynamicsCRMmailmergetemplate>), IList<MicrosoftDynamicsCRMopportunity> ownerOpportunitys = default(IList<MicrosoftDynamicsCRMopportunity>), IList<MicrosoftDynamicsCRMduplicaterule> ownerDuplicaterules = default(IList<MicrosoftDynamicsCRMduplicaterule>), IList<MicrosoftDynamicsCRMreport> ownerReports = default(IList<MicrosoftDynamicsCRMreport>), IList<MicrosoftDynamicsCRMactivitypointer> ownerActivitypointers = default(IList<MicrosoftDynamicsCRMactivitypointer>), IList<MicrosoftDynamicsCRMactioncarduserstate> actionCardUserStateOwner = default(IList<MicrosoftDynamicsCRMactioncarduserstate>), IList<MicrosoftDynamicsCRMprincipalentitymap> ownerPrincipalentitymap = default(IList<MicrosoftDynamicsCRMprincipalentitymap>), IList<MicrosoftDynamicsCRMimportdata> ownerImportdatas = default(IList<MicrosoftDynamicsCRMimportdata>), IList<MicrosoftDynamicsCRMcategory> ownerCategories = default(IList<MicrosoftDynamicsCRMcategory>), IList<MicrosoftDynamicsCRMdynamicpropertyinstance> ownerDynamicproperyinstance = default(IList<MicrosoftDynamicsCRMdynamicpropertyinstance>), IList<MicrosoftDynamicsCRMqueue> ownerQueues = default(IList<MicrosoftDynamicsCRMqueue>), IList<MicrosoftDynamicsCRMactioncard> ownerActioncards = default(IList<MicrosoftDynamicsCRMactioncard>), IList<MicrosoftDynamicsCRMuserqueryvisualization> ownerUserqueryvisualizations = default(IList<MicrosoftDynamicsCRMuserqueryvisualization>), IList<MicrosoftDynamicsCRMcampaign> ownerCampaigns = default(IList<MicrosoftDynamicsCRMcampaign>), IList<MicrosoftDynamicsCRMfeedback> ownerFeedback = default(IList<MicrosoftDynamicsCRMfeedback>), IList<MicrosoftDynamicsCRMquote> ownerQuotes = default(IList<MicrosoftDynamicsCRMquote>), IList<MicrosoftDynamicsCRMinvoice> ownerInvoices = default(IList<MicrosoftDynamicsCRMinvoice>), IList<MicrosoftDynamicsCRMannotation> ownerAnnotations = default(IList<MicrosoftDynamicsCRMannotation>), IList<MicrosoftDynamicsCRMuserform> ownerUserform = default(IList<MicrosoftDynamicsCRMuserform>), IList<MicrosoftDynamicsCRMasyncoperation> ownerAsyncoperations = default(IList<MicrosoftDynamicsCRMasyncoperation>), IList<MicrosoftDynamicsCRMsocialprofile> ownerSocialProfile = default(IList<MicrosoftDynamicsCRMsocialprofile>), IList<MicrosoftDynamicsCRMsla> ownerSlas = default(IList<MicrosoftDynamicsCRMsla>), IList<MicrosoftDynamicsCRMslakpiinstance> slakpiinstanceOwner = default(IList<MicrosoftDynamicsCRMslakpiinstance>), IList<MicrosoftDynamicsCRMemailserverprofile> ownerEmailserverprofile = default(IList<MicrosoftDynamicsCRMemailserverprofile>), IList<MicrosoftDynamicsCRMincident> ownerIncidents = default(IList<MicrosoftDynamicsCRMincident>), IList<MicrosoftDynamicsCRMtemplate> ownerTemplates = default(IList<MicrosoftDynamicsCRMtemplate>), IList<MicrosoftDynamicsCRMcontact> ownerContacts = default(IList<MicrosoftDynamicsCRMcontact>), IList<MicrosoftDynamicsCRMimport> ownerImports = default(IList<MicrosoftDynamicsCRMimport>), IList<MicrosoftDynamicsCRMlead> ownerLeads = default(IList<MicrosoftDynamicsCRMlead>), IList<MicrosoftDynamicsCRMconnection> ownerConnections = default(IList<MicrosoftDynamicsCRMconnection>), IList<MicrosoftDynamicsCRMimportfile> ownerImportfiles = default(IList<MicrosoftDynamicsCRMimportfile>), IList<MicrosoftDynamicsCRMimportlog> ownerImportlogs = default(IList<MicrosoftDynamicsCRMimportlog>), IList<MicrosoftDynamicsCRMsyncerror> ownerSyncError = default(IList<MicrosoftDynamicsCRMsyncerror>), IList<MicrosoftDynamicsCRMcontract> ownerContracts = default(IList<MicrosoftDynamicsCRMcontract>), IList<MicrosoftDynamicsCRMbcgovCustomaddress> ownerBcgovCustomaddress = default(IList<MicrosoftDynamicsCRMbcgovCustomaddress>), IList<MicrosoftDynamicsCRMbcgovTermsconditionspreset> ownerBcgovTermsconditionspreset = default(IList<MicrosoftDynamicsCRMbcgovTermsconditionspreset>), IList<MicrosoftDynamicsCRMbcgovApplicationtype> ownerBcgovApplicationtype = default(IList<MicrosoftDynamicsCRMbcgovApplicationtype>), IList<MicrosoftDynamicsCRMbcgovBusinesscontact> ownerBcgovBusinesscontact = default(IList<MicrosoftDynamicsCRMbcgovBusinesscontact>), IList<MicrosoftDynamicsCRMbcgovCustomproduct> ownerBcgovCustomproduct = default(IList<MicrosoftDynamicsCRMbcgovCustomproduct>), IList<MicrosoftDynamicsCRMbcgovCertificate> ownerBcgovCertificate = default(IList<MicrosoftDynamicsCRMbcgovCertificate>), IList<MicrosoftDynamicsCRMbcgovLocation> ownerBcgovLocation = default(IList<MicrosoftDynamicsCRMbcgovLocation>), IList<MicrosoftDynamicsCRMbcgovEquipment> ownerBcgovEquipment = default(IList<MicrosoftDynamicsCRMbcgovEquipment>), IList<MicrosoftDynamicsCRMbcgovEquipmentlocation> ownerBcgovEquipmentlocation = default(IList<MicrosoftDynamicsCRMbcgovEquipmentlocation>), IList<MicrosoftDynamicsCRMbcgovCertificatetermsandconditions> ownerBcgovCertificatetermsandconditions = default(IList<MicrosoftDynamicsCRMbcgovCertificatetermsandconditions>), IList<MicrosoftDynamicsCRMbcgovRiskassessment> ownerBcgovRiskassessment = default(IList<MicrosoftDynamicsCRMbcgovRiskassessment>), IList<MicrosoftDynamicsCRMabsAutonumberedentity> ownerAbsAutonumberedentity = default(IList<MicrosoftDynamicsCRMabsAutonumberedentity>))
        {
            Ownerid = ownerid;
            OwnerExchangesyncidmapping = ownerExchangesyncidmapping;
            OwnerNewInteractionforemail = ownerNewInteractionforemail;
            OwnerKnowledgearticle = ownerKnowledgearticle;
            OwnerSharepointsite = ownerSharepointsite;
            OwnerSharepointdocumentlocation = ownerSharepointdocumentlocation;
            OwnerEntitlement = ownerEntitlement;
            OwnerGoal = ownerGoal;
            OwnerMailbox = ownerMailbox;
            OwnerBookableresource = ownerBookableresource;
            OwnerBookableresourcebooking = ownerBookableresourcebooking;
            OwnerBookableresourcebookingheader = ownerBookableresourcebookingheader;
            OwnerBookableresourcecategory = ownerBookableresourcecategory;
            OwnerBookableresourcecategoryassn = ownerBookableresourcecategoryassn;
            OwnerBookableresourcecharacteristic = ownerBookableresourcecharacteristic;
            OwnerBookableresourcegroup = ownerBookableresourcegroup;
            OwnerBookingstatus = ownerBookingstatus;
            OwnerCharacteristic = ownerCharacteristic;
            OwnerRatingmodel = ownerRatingmodel;
            OwnerRatingvalue = ownerRatingvalue;
            OwnerPersonaldocumenttemplates = ownerPersonaldocumenttemplates;
            OwnerAccounts = ownerAccounts;
            OwnerGoalrollupquery = ownerGoalrollupquery;
            OwnerSalesorders = ownerSalesorders;
            OwnerPostfollows = ownerPostfollows;
            OwnerWorkflows = ownerWorkflows;
            OwnerLists = ownerLists;
            OwnerUserquerys = ownerUserquerys;
            OwnerImportmaps = ownerImportmaps;
            OwnerMailmergetemplates = ownerMailmergetemplates;
            OwnerOpportunitys = ownerOpportunitys;
            OwnerDuplicaterules = ownerDuplicaterules;
            OwnerReports = ownerReports;
            OwnerActivitypointers = ownerActivitypointers;
            ActionCardUserStateOwner = actionCardUserStateOwner;
            OwnerPrincipalentitymap = ownerPrincipalentitymap;
            OwnerImportdatas = ownerImportdatas;
            OwnerCategories = ownerCategories;
            OwnerDynamicproperyinstance = ownerDynamicproperyinstance;
            OwnerQueues = ownerQueues;
            OwnerActioncards = ownerActioncards;
            OwnerUserqueryvisualizations = ownerUserqueryvisualizations;
            OwnerCampaigns = ownerCampaigns;
            OwnerFeedback = ownerFeedback;
            OwnerQuotes = ownerQuotes;
            OwnerInvoices = ownerInvoices;
            OwnerAnnotations = ownerAnnotations;
            OwnerUserform = ownerUserform;
            OwnerAsyncoperations = ownerAsyncoperations;
            OwnerSocialProfile = ownerSocialProfile;
            OwnerSlas = ownerSlas;
            SlakpiinstanceOwner = slakpiinstanceOwner;
            OwnerEmailserverprofile = ownerEmailserverprofile;
            OwnerIncidents = ownerIncidents;
            OwnerTemplates = ownerTemplates;
            OwnerContacts = ownerContacts;
            OwnerImports = ownerImports;
            OwnerLeads = ownerLeads;
            OwnerConnections = ownerConnections;
            OwnerImportfiles = ownerImportfiles;
            OwnerImportlogs = ownerImportlogs;
            OwnerSyncError = ownerSyncError;
            OwnerContracts = ownerContracts;
            OwnerBcgovCustomaddress = ownerBcgovCustomaddress;
            OwnerBcgovTermsconditionspreset = ownerBcgovTermsconditionspreset;
            OwnerBcgovApplicationtype = ownerBcgovApplicationtype;
            OwnerBcgovBusinesscontact = ownerBcgovBusinesscontact;
            OwnerBcgovCustomproduct = ownerBcgovCustomproduct;
            OwnerBcgovCertificate = ownerBcgovCertificate;
            OwnerBcgovLocation = ownerBcgovLocation;
            OwnerBcgovEquipment = ownerBcgovEquipment;
            OwnerBcgovEquipmentlocation = ownerBcgovEquipmentlocation;
            OwnerBcgovCertificatetermsandconditions = ownerBcgovCertificatetermsandconditions;
            OwnerBcgovRiskassessment = ownerBcgovRiskassessment;
            OwnerAbsAutonumberedentity = ownerAbsAutonumberedentity;
            CustomInit();
        }

        /// <summary>
        /// An initialization method that performs custom operations like setting defaults
        /// </summary>
        partial void CustomInit();

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "ownerid")]
        public string Ownerid { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_exchangesyncidmapping")]
        public IList<MicrosoftDynamicsCRMexchangesyncidmapping> OwnerExchangesyncidmapping { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_new_interactionforemail")]
        public IList<MicrosoftDynamicsCRMinteractionforemail> OwnerNewInteractionforemail { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_knowledgearticle")]
        public IList<MicrosoftDynamicsCRMknowledgearticle> OwnerKnowledgearticle { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_sharepointsite")]
        public IList<MicrosoftDynamicsCRMsharepointsite> OwnerSharepointsite { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_sharepointdocumentlocation")]
        public IList<MicrosoftDynamicsCRMsharepointdocumentlocation> OwnerSharepointdocumentlocation { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_entitlement")]
        public IList<MicrosoftDynamicsCRMentitlement> OwnerEntitlement { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_goal")]
        public IList<MicrosoftDynamicsCRMgoal> OwnerGoal { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_mailbox")]
        public IList<MicrosoftDynamicsCRMmailbox> OwnerMailbox { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_bookableresource")]
        public IList<MicrosoftDynamicsCRMbookableresource> OwnerBookableresource { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_bookableresourcebooking")]
        public IList<MicrosoftDynamicsCRMbookableresourcebooking> OwnerBookableresourcebooking { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_bookableresourcebookingheader")]
        public IList<MicrosoftDynamicsCRMbookableresourcebookingheader> OwnerBookableresourcebookingheader { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_bookableresourcecategory")]
        public IList<MicrosoftDynamicsCRMbookableresourcecategory> OwnerBookableresourcecategory { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_bookableresourcecategoryassn")]
        public IList<MicrosoftDynamicsCRMbookableresourcecategoryassn> OwnerBookableresourcecategoryassn { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_bookableresourcecharacteristic")]
        public IList<MicrosoftDynamicsCRMbookableresourcecharacteristic> OwnerBookableresourcecharacteristic { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_bookableresourcegroup")]
        public IList<MicrosoftDynamicsCRMbookableresourcegroup> OwnerBookableresourcegroup { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_bookingstatus")]
        public IList<MicrosoftDynamicsCRMbookingstatus> OwnerBookingstatus { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_characteristic")]
        public IList<MicrosoftDynamicsCRMcharacteristic> OwnerCharacteristic { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_ratingmodel")]
        public IList<MicrosoftDynamicsCRMratingmodel> OwnerRatingmodel { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_ratingvalue")]
        public IList<MicrosoftDynamicsCRMratingvalue> OwnerRatingvalue { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_personaldocumenttemplates")]
        public IList<MicrosoftDynamicsCRMpersonaldocumenttemplate> OwnerPersonaldocumenttemplates { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_accounts")]
        public IList<MicrosoftDynamicsCRMaccount> OwnerAccounts { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_goalrollupquery")]
        public IList<MicrosoftDynamicsCRMgoalrollupquery> OwnerGoalrollupquery { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_salesorders")]
        public IList<MicrosoftDynamicsCRMsalesorder> OwnerSalesorders { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_postfollows")]
        public IList<MicrosoftDynamicsCRMpostfollow> OwnerPostfollows { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_workflows")]
        public IList<MicrosoftDynamicsCRMworkflow> OwnerWorkflows { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_lists")]
        public IList<MicrosoftDynamicsCRMlist> OwnerLists { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_userquerys")]
        public IList<MicrosoftDynamicsCRMuserquery> OwnerUserquerys { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_importmaps")]
        public IList<MicrosoftDynamicsCRMimportmap> OwnerImportmaps { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_mailmergetemplates")]
        public IList<MicrosoftDynamicsCRMmailmergetemplate> OwnerMailmergetemplates { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_opportunitys")]
        public IList<MicrosoftDynamicsCRMopportunity> OwnerOpportunitys { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_duplicaterules")]
        public IList<MicrosoftDynamicsCRMduplicaterule> OwnerDuplicaterules { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_reports")]
        public IList<MicrosoftDynamicsCRMreport> OwnerReports { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_activitypointers")]
        public IList<MicrosoftDynamicsCRMactivitypointer> OwnerActivitypointers { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "ActionCardUserState_Owner")]
        public IList<MicrosoftDynamicsCRMactioncarduserstate> ActionCardUserStateOwner { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_principalentitymap")]
        public IList<MicrosoftDynamicsCRMprincipalentitymap> OwnerPrincipalentitymap { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_importdatas")]
        public IList<MicrosoftDynamicsCRMimportdata> OwnerImportdatas { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_categories")]
        public IList<MicrosoftDynamicsCRMcategory> OwnerCategories { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "Owner_dynamicproperyinstance")]
        public IList<MicrosoftDynamicsCRMdynamicpropertyinstance> OwnerDynamicproperyinstance { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_queues")]
        public IList<MicrosoftDynamicsCRMqueue> OwnerQueues { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_actioncards")]
        public IList<MicrosoftDynamicsCRMactioncard> OwnerActioncards { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_userqueryvisualizations")]
        public IList<MicrosoftDynamicsCRMuserqueryvisualization> OwnerUserqueryvisualizations { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_campaigns")]
        public IList<MicrosoftDynamicsCRMcampaign> OwnerCampaigns { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_feedback")]
        public IList<MicrosoftDynamicsCRMfeedback> OwnerFeedback { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_quotes")]
        public IList<MicrosoftDynamicsCRMquote> OwnerQuotes { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_invoices")]
        public IList<MicrosoftDynamicsCRMinvoice> OwnerInvoices { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_annotations")]
        public IList<MicrosoftDynamicsCRMannotation> OwnerAnnotations { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_userform")]
        public IList<MicrosoftDynamicsCRMuserform> OwnerUserform { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_asyncoperations")]
        public IList<MicrosoftDynamicsCRMasyncoperation> OwnerAsyncoperations { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_SocialProfile")]
        public IList<MicrosoftDynamicsCRMsocialprofile> OwnerSocialProfile { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_slas")]
        public IList<MicrosoftDynamicsCRMsla> OwnerSlas { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "slakpiinstance_owner")]
        public IList<MicrosoftDynamicsCRMslakpiinstance> SlakpiinstanceOwner { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_emailserverprofile")]
        public IList<MicrosoftDynamicsCRMemailserverprofile> OwnerEmailserverprofile { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_incidents")]
        public IList<MicrosoftDynamicsCRMincident> OwnerIncidents { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_templates")]
        public IList<MicrosoftDynamicsCRMtemplate> OwnerTemplates { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_contacts")]
        public IList<MicrosoftDynamicsCRMcontact> OwnerContacts { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_imports")]
        public IList<MicrosoftDynamicsCRMimport> OwnerImports { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_leads")]
        public IList<MicrosoftDynamicsCRMlead> OwnerLeads { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_connections")]
        public IList<MicrosoftDynamicsCRMconnection> OwnerConnections { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_importfiles")]
        public IList<MicrosoftDynamicsCRMimportfile> OwnerImportfiles { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_importlogs")]
        public IList<MicrosoftDynamicsCRMimportlog> OwnerImportlogs { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_SyncError")]
        public IList<MicrosoftDynamicsCRMsyncerror> OwnerSyncError { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_contracts")]
        public IList<MicrosoftDynamicsCRMcontract> OwnerContracts { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_bcgov_customaddress")]
        public IList<MicrosoftDynamicsCRMbcgovCustomaddress> OwnerBcgovCustomaddress { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_bcgov_termsconditionspreset")]
        public IList<MicrosoftDynamicsCRMbcgovTermsconditionspreset> OwnerBcgovTermsconditionspreset { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_bcgov_applicationtype")]
        public IList<MicrosoftDynamicsCRMbcgovApplicationtype> OwnerBcgovApplicationtype { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_bcgov_businesscontact")]
        public IList<MicrosoftDynamicsCRMbcgovBusinesscontact> OwnerBcgovBusinesscontact { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_bcgov_customproduct")]
        public IList<MicrosoftDynamicsCRMbcgovCustomproduct> OwnerBcgovCustomproduct { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_bcgov_certificate")]
        public IList<MicrosoftDynamicsCRMbcgovCertificate> OwnerBcgovCertificate { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_bcgov_location")]
        public IList<MicrosoftDynamicsCRMbcgovLocation> OwnerBcgovLocation { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_bcgov_equipment")]
        public IList<MicrosoftDynamicsCRMbcgovEquipment> OwnerBcgovEquipment { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_bcgov_equipmentlocation")]
        public IList<MicrosoftDynamicsCRMbcgovEquipmentlocation> OwnerBcgovEquipmentlocation { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_bcgov_certificatetermsandconditions")]
        public IList<MicrosoftDynamicsCRMbcgovCertificatetermsandconditions> OwnerBcgovCertificatetermsandconditions { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_bcgov_riskassessment")]
        public IList<MicrosoftDynamicsCRMbcgovRiskassessment> OwnerBcgovRiskassessment { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owner_abs_autonumberedentity")]
        public IList<MicrosoftDynamicsCRMabsAutonumberedentity> OwnerAbsAutonumberedentity { get; set; }

    }
}
