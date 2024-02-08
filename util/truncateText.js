export default function truncateText(str, max) {
    return str.length > max ? `${str.substring(0,max - 3)}...` : str;
}