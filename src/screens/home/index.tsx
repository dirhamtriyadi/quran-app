import { ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

function HomeScreen() {
    const navigation = useNavigation<any>();

    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/info.json')
            .then((response) => {
                setData(response.data.chapters);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const style = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 10
        },
        groupChapter: {
            flex: 1,
            flexDirection: 'row',
            gap: 10
        },
        listQuran: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
            margin: 5,
            backgroundColor: 'white',
            borderRadius: 5,
        }
    })

    return (
        <ScrollView>
            <View style={style.container}>
                {data.map((item) => (
                    <TouchableOpacity key={item.chapter} style={style.listQuran} onPress={() => {
                        navigation.navigate('DetailQuran', {
                            chapter: item.chapter,
                            name: item.name,
                            arabicname: item.arabicname
                        });
                    }}>
                        <View style={style.groupChapter}>
                            <Text>{item.chapter}</Text>
                            <Text>{item.name}</Text>
                        </View>
                        <View>
                            <Text>{item.arabicname}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

export default HomeScreen;