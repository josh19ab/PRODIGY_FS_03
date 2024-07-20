import { useEffect, useState } from "react";
import GlobalApi from "../../../_utils/GlobalApi"; // Adjust the import path as needed
import SkeletalComment from "./SkeletalComments";

const CommentList = ({ productId, onRefresh }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await GlobalApi.getCommentById(productId);
        setComments(response.data.data);
      } catch (err) {
        setError("Failed to fetch comments");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchComments();
    }
  }, [productId, onRefresh]);

  return (
    <div className="mt-6">
      <div className="mt-40 mb-10">
        <span className="flex items-center">
          <span className="h-px flex-1 bg-black dark:bg-darkText"></span>
          <span className="shrink-0 px-6">Comments</span>
          <span className="h-px flex-1 bg-black  dark:bg-darkText"></span>
        </span>
      </div>
      {loading? <SkeletalComment />:
      <div>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold">
                    {comment.attributes.userName}
                  </span>
                  <span className="text-gray-500 ml-2">
                    {comment.attributes.email}
                  </span>
                  <div className="text-yellow-500 ml-2">
                    {"★".repeat(comment.attributes.rating)}
                    {"☆".repeat(5 - comment.attributes.rating)}
                  </div>
                </div>
              </div>
              <p className="mt-2 text-gray-700">{comment.attributes.desc}</p>
            </div>
          ))
        )}
      </div>}
    </div>
  );
};

export default CommentList;
