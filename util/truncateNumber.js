export default function truncateNumber(num) {
    if (num < 1000) {
        return num.toString();
    } else if (num < 1000000) {
        return (Math.floor(num / 100) / 10).toFixed(1) + 'K';
    } else if (num < 1000000000) {
        return (Math.floor(num / 100000) / 10).toFixed(1) + 'M';
    } else {
        return (Math.floor(num / 100000000) / 10).toFixed(1) + 'B';
    }
}