export default function truncateTextByWords(text, maxChars) {
	if (text.length <= maxChars) {
		return text;
	}

	const words = text.split(" ");

	let truncatedText = "";
	for (let word of words) {
		if ((truncatedText + word).length > maxChars) {
			break;
		}
		truncatedText += (truncatedText ? " " : "") + word;
	}

	return truncatedText;
}
