
export function slugToTitle(slug: string) {
    return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export function fileNameToSlug(fileName: string) {
    return fileName.replace(/\.md$/, '');
}
