export default function checkHistory(ID, history) {

    for (let his of history) {
        const { id } = his;
        if (id === ID) return false;
    }

    return true;
}