import {View, Text, StyleSheet} from "react-native";
import {Resume} from "../model/types";
import {Colors} from "../../../shared/lib/theme";

interface ResumeCardProps {
    resume: Resume;
}

export const ResumeCard = ({resume}: ResumeCardProps) => {
    const updatedAt = new Date(resume.updated_at).toLocaleDateString();

    return (
        <View style={styles.card} key={resume.id}>
            <Text style={styles.title}>{resume.title}</Text>
            <Text style={styles.date}>Обновлено {updatedAt}</Text>
            <Text style={styles.desc}>{resume.about}</Text>
            <View style={styles.stats}>
                <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                        <Text style={styles.statVal}>{resume.appearances_count}</Text>
                        <Text style={styles.statValText}>показы</Text>
                    </View>
                </View>
                <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                        <Text style={styles.statVal}>{resume.views_count}</Text>
                        <Text style={styles.statValText}>просмотры</Text>
                    </View>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    card: {backgroundColor: Colors.white, borderRadius: 20, padding: 20, marginBottom: 16},
    title: {fontSize: 18, fontWeight: 'bold'},
    date: {fontSize: 12, color: Colors.textSecondary, marginVertical: 4},
    desc: {fontSize: 13, color: Colors.textMain, marginBottom: 15},
    stats: {flexDirection: 'row', justifyContent: 'space-between'},
    statsRow: {flexDirection: 'column', justifyContent: 'space-between'},
    statBox: {alignItems: 'flex-start'},
    statVal: {fontSize: 14, color: Colors.textMain},
    statValText: {fontSize: 12, color: Colors.textMain},
});
