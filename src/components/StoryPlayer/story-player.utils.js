export const evalCondition = (condition, flags) => {
  if (!condition) return true;

  const { variable, operator, value } = condition;
  const flagValue = flags[variable];
  switch (operator) {
    case "==":
      return flagValue === value;
    case "!=":
      return flagValue !== value;
    case "<":
      return flagValue < value;
    case ">":
      return flagValue > value;
    case "<=":
      return flagValue <= value;
    case ">=":
      return flagValue >= value;
    default:
      return false;
  }
};

export const extractLinks = (text) => {
  const linkRegex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  const links = [];
  let match;
  while ((match = linkRegex.exec(text)) !== null) {
    const displayText = match[2] || match[1];
    const targetTitle = match[1];
    links.push({ displayText, targetTitle });
  }
  return links;
};
