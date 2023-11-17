function FavHisButton({open, setOpen}) {
    return (
        <div className="selection-his-fav">
            <h1>Please Select Type</h1>
            <div>
                <button className="btn-selection" disabled={open === 'favorites'} onClick={() => setOpen('favorites')}>Favorites</button>
                <button className="btn-selection" disabled={open === 'history'} onClick={() => setOpen('history')}>History</button>
            </div>
        </div>
    )
}

export default FavHisButton
