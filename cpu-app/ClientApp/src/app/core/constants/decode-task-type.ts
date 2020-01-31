import { formTypeDict } from "./form-type-dict";

export function decodeTaskType(discriminator: string, getName = false): string {
  // this discriminator is used to let the system know which form to open up using a patern known as single table inheritance
  // https://www.martinfowler.com/eaaCatalog/singleTableInheritance.html

  // try to collect the entity. If getName is true return the name otherwise return the form type
  const formType = formTypeDict[discriminator][getName ? 1 : 0];
  if (!formType) {
    console.log('An error has occured. This type of task is not known:\n' + discriminator);
    return discriminator;
  } else {
    return formType;
  }
}
