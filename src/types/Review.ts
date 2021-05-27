import User from './User'

interface Review {
    comments: Array<string>,
    comments_count: number,
    content: string,
    created_user: User,
    created_at: Date,
    dislike_users: Array<string>,
    dislikes_count: number,
    id: number,
    like_users: Array<string>,
    likes_count: number,
    movie: number,
    rank: number,
}

export default Review