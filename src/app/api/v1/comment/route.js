import prisma from '@/libs/prisma'

export async function POST(request) {
    try {
    const { mal_id, user_email, comment, username, anime_title, rating} = await request.json()

    const data = {
        mal_id: Number(mal_id),
        user_email,
        comment,
        username,
        anime_title,
        rating
    }

    const createComments = await prisma.Comments.create({ data })
    return Response.json(createComments, { status: 200 })
    
    } catch (error) {
    console.error('Prisma error:', error)
    return Response.json(
        { error: 'Internal Server Error', details: error.message },
        { status: 500 }
        )
    }
}