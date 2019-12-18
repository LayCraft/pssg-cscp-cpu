export function formType(discriminator: string): string {
  // this discriminator is used to let the system know which form to open up using a patern known as single table inheritance
  // https://www.martinfowler.com/eaaCatalog/singleTableInheritance.html
  let formType;
  switch (discriminator) {
    case '768faf46-e8f5-e911-b811-00505683fbf4': {
      formType = 'budget_proposal';
      break;
    }
    case '9d0ef880-e8f5-e911-b811-00505683fbf4': {
      formType = 'expense_report';
      break;
    }
    case 'c84daf8d-e8f5-e911-b811-00505683fbf4': {
      formType = 'status_report';
      break;
    }
    case '8fa3b7ae-e8f5-e911-b811-00505683fbf4': {
      formType = 'profile';
      break;
    }
    // todo: why are there two discriminators for one form type? Are they the same form?
    case 'e023659f-e8f5-e911-b811-00505683fbf4': {
      console.log('Supported program application discriminator: e023659f-e8f5-e911-b811-00505683fbf4');
      formType = 'program_application';
      break;
    }
    case '47525432-e8f5-e911-b811-00505683fbf4': {
      console.log('Unsupported program application discriminator: 47525432-e8f5-e911-b811-00505683fbf4');
      formType = 'program_application';
      break;
    }
    default: {
      console.log('An error has occured. This type of task is not known:\n' + discriminator);
      formType = discriminator;
      break;
    }
  }
  return formType;
}
