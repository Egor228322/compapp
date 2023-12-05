import Button from "./Button"

//Accepts props for the open state (fav/his) as well as the setOpen method
function FavHisButton({ open, setOpen }) {
    
    //returns a div with the Button reusable functional component
    return (
        <div className="selection-his-fav">
            <Button role={open} data1={'fav'} data2={'his'} onClick={setOpen} />
        </div>
    )
}

export default FavHisButton
