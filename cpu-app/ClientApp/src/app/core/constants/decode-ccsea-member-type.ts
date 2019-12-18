export function decodeCcseaMemberType(code: string): string {
  switch (code) {
    case '100000000':
      return 'Member';
    case '100000001':
      return 'Associate';
    case '100000002':
      return 'Non-Member';
    default:
      return null;
  }
}
