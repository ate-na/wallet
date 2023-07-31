exports.getAllMonthsOfYear = () => {
    const months = [];
    const currentDate = new Date();

    for (let year = currentDate.getFullYear(); year >= 1970; year--) {
        for (let month = 11; month >= 0; month--) {
            const date = new Date(year, month, 1);
            const monthName = date.toLocaleString("en-us", { month: "long" });
            const yearMonth = `${monthName} ${year}`;

            months.push(yearMonth);
        }
    }

    return months;
};