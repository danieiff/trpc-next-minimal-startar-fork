import { useEffect, useState, useReducer, useMemo } from "react";
import { trpc } from "../utils/trpc";
import { User } from "./api/trpc/[trpc]";
//import type { User } from ' '

export default function IndexPage() {
  const hello = trpc.hello.useQuery({ text: "client" });

  const [searchUserId, setSearchUserId] = useState<string>("");
  const user = trpc.userById.useQuery(searchUserId);

  const [newUserData, setNewUserData] = useReducer(
    (state: Partial<User>, newState: Partial<User>) => ({
      ...state,
      ...newState,
    }),
    { id: "", name: "" }
  );

  const [u, setu] = useState<User>({ id: "", name: "" });
  const mutation = trpc.userCreate.useMutation();
  const createUser = () => {
    if (newUserData.id && newUserData.name) {
      mutation.mutate({ id: newUserData.id, name: newUserData.name });
    }
  };

  // CMD+Click (or CTRL+Click) on `hello` to see the server-definition
  if (!hello.data) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div>
      {/* the type is defined and can be autocompleted */}
      <h1>{hello.data.greeting_text}</h1>
      <div>
        <label htmlFor="searchUserId">Search user by id</label>
        <input
          id="searchUserId"
          value={searchUserId}
          onChange={(e) => setSearchUserId(e.target.value)}
        />
      </div>
      {user?.data && <h2>{user.data.name}</h2>}
      <div>
        <label htmlFor="newUserId">New id</label>
        <input
          id="newUserId"
          value={newUserData.id}
          onChange={(e) => setNewUserData({ id: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="newUserName">New name</label>
        <input
          id="newUserName"
          value={newUserData.name}
          onChange={(e) => setNewUserData({ name: e.target.value })}
        />
      </div>
      <button onClick={createUser} disabled={mutation.isLoading}>
        Create user
      </button>
      {mutation.error && <p>Something went wrong! {mutation.error.message}</p>}
    </div>
  );
}
