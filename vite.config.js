import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  base: "/pdf-resume",
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@react-pdf") || id.includes("react-pdf") || id.includes("pdfkit")) {
              return "pdf-renderer";
            }
            if (id.includes("react/") || id.includes("react-dom/")) {
              return "react-vendor";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
