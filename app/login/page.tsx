
'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Card, message, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { LoginRequest } from '../types/auth';

export default function LoginPage() {
    const { login, isLoading, isAuthenticated, error, clearError } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/books');
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        return () => {
            clearError();
        };
    }, [clearError]);

    const handleLogin = async (values: LoginRequest) => {
        try {
            await login(values);
            message.success('เข้าสู่ระบบสำเร็จ!');
        } catch (error) {
        }
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
                {error && (
                    <Alert
                        message={error}
                        type="error"
                        closable
                        onClose={clearError}
                        className="mb-4"
                    />
                )}

                <Form
                className='self-center'
                name="login"
                layout="vertical"
                size="large"
                initialValues={{ remember: true }}
                style={{ maxWidth: 360 }}
                onFinish={handleLogin}
                >
                    <Form.Item
                        name="username"
                        label="ชื่อผู้ใช้"
                        rules={[{ required: true, message: 'กรุณากรอกชื่อผู้ใช้!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="กรอกชื่อผู้ใช้" />
                    </Form.Item>
                    
                    <Form.Item
                        name="password"
                        label="รหัสผ่าน"
                        rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน!' }]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="กรอกรหัสผ่าน" />
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" 
                        htmlType="submit"
                        loading={isLoading}>
                        เข้าสู่ระบบ
                        </Button>
                    </Form.Item>
                    <div className="text-center">
                        <Button
                            type="link"
                            onClick={() => router.push('/register')}
                        >
                            ยังไม่มีบัญชี? สมัครสมาชิก
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

