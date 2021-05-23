interface Review {
    id: number,
    content: string,
    rank: number,
    created_at: Date,
    movie: number,
    create_user: number,
    like_users: Array<string>,
    dislike_users: Array<string>,
}

export default Review