export function decodeCglInsurance(code: number): string {
  switch (code) {
    case 100000000:
      return 'Agency Carries own CGL coverage';
    case 100000001:
      return "Agency requesting Province's Master Insurance Program enrolment";
    default:
      return null;
  }
}
