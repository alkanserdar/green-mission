import { imageUrls } from "../types/cell";

export function getRandomImage(key: string): string {
  const urls = imageUrls[key];
  if (urls && urls.length > 0) {
    console.log("urls" + urls);
    const randomIndex = Math.floor(Math.random() * urls.length);
    return urls[randomIndex];
  }
  return "tree.png";
}
