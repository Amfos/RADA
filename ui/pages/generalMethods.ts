export class GeneralMethods {
  constructor() {}

  async getTodayDate() {
    const currentDate = new Date();

    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const dateString = currentDayOfMonth + '.' + (currentMonth + 1) + '.' + currentYear;
    // "27.11.2020"
    return dateString;
  }
}
