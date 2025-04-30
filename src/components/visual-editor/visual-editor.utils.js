import { nanoid } from 'nanoid';

export const INITIAL_NODES = [
  {
    id: "1",
    type: "custom",
    position: { x: 100, y: 100 },
    data: {
      title: "Node",
      description: "This is where the story begins.",
    },
  },
];

export const INITIAL_EDGES = [];

const getUniqueTitle = (existingTitles, base = INITIAL_NODES[0].data.title) => {
  let title = base;
  let counter = 1;

  const titleSet = new Set(existingTitles);

  while (titleSet.has(title)) {
    counter += 1;
    title = `${base} (${counter})`;
  }

  return title;
};

export const generateNewNode = (existingNodes = []) => {
  const id = nanoid();

  const existingTitles = existingNodes.map((n) => n.data.title);
  const title = getUniqueTitle(existingTitles);

  return {
    id,
    type: 'custom',
    position: { x: 200 + Math.random() * 100, y: 200 },
    data: {
      title,
      description: '...',
    },
  };
};

const maxDescriptionLength = 80; 

export const getTruncatedDescription = (text = "") =>
  text.length > maxDescriptionLength
    ? text.substring(0, maxDescriptionLength).trim() + "..."
    : text;
