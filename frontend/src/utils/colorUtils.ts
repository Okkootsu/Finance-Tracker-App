export const getCategoryColor = (categoryName: string): string => {
  let hash = 0;
  for (let i = 0; i < categoryName.length; i++) {
    hash = categoryName.charCodeAt(i) + ((hash << 5) - hash);
  }

  const absHash = Math.abs(hash);

  const hue = (absHash * 137.5) % 360;
  const saturation = 65 + (absHash % 20);
  const lightness = 45 + (absHash % 10);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
