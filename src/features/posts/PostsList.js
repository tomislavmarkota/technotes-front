import { useGetPostsQuery } from "./postsApiSlice";
import Post from "./Post";
import useAuth from "../../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";

const NotesList = () => {
  const { username, isUser, isAdmin } = useAuth();

  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery("postList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = posts;
    console.log(ids, entities);
    let filteredIds;
    if (isUser || isAdmin) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (noteId) => entities[noteId].username === username
      );
    }
   
    const tableContent =
      ids?.length &&
      filteredIds.map((noteId) => <Post key={noteId} noteId={noteId} />);

    content =  tableContent ;
  }

  return <div>{content}</div>;
};
export default NotesList;
