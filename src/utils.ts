export function formatDate(date: Date) {
    return new Date(date).toLocaleDateString("en-US", { timeZone: "UTC" });
}

export function formatBlogPosts(posts: any,
    { filterOutDrafts = true,
        filterOutFuturePosts = true,
        sortByDate = true,
        limit = undefined } = {}) {
    const filteredPosts = posts.reduce((acc: any, post: any) => {
        console.log(post.props);
        const { created_date, last_updated_date, draft } = post.frontmatter;
        // const { created_date, last_updated_date, draft } = post;

        // filterOutDrafts
        if (filterOutDrafts && draft) return acc;

        // filterOutFuturePosts
        if (filterOutFuturePosts && new Date(last_updated_date) > new Date()) return acc;

        // Add post to accumulator
        acc.push(post)

        return acc;
    }, [])

    // sortByDate or randomize
    if (sortByDate) {
        filteredPosts.sort((a: any, b: any) => {
            let b_date = new Date(b.frontmatter.last_updated_date);
            let a_date = new Date(a.frontmatter.last_updated_date);
            return b_date.getTime() - a_date.getTime()
        })
    }

    // limit if number is passed
    if (typeof limit === "number") {
        return filteredPosts.slice(0, limit);
    }
    else {
        return filteredPosts;
    }

}