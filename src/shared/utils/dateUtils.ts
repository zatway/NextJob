export const getCreatedDate = (dateIso: string) => {
    const date = new Date(dateIso);
    if (date.getDate() === new Date().getDate()) {
        return "сегодня";
    }
    if (date.getDate() + 1 === new Date().getDate()) {
        return "вчера";
    }
    return date.toLocaleDateString();
}
