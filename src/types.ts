interface HeadProps {
    title: string;
    description?: string;
}


interface PostProps {
    layout: string,
    title: string,
    created_date: Date,
    last_updated_date: Date,
    author: string,
    image: {
        src: string,
        alt: string
    }
    description: string,
    draft: boolean,
    category: string,
}
