import Button from "./Button"

function FavHisButton({open, setOpen}) {
    return (
        <div className="selection-his-fav">
            <Button open={open} setOpen={setOpen} />
        </div>
    )
}

export default FavHisButton
