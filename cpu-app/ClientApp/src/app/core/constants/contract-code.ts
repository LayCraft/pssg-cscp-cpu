export function contractCode(statuscode: number): [string, string] {
  let textStatus;
  let textCategory;
  switch (statuscode) {
    // upcoming
    case 100000000: {
      textCategory = 'upcoming';
      textStatus = 'Sent';
      break;
    }
    case 100000001: {
      textCategory = 'upcoming';
      textStatus = 'Received';
      break;
    }
    case 100000002: {
      textCategory = 'upcoming';
      textStatus = 'Processing';
      break;
    }
    case 100000003: {
      textCategory = 'upcoming';
      textStatus = 'Recommended for Approval';
      break;
    }
    case 100000004: {
      textCategory = 'upcoming';
      textStatus = 'Escalated';
      break;
    }
    case 100000005: {
      textCategory = 'upcoming';
      textStatus = 'Information Denied';
      break;
    }
    // current
    case 100000006: {
      textCategory = 'current'
      textStatus = 'Approved';
      break;
    }
    case 100000008: {
      textCategory = 'current'
      textStatus = 'Under Review';
      break;
    }
    // past
    case 2: {
      textCategory = 'past';
      textStatus = 'Archived';
      break;
    }
    default: {
      textCategory = 'none';
      textStatus = 'No Status';
      break;
    }
  }
  return [textCategory, textStatus];
}
