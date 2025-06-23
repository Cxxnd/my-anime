"use client";

import dynamic from "next/dynamic";

const ReactStars = dynamic(
  () => import("react-stars"),
  { 
    ssr: false,
        loading: () => <div>Loading stars...</div>
  }
);

const StarRating = ({ value }) => {
    return (
        <>
        <ReactStars
        count={5}
        value={value}
        size={24}
        color2="#ffd700"
        edit={false}
        ishalf={false}
        />
            <span className="text-sm text-gray-500">
                {value > 0 ? `(${value} star${value > 1 ? 's' : ''})` : ''}
            </span>
        </>
    );
}
export default StarRating;