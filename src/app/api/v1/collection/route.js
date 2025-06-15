import prisma from '@/libs/prisma'

export async function POST(request) {
  try {
    const { mal_id, user_email, anime_title, anime_image } = await request.json()

    const data = {
      mal_id: Number(mal_id),
      user_email,
      anime_title,
      anime_image
    }

    const collection = await prisma.Collections.create({ data })
    
    return Response.json(collection, { status: 200 })
    
  } catch (error) {
    console.error('Prisma error:', error)
    return Response.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    )
  }
}