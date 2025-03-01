import { createClient } from '@supabase/supabase-js'

const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const service_role = process.env.SERVICE_ROLE!

export const supabase = createClient(supabase_url, service_role)

const base64ToBlob = (base64String: string, contentType: string) => {
  const byteCharacters = atob(base64String.split(',')[1])
  const byteNumbers = new Array(byteCharacters.length)

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }

  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: contentType })
}

export const uploadImage = async (
  base64String: string,
  path: string
): Promise<string> => {
  const contentType = 'imagen/png'
  const blob = base64ToBlob(base64String, contentType)
  const { data, error } = await supabase.storage
    .from('jem')
    .upload(path, blob, { contentType, cacheControl: '3600', upsert: true })
    if(error){
      throw new Error("No se subio la imagen");
    }
    const{data: {publicUrl}} = supabase.storage.from("Jem").getPublicUrl(path)
    return publicUrl
}


