export default class FileService {
  static downloadFileFromBase64 = (
    base64: string,
    contentType: string,
    fileName: string
  ) => {
    const mimeType = FileService.getMimeType(contentType);
    const linkSource = `data:${mimeType};base64,${base64}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  static getMimeType = (contentType: string) => {
    switch (contentType.toLowerCase()) {
      case "pdf":
        return "application/pdf";
      case "jpeg":
      case "jpg":
        return "image/jpeg";
      case "png":
        return "image/png";
      case "txt":
        return "text/plain";
      default:
        return "application/octet-stream";
    }
  };
}

// Fonction pour convertir un fichier en Base64

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;
      // Extraire la partie Base64 du résultat
      const base64Content = base64String.split(",")[1];
      resolve(base64Content);
    };

    reader.onerror = () => {
      reject(new Error("Erreur lors de la lecture du fichier."));
    };

    reader.readAsDataURL(file);
  });
};

const base64ToFile = async (
  base64: string,
  mimeType: string,
  fileName?: string
) => {
  const res: Response = await fetch(base64);
  const blob: Blob = await res.blob();
  return new File([blob], fileName ?? "", { type: mimeType });
};

export { fileToBase64, base64ToFile };
