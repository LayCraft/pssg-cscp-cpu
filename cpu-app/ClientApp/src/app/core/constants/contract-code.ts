export function contractCode(statuscode: number): [string, string] {
  let textStatus;
  let textCategory;
  switch (statuscode) {
    // upcoming
    case 100000000: {
      textStatus = 'Sent';
      textCategory = 'upcoming';
      break;
    }
    case 100000001: {
      textStatus = 'Received';
      textCategory = 'upcoming';
      break;
    }
    case 100000002: {
      textStatus = 'Processing';
      textCategory = 'upcoming';
      break;
    }
    case 100000003: {
      textStatus = 'Recommended for Approval';
      textCategory = 'upcoming';
      break;
    }
    case 100000004: {
      textStatus = 'Escalated';
      textCategory = 'upcoming';
      break;
    }
    case 100000005: {
      textStatus = 'Information Denied';
      textCategory = 'upcoming';
      break;
    }
    // approved
    case 100000006: {
      textStatus = 'Approved';
      textCategory = 'current'
      break;
    }
    // past
    case 2: {
      textStatus = 'Archived';
      textCategory = 'past';
      break;
    }
    default: {
      textStatus = 'No Status';
      textCategory = 'none';
      break;
    }
  }
  return [textCategory, textStatus];
}
