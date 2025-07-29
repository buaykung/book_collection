
'use client'

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, Card} from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const dispatch = useDispatch();
    const router = useRouter();

    const onFinish = async (values: {username: string; password: string}) => {

        const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({username: values.username, password: values.password})
        });
        const data = await res.json();

        dispatch(loginSuccess(data));
        router.push('/books')
    };

    return (
        <div className='min-h-screen flex items-center justify-center'>  
            <Card
            className='w-full max-w-md shadow-2xl '
            title={
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                    คลังหนังสือ 📖
                    </h1>
                </div>
            }
            >
                <Form
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
                    <Button block type="primary" htmlType="submit">
                    Log in
                    </Button>
                </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

