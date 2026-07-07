export const fmtNumber = (n: number, digits = 0) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(n);

export const fmtCurrency = (n: number, currency = "SAR", digits = 0) => {
  const compact = Math.abs(n) >= 1_000_000;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 2 : digits,
  }).format(n);
};

export const fmtPercent = (n: number, digits = 1) =>
  `${n > 0 ? "+" : ""}${n.toFixed(digits)}%`;

export const fmtCompact = (n: number) =>
  new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);

export const cls = (...arr: (string | false | undefined | null)[]) =>
  arr.filter(Boolean).join(" ");
