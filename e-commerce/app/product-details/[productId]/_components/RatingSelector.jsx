import { useEffect, useState } from 'react';

const RatingSelector = ({ rating, onRatingChange }) => {
    const [selectedRating, setSelectedRating] = useState(rating);

    const handleRatingClick = (value) => {
        setSelectedRating(value);
        onRatingChange(value); // Notify parent component of the new rating
    };

    // Sync the internal state with the prop when it changes
    useEffect(() => {
        setSelectedRating(rating);
    }, [rating]);

    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button" // Ensure the button type is "button"
                    onClick={() => handleRatingClick(star)}
                    className={`text-2xl ${star <= selectedRating ? 'text-yellow-500' : 'text-gray-300'} hover:text-yellow-400`}
                >
                    ★
                </button>
            ))}
        </div>
    );
};

export default RatingSelector;
