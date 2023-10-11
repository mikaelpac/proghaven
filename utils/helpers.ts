export function extractImageUrls(imageData: any): string[] {
  if (imageData && Array.isArray(imageData)) {
    return imageData.map((imageObject: any) => imageObject["#text"]);
  }
  return [];
}
