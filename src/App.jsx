import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPost, fetchPosts, deletePost } from "./utils/utils";
import { useState } from "react";

function App() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [views, setViews] = useState("");

  const { data, isLoading, error, isError } = useQuery({
    queryKey: [`posts`],
    queryFn: fetchPosts,
    staleTime: 1000 * 5,
  });

  const addMutation = useMutation({
    mutationKey: [`post`],
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`posts`] });
      setTitle("");
      setViews("");
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
  if (!data) return <div>No data</div>;

  return (
    <>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Views"
        type="number"
        value={views}
        onChange={(e) => setViews(e.target.value)}
      />

      <button
        onClick={() =>
          addMutation.mutate({
            title,
            views: Number(views),
          })
        }
        disabled={!title || !views}
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
