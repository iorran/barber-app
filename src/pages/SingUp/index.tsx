import React, { useCallback, useRef } from 'react';
import {
    Image,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import logo from 'assets/logo.png';
import Button from 'components/Button';
import Input from 'components/Input';
import getValidationErrors from 'utils/getValidationErrors';
import * as Yup from 'yup';

import {
    Container,
    Title,
    ForgotPassword,
    ForgotPasswordText,
    BackToSignIn,
    BackToSignInText,
} from './styles';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SingUp: React.FC = () => {
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const handleSingUp = useCallback(
        async ({ name, email, password }: SignUpFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome Obrigatório'),
                    email: Yup.string()
                        .required('Email Obrigatório')
                        .email('Digite um email válido'),
                    password: Yup.string().min(6, 'No mínimo 6 digitos'),
                });
                await schema.validate(
                    { name, email, password },
                    {
                        abortEarly: false,
                    },
                );

                // await createUser({ variables: { name, email, password } });
            } catch (error) {
                if (error instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(error);
                    formRef.current?.setErrors(errors);
                } else {
                    Alert.alert(
                        'Ooops! Algo aconteceu.',
                        'Estou com dificuldades para processar o seu pedido. Poderia tentar novamente?',
                    );
                }
            }
        },
        [],
    );

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
                            <Title>Crie sua conta</Title>
                        </View>
                        <Form ref={formRef} onSubmit={handleSingUp}>
                            <Input
                                autoCapitalize="words"
                                name="name"
                                icon="user"
                                placeholder="Nome"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    emailInputRef.current?.focus();
                                }}
                            />
                            <Input
                                ref={emailInputRef}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus();
                                }}
                            />
                            <Input
                                ref={passwordInputRef}
                                secureTextEntry
                                name="senha"
                                icon="lock"
                                placeholder="Senha"
                                textContentType="newPassword"
                                returnKeyType="send"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm();
                                }}
                            />
                            <Button
                                onPress={() => {
                                    formRef.current?.submitForm();
                                }}
                            >
                                Entrar
                            </Button>
                        </Form>

                        <ForgotPassword onPress={() => console.log(1)}>
                            <ForgotPasswordText>
                                Esqueci minha senha
                            </ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            <BackToSignIn
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <Icon name="log-in" size={20} color="#ff9000" />
                <BackToSignInText>Voltar para logon</BackToSignInText>
            </BackToSignIn>
        </>
    );
};

export default SingUp;
