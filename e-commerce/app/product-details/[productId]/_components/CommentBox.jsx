import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import RatingSelector from "./RatingSelector";
import GlobalApi from "../../../_utils/GlobalApi";

const CommentBox = ({ onRefresh }) => {
  const path = usePathname();
  const router = useRouter();
  let Id = path.split("/")[2];
  const { user } = useUser();
  const [formData, setFormData] = useState({
    review: "",
    rating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      router.push("/sign-in"); // Redirect to sign-in page
      return;
    }

    try {
      const data = {
        data: {
          userName: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          desc: formData.review,
          products: Id,
          rating: formData.rating, // Include rating if needed
        },
      };

      const response = await GlobalApi.addComment(data);
      setFormData({ review: "", rating: 0 });
      onRefresh();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mt-20 w-[500px]  ">
      <h3 className="text-lg font-semibold mb-4 text-black">Add a Comment</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <RatingSelector
            rating={formData.rating}
            onRatingChange={(rating) => setFormData({ ...formData, rating })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Review:
          </label>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            required  
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
          ></textarea>
        </div>
        <button
          type="submit" // This button will submit the form
          className="w-full bg-darkAccent text-white rounded-md p-2 hover:bg-darkPrimary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentBox;
