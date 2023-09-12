interface ResultsObject {
  name: string;
  y: number;
}

interface SeriesObject {
  [key: string]: ResultsObject[];
  waiting: ResultsObject[];
  sent: ResultsObject[];
  opened: ResultsObject[];
  replied: ResultsObject[];
  booked: ResultsObject[];
  postponed: ResultsObject[];
}

interface BaseResultsObject {
  series: SeriesObject;
  maxAmount: number;
}

export const formatSummary = (
  baseResultsObject: BaseResultsObject,
): ResultsObject[] => {
  const summaryData: ResultsObject[] = [];

  for (const key in baseResultsObject.series) {
    // eslint-disable-next-line no-prototype-builtins
    if (baseResultsObject.series.hasOwnProperty(key)) {
      summaryData.push(...baseResultsObject.series[key]);
    }
  }

  return summaryData;
};

export const formatAmounts = (
  rawData: any[],
  fromDate: Date,
  toDate: Date,
): BaseResultsObject => {
  const baseResultsObject: BaseResultsObject = {
    series: {
      waiting: [],
      sent: [],
      opened: [],
      replied: [],
      booked: [],
      postponed: [],
    },
    maxAmount: 0,
  };

  const dateMap = new Map<string, string>();

  for (let d = fromDate; d <= toDate; d.setDate(d.getDate() + 1)) {
    const dateStr = `${d.getDate()}/${d.getMonth() + 1}`;
    dateMap.set(dateStr, dateStr);
  }

  rawData.forEach((item) => {
    const dateKey = `${item._id.date}/${item._id.month}`;
    if (dateMap.has(dateKey)) {
      for (const key in baseResultsObject.series) {
        // eslint-disable-next-line no-prototype-builtins
        if (baseResultsObject.series.hasOwnProperty(key)) {
          if (key === item._id.category) {
            const value = item.value || 0;
            baseResultsObject.series[key].push({ name: dateKey, y: value });

            if (value > baseResultsObject.maxAmount) {
              baseResultsObject.maxAmount = value;
            }
          } else {
            baseResultsObject.series[key].push({ name: dateKey, y: 0 });
          }
        }
      }
    }
  });

  return baseResultsObject;
};
