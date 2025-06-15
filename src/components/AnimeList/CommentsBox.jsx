import prisma from "@/libs/prisma";
import StarRating from "./StarRating";
const CommentsBox = async ({ mal_id }) => {
    const comments = await prisma.comments.findMany({ 
        where: {
        mal_id: Number(mal_id),
        rating: { not: null, not: undefined }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    if (!comments || comments.length === 0) {
        return <div className="py-4">No Comments</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {comments.map(comment => (
                <div key={comment.id} className="p-4 bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold">{comment.username}</p>
                        {comment.createdAt && (
                            <span className="text-sm text-gray-500">
                                {new Date(comment.createdAt).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                    
                    <div className="mb-2">
                        <StarRating value={comment.rating}/>
                    </div>
                    
                    <p className="whitespace-pre-wrap">{comment.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default CommentsBox;