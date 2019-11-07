interface iDynamicsOrganization {
  "@odata.etag": string;
  _ownerid_value?: string;
  _vsd_boardcontactid_value?: string;
  _vsd_executivecontactid_value?: string;
  accountid?: string;
  address1_city?: string;
  address1_composite?: string;
  address1_line1?: string;
  address1_line2?: string;
  address1_postalcode?: string;
  address1_stateorprovince?: string;
  address2_city?: string;
  address2_composite?: string;
  address2_line1?: string;
  address2_line2?: string;
  address2_postalcode?: string;
  address2_stateorprovince?: string;
  emailaddress1?: string;
  fax?: string;
  name?: string;
  telephone1?: string;
}
interface iDynamicsCrmContact {
  "@odata.type"?: string;
  "@odata.etag"?: string;
  _parentcustomerid_value?: string;
  address1_city?: string;
  address1_composite?: string;
  address1_line1?: string;
  address1_line2?: string;
  address1_postalcode?: string;
  address1_stateorprovince?: string;
  contactid?: string;
  emailaddress1?: string;
  fax?: string;
  firstname?: string;
  fullname?: string;
  jobtitle?: string;
  lastname?: string;
  middlename?: string;
  mobilephone?: string;
  vsd_bceid?: string;
}
interface iDynamicsCrmContract {
  "@odata.type": string;
  "@odata.etag": string;
  _vsd_contactlookup1_value?: string;
  _vsd_contactlookup2_value?: string;
  _vsd_customer_value?: string;
  statuscode?: number;
  statecode?: number;
  vsd_contractid?: string;
  vsd_name?: string;
}
interface iDynamicsMinistryUser {
  "@odata.etag": string;
  address1_telephone1?: string;
  firstname?: string;
  internalemailaddress?: string;
  lastname?: string;
  ownerid?: string;
  systemuserid?: string;
}
interface iDynamicsCrmProgram {
  "@odata.type": string;
  "@odata.etag": string;
  _vsd_contactlookup_value?: string;
  _vsd_contractid_value?: string;
  _vsd_cpu_regiondistrict_value?: string;
  _vsd_cpu_regiondistrictlookup2_value?: string;
  _vsd_serviceproviderid_value?: string;
  vsd_addressline1?: string;
  vsd_addressline2?: string;
  vsd_city?: string;
  vsd_emailaddress?: string;
  vsd_fax?: string;
  vsd_mailingaddressline1?: string;
  vsd_mailingaddressline2?: string;
  vsd_mailingcity?: string;
  vsd_mailingpostalcodezip?: string;
  vsd_mailingprovincestate?: string;
  vsd_name?: string;
  vsd_phonenumber?: string;
  vsd_postalcodezip?: string;
  vsd_programid?: string;
  vsd_provincestate?: string;
}
interface iDynamicsCrmTask {
  "@odata.type": string;
  "@odata.etag": string;
  _regardingobjectid_value?: string;
  _vsd_tasktypeid_value?: string;
  activityid?: string;
  description?: string;
  scheduledend?: string;
  statecode?: number;
  statuscode?: number;
  subject?: string;
}
export interface iDynamicsBlob {
  "@odata.context": string;
  BoardContact?: iDynamicsCrmContact,
  Contracts?: iDynamicsCrmContract[];
  ExecutiveContact?: iDynamicsCrmContact,
  IsSuccess?: true;
  MinistryUser?: iDynamicsMinistryUser;
  Organization?: iDynamicsOrganization;
  Programs?: iDynamicsCrmProgram[];
  Result?: string;
  Staff?: iDynamicsCrmContact[];
  Tasks?: iDynamicsCrmTask[]
  bceid: string;
};
