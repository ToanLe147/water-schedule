import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa";


const manifestForPlugIn = {
  registerType:"autoUpdate",
  includeAssests:["favicon.ico", "apple-touch-icon.png", "maskable_icon.png"],
  manifest:{
    name:"Water Me",
    short_name:"Water Me",
    description:"Hello friends, we are your in-house plants, please take care of us!",
    icons:[{
      src: "/android-chrome-192x192.png",
      sizes:"192x192",
      type:"image/png",
      purpose:"favicon"
    },
    {
      src:"/android-chrome-512x512.png",
      sizes:"512x512",
      type:"image/png",
      purpose:"favicon"
    },
    {
      src: "/apple-touch-icon.png",
      sizes:"180x180",
      type:"image/png",
      purpose:"apple touch icon",
    },
  ],
  theme_color:"#FFCDD2",
  background_color:"#121212",
  display:"standalone",
  scope:"/",
  start_url: "/",
  orientation:"portrait"
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA( manifestForPlugIn ),
  ]
})
