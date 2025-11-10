export function colorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash); // hash simple
  }
  const hue = Math.abs(hash) % 360; // teinte 0-359
  const saturation = 70; // saturation fixe
  const lightness = 60; // luminosité fixe
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
