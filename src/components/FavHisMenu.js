import Button from "./Button"

function FavHisButton({open, setOpen}) {
    return (
        <div className="selection-his-fav">
            <Button role={open} data1={'fav'} data2={'his'} onClick={setOpen} />
        </div>
    )
}

export default FavHisButton
