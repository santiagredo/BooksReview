export default function useBookUrl (title: string) {
    return title.replace(/\b\w/g, (match) => match.toUpperCase());
};