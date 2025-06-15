import Header from '@/components/Dashboard/Header'
import { authUserSession } from '@/libs/autlibs'
import prisma from '@/libs/prisma'
import Link from 'next/link'
import React from 'react'
import StarRating from '@/components/AnimeList/StarRating'

const Page = async () => {
    const user = await authUserSession()

    try {
        const comments = await prisma.Comments.findMany({ 
            where: {
                user_email: user.email, 
                rating: { not: null, not: undefined }, 
            },
            orderBy: { createdAt: 'desc' }
        })
        if (!comments || comments.length === 0) {
            return <h1 className="text-color-primary p-4">You haven't posted any comments</h1>
        }

        return (
            <section className="mt-4 px-4 w-full">
            <Header title={"My Comments"}/>
            <div className='grid grid-cols-1 py-2 gap-4'>
                {comments.map(comment => (
                    <Link 
                    key={comment.id} 
                    className='bg-color-primary text-color-dark p-4 rounded-lg break-words'
                    href={`/anime/${comment.mal_id}`}
                    >
                        <p className='text-sm text-center font-bold'>{comment.username}</p>
                        <p className='text-sm font-semibold'>{comment.anime_title}</p>
                        <div className="mb-2">
                            <StarRating value={comment.rating} />
                        </div>
                        <p className='italic mt-2 whitespace-pre-wrap break-words'>{comment.comment}</p>
                        {comment.createdAt && (
                        <span className="text-sm text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()} - {comment.user_email}
                        </span>
                        )}
                    </Link>
                ))}
            </div>
        </section>
        )
    } catch (error) {
        console.error("Error fetching comments:", error)
        return <div className="text-color-dark p-4">Error loading comments</div>
    }
}

export default Page