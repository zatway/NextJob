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

export const validateAge = (birthDate: string): boolean => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age >= 16;
};
