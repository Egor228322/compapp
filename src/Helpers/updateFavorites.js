export default function updateFavorites(id, setFavorites, favorites) {

    let copy = [...favorites];
    const index = copy.findIndex(el => el.id ===
        id);
    copy.splice(index, 1);
    setFavorites(() => copy)
}