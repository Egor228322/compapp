//This function updates history when there are more than ten entries
export default function updateHistory(his, setHistory, history, index) {
    if (!index) {
        const copy = [...history];
        copy.pop();
        copy.unshift(his);
        setHistory(() => copy);
    }
    else {
        const copy = history.filter((_, i) => i !== index);
        console.log(copy);
        setHistory(() => copy);
    }
}