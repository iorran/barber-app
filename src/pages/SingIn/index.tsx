import React from 'react';
import {
    Image,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import logo from 'assets/logo.png';
import Button from 'components/Button';
import Input from 'components/Input';

import {
    Container,
    Title,
    ForgotPassword,
    ForgotPasswordText,
    CreateAccountButton,
    CreateAccountButtonText,
} from './styles';

const SingIn: React.FC = () => {
    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flex: 1 }}
                >
                    <Container>
                        <Image source={logo} />
                        <View>
                            <Title>Faça seu logon</Title>
                        </View>

                        <Input name="email" icon="mail" placeholder="" />
                        <Input name="senha" icon="lock" placeholder="" />

                        <Button
                            onPress={() => {
                                console.log(1);
                            }}
                        >
                            Entrar
                        </Button>

                        <ForgotPassword onPress={() => console.log(1)}>
                            <ForgotPasswordText>
                                Esqueci minha senha
                            </ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            <CreateAccountButton onPress={() => console.log(1)}>
                <Icon name="log-in" size={20} color="#ff9000" />
                <CreateAccountButtonText>
                    Esqueci minha senha
                </CreateAccountButtonText>
            </CreateAccountButton>
        </>
    );
};

export default SingIn;
