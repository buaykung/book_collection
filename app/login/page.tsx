
'use client'

import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, Card} from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const onFinish = async (values: {username: string; password: string}) => {
        setLoading(true);
        setTimeout(()=>{
            if(values.username && values.password){
                sessionStorage.setItem('username', values.username);
                sessionStorage.setItem('isLoggedIn', 'ture')
                router.push('/books')
            }
            setLoading(false);
        },300)
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

