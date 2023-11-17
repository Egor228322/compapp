export default function updateHistory(his, setHistory, history) {
    const copy = [...history];
    copy.pop();
    copy.unshift(his);
    setHistory(() => copy);
}