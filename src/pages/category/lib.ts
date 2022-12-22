export const getSubCategoryIdParam = () => {
    const searchParams = new URLSearchParams(document.location.search);
    const param = searchParams.get("sub-category");
    return (param !== null)
        ? Number(param)
        : undefined;
};