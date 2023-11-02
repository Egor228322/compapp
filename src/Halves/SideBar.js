import FavHisButton from "../components/FavHisMenu"
import History from "../components/History"

function SideBar() {
    return (
        <div className="sidebar">
            <FavHisButton />
            <History />
        </div>
    )
}

export default SideBar
