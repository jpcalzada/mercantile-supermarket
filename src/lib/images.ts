import type { ImageMetadata } from 'astro';

const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/*.webp',
  { eager: true }
);

// Map "/assets/garden1.webp" → the imported ImageMetadata object
const imageMap: Record<string, ImageMetadata> = {};
for (const [path, mod] of Object.entries(imageModules)) {
  // path is like "/src/assets/garden1.webp", we want "/assets/garden1.webp"
  const key = path.replace('/src/assets/', '/assets/');
  imageMap[key] = mod.default;
}

export function resolveImage(imagePath: string): ImageMetadata {
  const resolved = imageMap[imagePath];
  if (!resolved) {
    throw new Error(`Image not found: ${imagePath}`);
  }
  return resolved;
}

export { imageMap };
