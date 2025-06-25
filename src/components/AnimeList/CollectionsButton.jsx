'use client'
import React, { useState } from 'react';

const CollectionsButton = ({ mal_id, user_email, anime_image, anime_title }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [error, setError] = useState(null);

    const handlerCollections = async (event) => {
        event.preventDefault();
        
        if (isSubmitting || isAdded) return;
        
        setIsSubmitting(true);
        setError(null);
        
        const data = { mal_id, user_email, anime_image, anime_title };

        try {
            const response = await fetch('/api/v1/collection', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to add to collection');
            }

            setIsAdded(true);
        } catch (error) {
            console.error("Error in handlerCollections:", error);
            setError(error.message || 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-end items-end">
            <button 
                className={`text-sm rounded py-1 px-1 hover:font-bold transition-all ${
                    isAdded 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-color-accent hover:bg-color-dark'
                } ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                onClick={handlerCollections}
                disabled={isSubmitting || isAdded}
            >
                {isSubmitting ? (
                    'Adding...'
                ) : isAdded ? (
                    '✓ Added to Collection'
                ) : (
                    'Add To Collection'
                )}
            </button>
            
            {error && (
                <div className="ml-2 text-red-500 text-sm">
                    {error}
                </div>
            )}
        </div>
    );
};

export default CollectionsButton;