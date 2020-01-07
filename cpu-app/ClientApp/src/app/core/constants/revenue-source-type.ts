export const revenueSourceTypes: string[] = [
  'Ministry of PSSG - VSCP',
  'Municipal Government',
  'Regional District',
  'Applicant Organization',
  'Other Revenue Source',
];

export function revenueSourceType(discriminator: number): string {
  let revenueSourceType;
  switch (discriminator) {
    case 100000000: {
      revenueSourceType = revenueSourceTypes[0];
      break;
    }
    case 100000001: {
      revenueSourceType = revenueSourceTypes[1];
      break;
    }
    case 100000002: {
      revenueSourceType = revenueSourceTypes[2];
      break;
    }
    case 100000003: {
      revenueSourceType = revenueSourceTypes[3];
      break;
    }
    case 100000004: {
      revenueSourceType = revenueSourceTypes[4];
      break;
    }
    default: {
      console.log('An error has occured. This type of revenue source is not known:\n' + discriminator);
      revenueSourceType = discriminator;
      break;
    }
  }
  return revenueSourceType;
}
