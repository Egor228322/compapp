import Button from "./Button"

function FavHisButton({open, setOpen}) {
    return (
        <div className="selection-his-fav">
            <h1 className="title-side-bar">Please Select Type</h1>
            <Button open={open} setOpen={setOpen} />
        </div>
    )
}

export default FavHisButton
