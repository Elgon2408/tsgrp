
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchEvents, pauseEventsUpdate, resumeEventsUpdate } from "../reducers/actions";

const Screen1 = ({ navigation }: any) => {
    const currentTime = new Date().getTime();
    const [lastUpdate, setLastUpdate] = useState(0);
    const events = useSelector((state: any) => state.events.events);
    const isEventsUpdatePaused = useSelector((state: any) => state.events.isEventsUpdatePaused);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchEvents());
        const interval = setInterval(() => {
            if (!isEventsUpdatePaused) {
                dispatch(fetchEvents());
                setLastUpdate(new Date().getTime());
            }
        }, 60000);
        return () => clearInterval(interval);
    }, [dispatch, isEventsUpdatePaused]);

    const onEventPress = (event: any) => {
        navigation.navigate('Screen2', { event });
        dispatch(pauseEventsUpdate());
    };

    const onRefresh = () => {
        if (lastUpdate && currentTime - lastUpdate < 15000) {
            return;
        }
        dispatch(fetchEvents());
        setLastUpdate(currentTime);
    };

    return (
        <View>
            {lastUpdate && <Text>You can update the list in {Math.max(0, 15 - (currentTime - lastUpdate) / 1000)} seconds.</Text>}
            <FlatList
                data={events}
                onScroll={() => dispatch(pauseEventsUpdate())}
                onMomentumScrollEnd={() => dispatch(resumeEventsUpdate())}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onEventPress(item)}>
                        <View style={styles.flatListStyle}>
                            <Image resizeMode="contain" style={styles.imageBox} source={{ uri: item.actor.avatar_url }} />
                            <Text style={styles.loginStyle}>{item.actor.login}</Text>
                            <Text style={styles.repoNameStyle}>{item.repo.name != null ? item.repo.name : item.actor.login}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                onRefresh={onRefresh}
                refreshing={false}
                keyExtractor={item => item.id}
            />
        </View>
    );
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