import { NavigationContainer, navigationContainer } from '@react-navigation/native';
import { createNativeStackNavigation } from '@react-navigation/native-stack';
import WelcomeScreen from './WelcomeScreen';
import NameScreen from './NameScreen';
import ServiceScreen from './ServiceScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';

const Stack = createNativeStackNavigation();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" />
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Name" component={NameScreen} />
                <Stack.Screen name="Service" component={ServiceScreen} />
                <Stack.Screen name="Schedule" component={ScheduleScreen} />
                <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
        </NavigationContainer>
    );
}
