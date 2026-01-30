import {View, Text, StyleSheet} from "react-native";

export const ResumeCard = ({ title, date, description, stats }: any) => (
    <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>Обновлено {date}</Text>
        <Text style={styles.desc}>{description}</Text>
        <View style={styles.statsRow}>
            {stats.map((s: any, i: number) => (
                <View key={i} style={styles.statBox}>
                    <Text style={styles.statVal}>{s.value}</Text>
                    <Text style={styles.statLabel}>{s.label}</Text>
                </View>
            ))}
        </View>
    </View>
);

const styles = StyleSheet.create({
    card: { backgroundColor: 'white', borderRadius: 20, padding: 20, marginBottom: 16 },
    title: { fontSize: 18, fontWeight: 'bold' },
    date: { fontSize: 12, color: '#BBB', marginVertical: 4 },
    desc: { fontSize: 13, color: '#666', marginBottom: 15 },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
    statBox: { alignItems: 'flex-start' },
    statVal: { fontSize: 16, fontWeight: 'bold' },
    statLabel: { fontSize: 10, color: '#999' },
});
