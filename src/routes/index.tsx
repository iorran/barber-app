import React from 'react';

import SignIn from '@pages/SingIn';
import SingUp from '@pages/SingUp';
import { createStackNavigator } from '@react-navigation/stack';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
    <Auth.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: '#312e38',
            },
        }}
    >
        <Auth.Screen name="SignIn" component={SignIn} />
        <Auth.Screen name="SingUp" component={SingUp} />
    </Auth.Navigator>
);

export default AuthRoutes;
