import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(import.meta.env.VITE_APP_SUPABASE_URL, import.meta.env.VITE_APP_SUPABASE_ANON_KEY)

export const utilSupaGetImage = async (image_name) => {
    const size = window.innerWidth < 900 ? 300 : 600;
    const { data, error } = await supabase
      .storage
      .from('plantimage')
      .createSignedUrl(image_name, 60 * 60, { // 1 hour
        transform: {
          width: size,
          height: size,
        }
      });
    if (data) {
      return (data.signedUrl)
    }
    if (error) {
      console.error('Error fetching image:', error);
      const { noImgData, _ } = await supabase
      .storage
      .from('plantimage')
      .createSignedUrl('noimage.png', 60 * 60, { // 1 hour
        transform: {
          width: size,
          height: size,
        }
      });
      if (noImgData) {
        return (noImgData.signedUrl)
      }
    }
  }