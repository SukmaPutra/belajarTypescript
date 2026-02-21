export const HOBBY_OPTIONS = [
    "Design",
    "Technology", 
    "Photography", 
    "Travel", 
    "Music", 
    "Gaming", 
    "Art", 
    "Cooking",
    "Fitness",
    "Sports",
    "Reading",
    "Writing",
    "Fashion",
    "Film",
    "Nature",
    "Animals",
    "Another hobby",
] as const;

export type Hobby = typeof HOBBY_OPTIONS[number];
