export interface IRedSocialElemento {
  ID: number;
  Title: string; // Nombre de la red social
  Link: {
    Url: string;
    Description?: string;
  };
  Icono: string; // nombre del archivo adjunto (imagen)
}