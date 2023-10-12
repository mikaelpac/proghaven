export function extractImageUrls(imageData: any): string[] {
  if (imageData && Array.isArray(imageData)) {
    return imageData.map((imageObject: any) => imageObject["#text"]);
  }
  return [];
}

export async function convertImageToBase64(
  url: string
): Promise<string | null> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error converting image to base64:", error);
    return null;
  }
}
