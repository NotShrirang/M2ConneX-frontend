import { useNavigate, useParams } from "react-router-dom";
import Post from "../components/feed/post";
import { useEffect, useState } from "react";
import axios from "axios";
import ApiConfig from "../utils/ApiConfig";

export default function PostPage() {
    const [post, setPost] = useState({
        // "id": "c807ec8d-942c-4aca-a56e-86ac3b1b9e44",
        // "subject": "This is a test post",
        // "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliq",
        // "user": "76f62a58-5404-486d-9afc-07bded328704",
        // "isPublic": true,
        // "createdAt": "2019-08-24T14:15:22Z",
        // "updatedAt": "2019-08-24T14:15:22Z",
        // "userName": "user name",
        // "userBio": "I am a user",
        // "profilePicture": "https://picsum.photos/200",
        // "isLiked": "true",
        // "likesCount": "1",
        // "commentsCount": "12",
        // "sharesCount": "22",
        // "isEditable": "false",
        // images: ["https://picsum.photos/300"]

    });
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();

    const navigate = useNavigate()

    console.log(params.postId);
    useEffect(() => {
        fetchPost(params.postId)
    }, []);

    const fetchPost = (post_id) => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            navigate("/auth");
        }
        if (post_id) {
            setIsLoading(true);
            axios
                .get(ApiConfig.getPost + post_id,
                    {
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
                });

        }
    }

    return (
        <>
            {
                isLoading ? <></> :
                    <div className="w-full flex justify-center h-screen pt-16">
                        <div className="md:w-[70%]">
                            <Post post={post} key={post.id} fetchFeed={fetchPost} commentsExpand={true} />
                        </div>
                    </div>

            }
        </>
    )
}