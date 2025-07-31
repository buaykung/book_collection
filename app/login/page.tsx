'use client'

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, Card, message} from 'antd';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hook/redux';
import { clearError, loginUser } from '../store/authSlice';
import { useRouter } from 'next/navigation';

interface LoginFormData {
    username: string;
    password: string;
}

export default function LoginPage() {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { isLoading, error } = useAppSelector((state) => state.auth);

    const onFinish = async (values: LoginFormData) => {

        try {
            const result = await dispatch(loginUser(values));
            
            if (loginUser.fulfilled.match(result)) {
                message.success('Login successful!');
                router.push('/books');
            }
        } catch (err) {
            message.error('Login failed');
        }
    };

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    return (
        <div className='min-h-screen flex items-center justify-center'>  
            <Card
            className='w-full max-w-md shadow-2xl'
            title={
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                    คลังหนังสือ 📖
                    </h1>
                </div>
            }
            >
                <Form
                form={form}
                className='self-center'
                name="login"
                layout="vertical"
                size="large"
                initialValues={{ remember: true }}
                style={{ maxWidth: 360 }}
                onFinish={onFinish}
                >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Flex justify="space-between" align="center">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    </Flex>
                </Form.Item>

                <Form.Item>
                    <Button 
                        block type="primary" 
                        htmlType="submit"
                        loading={isLoading}
                    >
                    Log in
                    </Button>
                </Form.Item>
                or <a href="/register">Register now!</a>
                </Form>
            </Card>
        </div>
    );
};

