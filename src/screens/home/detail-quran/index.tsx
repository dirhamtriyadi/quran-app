import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

function DetailQuran({ route, navigation }: any) {
    const { chapter, name, arabicname } = route.params;

    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const getDetailQuran = async () => {
        try {
            const responseAr = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quransimple/${chapter}.json`);
            setData(responseAr.data.chapter);
            console.log(responseAr.data.chapter);

            const responseInd = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ind-indonesianislam/${chapter}.json`);
            const dataTemp = responseInd.data.chapter.map((item: any, index: number) => {
                return {
                    textId: item.text,
                }
            });

            setData((prevData) => {
                return prevData.map((item, index) => {
                    return {
                        ...item,
                        ...dataTemp[index]
                    }
                });
            });
            console.log(responseInd.data.chapter);

            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getDetailQuran();

    }, []);

    const style = StyleSheet.create({
        container: {
            display: 'flex',
        },
        containerJudul: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            padding: 10,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
        },
        containerJudulText: {
            fontSize: 25,
            fontStyle: 'italic',
        },
        containerLoading: {
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        containerSurah: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'white',
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            padding: 20,
            gap: 12
        },
        containerText: {
            flex: 1,
            flexDirection: 'column',
            textAlign: 'right',
            gap: 5,
        },
        text: {
            fontSize: 25,
        },
        textId: {
            fontSize: 15,
        }
    })

    return (
        <View style={style.container}>
            <View style={style.containerJudul}>
                <Text style={style.containerJudulText}>{name}</Text>
                <Text style={style.containerJudulText}>{arabicname}</Text>
            </View>
            {loading ? (
                <View style={style.containerLoading}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <ScrollView>
                    {data.map((item: any) => (
                        <View key={item.verse} style={style.containerSurah}>
                            <Text>{item.verse}</Text>
                            <View style={style.containerText}>
                                <Text style={style.text}>{item.text}</Text>
                                <Text style={style.textId}>{item.textId}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );

}

export default DetailQuran;