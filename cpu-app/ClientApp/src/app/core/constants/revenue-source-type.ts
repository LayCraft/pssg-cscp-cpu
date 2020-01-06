export const formTypes: string[] = [
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
      revenueSourceType = formTypes[0];
      break;
    }
    case 100000001: {
      revenueSourceType = formTypes[1];
      break;
    }
    case 100000002: {
      revenueSourceType = formTypes[2];
      break;
    }
    case 100000003: {
      revenueSourceType = formTypes[3];
      break;
    }
    case 100000004: {
      revenueSourceType = formTypes[4];
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
