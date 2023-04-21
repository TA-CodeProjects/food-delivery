import { useEffect } from "react";
import MenuItem from "./MenuItem";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getMenuItems, reset } from "../../features/menus/menuSlice";
import Spinner from "../../Services/Spinner";

function MenuList() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params.id || "";

  const { menus, isLoading, isError, message } = useAppSelector((state) => state.menus);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getMenuItems(id));

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch, id]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <button className="btn btn-reverse">
        <Link to={`/restaurant/${id}/addMenu`}>Add Item</Link>
      </button>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {menus.map((item) => (
            <MenuItem key={item.id} menu={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MenuList;
