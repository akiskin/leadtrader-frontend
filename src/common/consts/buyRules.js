export const DECISION_POINT_VALUE_TYPES = {
  MONEY: "MONEY",
  INTEGER: "INTEGER",
  PERCENT: "PERCENT",
};

export const DECISION_POINT_OPERATORS = {
  GT: ">",
  GTE: ">=",
  LT: "<",
  LTE: "<=",
  EQ: "=",
};

export const DECISION_POINTS = {
  daysSinceLastTransaction: {
    presentation: "Days since last bank transaction",
    description: "Count",
    type: DECISION_POINT_VALUE_TYPES.INTEGER,
    operators: [
      DECISION_POINT_OPERATORS.LT,
      DECISION_POINT_OPERATORS.LTE,
      DECISION_POINT_OPERATORS.EQ,
    ],
  },

  daysSinceLeadUpload: {
    presentation: "Days since lead upload date",
    description: "Count",
    type: DECISION_POINT_VALUE_TYPES.INTEGER,
    operators: [
      DECISION_POINT_OPERATORS.LT,
      DECISION_POINT_OPERATORS.LTE,
      DECISION_POINT_OPERATORS.EQ,
    ],
  },

  DM004: {
    presentation: "Total number of dishonours",
    description: "Count",
    type: DECISION_POINT_VALUE_TYPES.INTEGER,
    operators: [
      DECISION_POINT_OPERATORS.GT,
      DECISION_POINT_OPERATORS.GTE,
      DECISION_POINT_OPERATORS.LT,
      DECISION_POINT_OPERATORS.LTE,
      DECISION_POINT_OPERATORS.EQ,
    ],
  },
  DM005: {
    presentation: "Total number of SACC dishonours",
    description: "Count",
    type: DECISION_POINT_VALUE_TYPES.INTEGER,
    operators: [
      DECISION_POINT_OPERATORS.GT,
      DECISION_POINT_OPERATORS.GTE,
      DECISION_POINT_OPERATORS.LT,
      DECISION_POINT_OPERATORS.LTE,
      DECISION_POINT_OPERATORS.EQ,
    ],
  },
  CF003: {
    presentation: "Dishonours > $50 last 30 days",
    description: "Count",
    type: DECISION_POINT_VALUE_TYPES.INTEGER,
    operators: [
      DECISION_POINT_OPERATORS.GT,
      DECISION_POINT_OPERATORS.GTE,
      DECISION_POINT_OPERATORS.LT,
      DECISION_POINT_OPERATORS.LTE,
      DECISION_POINT_OPERATORS.EQ,
    ],
  },
  DM001: {
    presentation: "Wages Monthly",
    description: "Amount in $",
    type: DECISION_POINT_VALUE_TYPES.MONEY,
    operators: [
      DECISION_POINT_OPERATORS.GT,
      DECISION_POINT_OPERATORS.GTE,
      DECISION_POINT_OPERATORS.LT,
      DECISION_POINT_OPERATORS.LTE,
      DECISION_POINT_OPERATORS.EQ,
    ],
  },
  DM003: {
    presentation: "Centrelink as a % of income",
    description: "Percent",
    type: DECISION_POINT_VALUE_TYPES.PERCENT,
    operators: [
      DECISION_POINT_OPERATORS.GT,
      DECISION_POINT_OPERATORS.GTE,
      DECISION_POINT_OPERATORS.LT,
      DECISION_POINT_OPERATORS.LTE,
      DECISION_POINT_OPERATORS.EQ,
    ],
  },
  MN007: {
    presentation: "SACC loans funded in statement period",
    description: "Count",
    type: DECISION_POINT_VALUE_TYPES.INTEGER,
    operators: [
      DECISION_POINT_OPERATORS.GT,
      DECISION_POINT_OPERATORS.GTE,
      DECISION_POINT_OPERATORS.LT,
      DECISION_POINT_OPERATORS.LTE,
      DECISION_POINT_OPERATORS.EQ,
    ],
  },
  CF010: {
    presentation: "SACC loans funded in last 14 days",
    description: "Count",
    type: DECISION_POINT_VALUE_TYPES.INTEGER,
    operators: [
      DECISION_POINT_OPERATORS.GT,
      DECISION_POINT_OPERATORS.GTE,
      DECISION_POINT_OPERATORS.LT,
      DECISION_POINT_OPERATORS.LTE,
      DECISION_POINT_OPERATORS.EQ,
    ],
  },
  CF005: {
    presentation: "Gambling % of income",
    description: "Percent",
    type: DECISION_POINT_VALUE_TYPES.PERCENT,
    operators: [
      DECISION_POINT_OPERATORS.GT,
      DECISION_POINT_OPERATORS.GTE,
      DECISION_POINT_OPERATORS.LT,
      DECISION_POINT_OPERATORS.LTE,
      DECISION_POINT_OPERATORS.EQ,
    ],
  },
  DM006: {
    presentation: "Income spent on day of deposit",
    description: "Percent",
    type: DECISION_POINT_VALUE_TYPES.PERCENT,
    operators: [
      DECISION_POINT_OPERATORS.GT,
      DECISION_POINT_OPERATORS.GTE,
      DECISION_POINT_OPERATORS.LT,
      DECISION_POINT_OPERATORS.LTE,
      DECISION_POINT_OPERATORS.EQ,
    ],
  },
  CF004: {
    presentation: "Dishonours > $50 - Last 90 Days",
    description: "Count",
    type: DECISION_POINT_VALUE_TYPES.INTEGER,
    operators: [
      DECISION_POINT_OPERATORS.GT,
      DECISION_POINT_OPERATORS.GTE,
      DECISION_POINT_OPERATORS.LT,
      DECISION_POINT_OPERATORS.LTE,
      DECISION_POINT_OPERATORS.EQ,
    ],
  },
  CF008: {
    presentation:
      "Percentage of Income Spent on Day of Deposit (excluding transfers)",
    description: "Percent",
    type: DECISION_POINT_VALUE_TYPES.PERCENT,
    operators: [
      DECISION_POINT_OPERATORS.GT,
      DECISION_POINT_OPERATORS.GTE,
      DECISION_POINT_OPERATORS.LT,
      DECISION_POINT_OPERATORS.LTE,
      DECISION_POINT_OPERATORS.EQ,
    ],
  },
  CF009: {
    presentation: "Centrelink Emergency Payments - Last 90 Days",
    description: "Amount in $",
    type: DECISION_POINT_VALUE_TYPES.MONEY,
    operators: [
      DECISION_POINT_OPERATORS.GT,
      DECISION_POINT_OPERATORS.GTE,
      DECISION_POINT_OPERATORS.LT,
      DECISION_POINT_OPERATORS.LTE,
      DECISION_POINT_OPERATORS.EQ,
    ],
  },
  CF012: {
    presentation: "Gambling Average Weekly Spend",
    description: "Amount in $",
    type: DECISION_POINT_VALUE_TYPES.MONEY,
    operators: [
      DECISION_POINT_OPERATORS.GT,
      DECISION_POINT_OPERATORS.GTE,
      DECISION_POINT_OPERATORS.LT,
      DECISION_POINT_OPERATORS.LTE,
      DECISION_POINT_OPERATORS.EQ,
    ],
  },
  DM012: {
    presentation: "Number of SACC Providers",
    description: "Count",
    type: DECISION_POINT_VALUE_TYPES.INTEGER,
    operators: [
      DECISION_POINT_OPERATORS.GT,
      DECISION_POINT_OPERATORS.GTE,
      DECISION_POINT_OPERATORS.LT,
      DECISION_POINT_OPERATORS.LTE,
      DECISION_POINT_OPERATORS.EQ,
    ],
  },
  LT007: {
    presentation: "The number of days since the most recent wage credit",
    description: "Count",
    type: DECISION_POINT_VALUE_TYPES.INTEGER,
    operators: [
      DECISION_POINT_OPERATORS.GT,
      DECISION_POINT_OPERATORS.GTE,
      DECISION_POINT_OPERATORS.LT,
      DECISION_POINT_OPERATORS.LTE,
      DECISION_POINT_OPERATORS.EQ,
    ],
  },
};
