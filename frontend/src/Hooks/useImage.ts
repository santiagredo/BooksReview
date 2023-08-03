const aventura = new URL("../../public/genres/aventura.svg", import.meta.url).href;
const ciencia = new URL("../../public/genres/ciencia.svg", import.meta.url).href;
const drama = new URL("../../public/genres/drama.svg", import.meta.url).href;
const ensayo = new URL("../../public/genres/ensayo.svg", import.meta.url).href;
const fantasia = new URL("../../public/genres/fantasia.svg", import.meta.url).href;
const ficcion = new URL("../../public/genres/ficcion.svg", import.meta.url).href;
const historia = new URL("../../public/genres/historia.svg", import.meta.url).href;
const misterio = new URL("../../public/genres/misterio.svg", import.meta.url).href;
const poesia = new URL("../../public/genres/poesia.svg", import.meta.url).href;
const romance = new URL("../../public/genres/romance.svg", import.meta.url).href;

export default function useImage (genre: string) {
    switch (genre) {
        case "Aventura":
            return aventura;
        case "Ciencia":
            return ciencia;
        case "Drama":
            return drama;
        case "Ensayos":
            return ensayo;
        case "Fantasia":
            return fantasia;
        case "Ficcion":
            return ficcion;
        case "Historia":
            return historia;
        case "Misterio":
            return misterio;
        case "Poesia":
            return poesia;
        case "Romance":
            return romance;
        default:
            break;
    };
};