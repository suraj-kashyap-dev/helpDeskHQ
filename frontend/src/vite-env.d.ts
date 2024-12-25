interface ImportMetaEnv {
  VITE_APP_TITLE: string;
  VITE_SERVER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
