import { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../reducers/store";

function Screen1({ navigation }: any) {
    const events = useSelector((state: any) => state.events);
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        dispatch(fetchEvents());
        const intervalId = setInterval(() => {
            dispatch(fetchEvents());
        }, 60000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        let refreshIntervalId = setInterval(() => {
            handleRefresh();
        }, 15000);
        return () => clearInterval(refreshIntervalId);
    }, [refresh]);

    const handleRefresh = async () => {
        setRefresh(true);
        dispatch(fetchEvents());
        setRefresh(false);
    };

    const separator = () => {
        return <View style={styles.separatorStyle} />;
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={events}
                ItemSeparatorComponent={separator}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() =>
                        navigation.navigate("Screen2", {
                            eventId: item.id,
                        }
                        )}>
                        <View style={styles.flatListStyle}>
                            <Image resizeMode="contain" style={styles.imageBox} source={{ uri: item.actor.avatar_url }} />
                            <Text style={styles.loginStyle}>{item.actor.login}</Text>
                            <Text style={styles.repoNameStyle}>{item.repo.name != null ? item.repo.name : item.actor.login}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                onRefresh={handleRefresh}
                refreshing={refresh}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    separatorStyle: {
        height: 1,
        width: '100%',
        backgroundColor: '#dde5ec'
    },
    flatListStyle: {
        flexDirection: "column",
        padding: 10,
        alignItems: "center",
    },
    imageBox: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    loginStyle: {
        fontSize: 16,
        marginLeft: 10,
        fontWeight: "600"
    },
    repoNameStyle: {
        fontSize: 12,
        marginLeft: 10,
    },
});

export default Screen1;