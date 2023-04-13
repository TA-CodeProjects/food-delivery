import { UserModel } from "../../Models/UserModel";
import { useAppDispatch } from "../../app/hooks";
import { deleteUser } from "../../features/users/usersSlice";

interface UserItemProps {
  user: UserModel;
}

function UserItem(props: UserItemProps) {
  const dispatch = useAppDispatch();


  return (
    <tr>
      <td>{props.user.id}</td>
      <td>{props.user.name}</td>
      <td>{props.user.email}</td>
      <td>
        <button className="btn" onClick={() => dispatch(deleteUser(props.user.id))}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default UserItem;
