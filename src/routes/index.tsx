import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "../screens/home";
import SettingsScreen from "../screens/setting";

const Tab = createBottomTabNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="home" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                            tabBarLabel: 'Settings',
                            tabBarIcon: ({ color, size }) => (
                                <Icon name="cog" color={color} size={size} />
                            ),
                        }} 
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Routes;