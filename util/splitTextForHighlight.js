export default function splitTextForHighlight({text, highlight}) {
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return parts;
}