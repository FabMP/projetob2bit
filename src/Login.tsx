import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import logo from './assets/b2bitlogo.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Endereço de email inválido').required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório'),
});

const Login = () => {

    interface FormValues {
        email: string;
        password: string;
    }

    const navigate = useNavigate();

    const [loginError, setLoginError] = useState('');

    const handleLogin = async (values: FormValues) => {

        try {
            const response = await fetch('https://api.homologation.cliqdrive.com.br/auth/login/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json;version=v1_web',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

            if (response.ok) {
                const data = await response.json();
                window.localStorage.setItem('jwt', data.tokens.access);
                navigate('/home');
            } else {
                setLoginError('E-mail ou senha incorretos')
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);

        }
    };


    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
        >
            {({ errors, touched }) => (
                <Form>
                    <div className="flex justify-center items-center min-h-screen">
                        <div id="login" className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl rounded-2xl">
                            <div className="flex justify-center" id='logo'>
                                <img src={logo} alt="Logotipo da B2bit" />
                            </div>
                            <div>
                                <div className='campoinput'>
                                    <label htmlFor="email" className="font-bold"><p>E-mail</p></label>
                                    <Field name="email" type="email" placeholder='@gmail.com' />
                                    {errors.email && touched.email ? <div><p className='text-red-600 text-sm'>{errors.email}</p></div> : null}
                                </div>
                                <div className='campoinput'>
                                    <label htmlFor="password" className='font-bold'><p>Password</p></label>
                                    <Field name="password" type="password" className='font-black' placeholder='****************' />
                                    {errors.password && touched.password ? <div><p className='text-red-600 text-sm'>{errors.password}</p></div> : null}
                                    {loginError && <div className='text-red-600 text-sm'><p>{loginError}</p></div>}
                                </div>
                                <div className="flex justify-center">
                                    <button id='sign-in' type="submit" className='font-bold'><p>Sign in</p></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default Login;
