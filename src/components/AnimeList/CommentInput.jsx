"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';

const ReactStars = dynamic(
  () => import('react-stars'),
  { 
    ssr: false,
    loading: () => <div>Loading stars...</div>
  }
);


const CommentInput = ({ mal_id, user_email, username, anime_title }) => {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const router = useRouter();

    const handleInput = (event) => {
        setComment(event.target.value);
    }

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handlePostComment = async(event) => {
        event.preventDefault();
        
        if (comment.trim() === "") {
            setError("Comment cannot be empty");
            return;
        }
        if (comment.trim().length < 3) {
            setError("Comment must be at least 3 characters long");
            return;
        }
        if (rating === 0) {
            setError("Please give a rating");
            return;
        }

        if (isSubmitting) return;
        
        setIsSubmitting(true);
        setError(null);

        const data = { 
            mal_id, 
            user_email, 
            comment, 
            username, 
            anime_title,
            rating
        };

        try {
            const response = await fetch('/api/v1/comment', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to Post Comment');
            }
            setComment("");
            setRating(0);
            router.refresh();
        } catch (error) {
            console.error("Error posting comment:", error);
            setError(error.message || 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    }

    return(
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <span className="text-sm text-color-primary">Rating:</span>
                    <ReactStars
                        count={5}
                        value={rating}
                        onChange={handleRatingChange}
                        size={24}
                        activeColor="#ffd700"
                        color="#d3d3d3"
                        edit={true}
                        isHalf={true}
                        a11y={true}
                    />
                <span className="text-sm text-gray-500">
                    {rating > 0 ? `(${rating} star${rating > 1 ? 's' : ''})` : ''}
                </span>
            </div>
            
            <textarea 
                value={comment}
                onChange={handleInput} 
                className="h-32 w-full text-xl p-2 border rounded"
                placeholder="Write your comment (minimum 3 characters)..."
                minLength={3}
            />
            
            <button 
                className={`py-2 px-3 w-52 bg-color-accent hover:bg-color-dark text-white rounded ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                onClick={handlePostComment}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
            
            {error && (
                <div className="text-red-500 text-sm">
                    {error}
                </div>
            )}
        </div>
    )
}

export default CommentInput;