import { useNavigate, useParams } from "react-router-dom";
import Post from "../components/feed/post";
import { useEffect, useState } from "react";
import axios from "axios";
import ApiConfig from "../utils/ApiConfig";

export default function PostPage() {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  const navigate = useNavigate();

  console.log(params.postId);
  useEffect(() => {
    fetchPost(params.postId);
  }, []);

  const fetchPost = (post_id) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/auth");
    }
    if (post_id) {
      setIsLoading(true);
      axios
        .get(ApiConfig.getPost + post_id, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setPost(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 404) {
            navigate("/404");
          }
        });
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-start p-8 bg-[#f0f2f5]">
      {isLoading ? (
        <></>
      ) : (
        <div className="md:w-[70%]">
          <div className="w-full flex flex-col justify-center items-center">
            <Post
              post={post}
              key={post.id}
              fetchFeed={fetchPost}
              commentsExpand={true}
              isSeparate={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}
