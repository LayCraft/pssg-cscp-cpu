export function formatSignatureDateForContract(date: Date): string {
    let dateParts = date.toLocaleString().split(/[\/,]/);
    return dateParts[2] + "-" + dateParts[0] + "-" + dateParts[1];
}
