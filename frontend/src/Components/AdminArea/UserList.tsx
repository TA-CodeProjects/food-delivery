import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUsers, reset } from "../../features/users/usersSlice";
import Spinner from "../../Services/Spinner";
import UserItem from "./UserItem";

function UserList() {
  const dispatch = useAppDispatch();

  const { users, isLoading, isError, message } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getUsers());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  );
}

export default UserList;
