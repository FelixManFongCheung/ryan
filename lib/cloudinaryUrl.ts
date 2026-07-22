/** Apply Cloudinary delivery transforms before `/upload/`. */
export function withCloudinaryTransform(
  url: string,
  transform: string
): string {
  return url.includes('/upload/')
    ? url.replace('/upload/', `/upload/${transform}/`)
    : url;
}
