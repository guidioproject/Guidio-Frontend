export function getPreviousLineFirstChar(el) {
	const cursosPos = el.selectionStart;
	let currentPos = cursosPos;
	while (currentPos > 0 && el.value[currentPos - 1] !== '\n')
		currentPos--;

	return currentPos;
}

export function handleOl(el) {
	let currentPos = getPreviousLineFirstChar(el);

	let num = el.value[currentPos];
	while (Number.isInteger(Number(el.value[currentPos + 1]))) {
		num += el.value[currentPos + 1];
		currentPos++;
	}

	if (el.value[currentPos + 1] !== "." || el.value[currentPos + 2] !== " ") {
		return;
	}

	return (Number(num) + 1) + ". ";
}