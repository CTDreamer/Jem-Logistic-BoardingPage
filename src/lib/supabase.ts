import { createClient } from '@supabase/supabase-js';

const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon_key = process.env.NEXT_PUBLIC_SUPABASE_ANON!;
export const supabase = createClient(supabase_url, anon_key);

// Convierte base64 a Blob 
const base64ToBlob = (base64String: string, contentType: string) => {
  const byteCharacters = atob(base64String.split(',')[1]);
  const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
};

// Detecta automáticamente el Content-Type
const getContentType = (base64String: string): string => {
  if (base64String.includes('data:image/png')) return 'image/png';
  if (base64String.includes('data:image/jpeg')) return 'image/jpeg';
  if (base64String.includes('data:application/pdf')) return 'application/pdf';
  return 'application/octet-stream';
};

// Función genérica para subir archivos
export const uploadFile = async (
  base64String: string,
  path: string
): Promise<string> => {
  const contentType = getContentType(base64String);
  const blob = base64ToBlob(base64String, contentType);

  const { error } = await supabase.storage
    .from('jem') // usa consistentemente el nombre del bucket
    .upload(path, blob, {
      contentType,
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    console.error("Error al subir archivo:", error);
    throw new Error("No se subió el archivo");
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from('jem').getPublicUrl(path);

  return publicUrl;
};
