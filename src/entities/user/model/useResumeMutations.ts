import {useEffect, useState} from 'react';
import { Alert } from 'react-native';
import { userApi } from '../api/userApi';
import { Resume } from './types';
import { SkillTag } from '../../../shared/enums/SkillTag';

export const useResumeMutations = (initialData?: Resume | null, profileId?: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
    const [selectedSkills, setSelectedSkills] = useState<SkillTag[]>([]);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setAbout(initialData.about || '');
            setSelectedSkills((initialData.skills as SkillTag[]) || []);
        }
    }, [initialData]);

    const toggleSkill = (skill: SkillTag) => {
        setSelectedSkills(prev =>
            prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
        );
    };

    const handleSave = async (onSuccess: () => void) => {
        if (!title.trim()) {
            Alert.alert('Ошибка', 'Укажите желаемую должность');
            return;
        }
        if (!profileId) return;

        setIsLoading(true);
        const { error } = await userApi.saveResume({
            id: initialData?.id,
            user_id: profileId,
            title,
            about,
            skills: selectedSkills,
        });


        setIsLoading(false);

        if (error) {
            Alert.alert('Ошибка', error.message);
        } else {
            Alert.alert('Успех', 'Резюме сохранено');
            onSuccess();
        }
    };

    const handleDelete = async (onSuccess: () => void) => {
        if (!initialData?.id) return;

        Alert.alert("Удаление", "Вы уверены?", [
            { text: "Отмена", style: "cancel" },
            {
                text: "Удалить",
                style: "destructive",
                onPress: async () => {
                    setIsLoading(true);
                    const { error } = await userApi.deleteResume(initialData.id);
                    setIsLoading(false);
                    if (!error) onSuccess();
                    else Alert.alert("Ошибка", error.message);
                }
            }
        ]);
    };

    return {
        title, setTitle,
        about, setAbout,
        selectedSkills, toggleSkill,
        isLoading, handleSave, handleDelete
    };
};
