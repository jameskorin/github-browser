export default function splitTextForHighlight({text, highlight}) {
    if(text === null) return [];
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return parts;
}