import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPost, fetchPosts, deletePost } from "./utils/utils";
import { useReducer } from "react";

const initialState = {
  title: "",
  views: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "change_title": {
      return { ...state, title: action.payload };
    }
    case "change_views": {
      return { ...state, views: Number(action.payload) || "" };
    }
    case "clear": {
      return initialState;
    }
    default:
      return state;
  }
};

function App() {
  const queryClient = useQueryClient();

  const [state, dispatch] = useReducer(reducer, initialState);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: [`posts`],
    queryFn: fetchPosts,
    staleTime: 1000 * 5,
  });

  const addMutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`posts`] });
      dispatch({ type: "clear" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`posts`] });
    },
  });

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <>
      <input
        placeholder="Title"
        value={state.title}
        onChange={(e) => {
          dispatch({ type: "change_title", payload: e.target.value });
        }}
      />

      <input
        placeholder="Views"
        type="number"
        value={state.views}
        onChange={(e) => {
          dispatch({ type: "change_views", payload: e.target.value });
        }}
      />

      <button
        onClick={() =>
          addMutation.mutate({
            title: state.title,
            views: Number(state.views),
          })
        }
        disabled={!state.title || !state.views}
      >
        Add Post
      </button>

      {data.map((item) => {
        return (
          <div className="post">
            <div key={item.id}>
              <p>{item.title}</p>
              <span>{item.views}</span>
            </div>
            <div className="delete-post">
              <button onClick={() => deleteMutation.mutate({ id: item.id })}>
                Delete Post
              </button>
            </div>
          </div>
        );
      })}
      <button
        onClick={() => addMutation.mutate({ title: "New Title", views: 300 })}
      >
        Add Post
      </button>
    </>
  );
}

export default App;
