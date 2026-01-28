import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPost, fetchPosts, deletePost } from "./utils/utils";

function App() {
  const queryClient = useQueryClient();
  const { data, isLoading, error, isError } = useQuery({
    queryKey: [`posts`],
    queryFn: fetchPosts,
    staleTime: 1000 * 5,
  });
  const mutation = useMutation({
    mutationKey: [`post`],
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`posts`] });
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
        onClick={() => mutation.mutate({ title: "New Title", views: 300 })}
      >
        Add Post
      </button>
    </>
  );
}

export default App;
