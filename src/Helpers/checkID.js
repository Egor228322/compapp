//This function checks if an entry is already present in history state
export default function checkHistory(ID, entries) {

    for (let en of entries) {
        const { id } = en;
        if (id === ID) return id;
    }

    return false;
}