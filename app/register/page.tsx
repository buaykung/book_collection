'use client';
import { Form, Input, Button, Card, message, Space } from 'antd';
import { UserOutlined, ContactsOutlined, LockOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../hook/redux';
import { useRouter } from 'next/navigation';
import { registerUser, clearError } from '../store/authSlice';
import { useEffect } from 'react';

interface RegisterFormData {
    username: string;
    password: string;
    confirmPassword: string;
    name: string;
}

export default function RegisterPage() {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { isLoading, error } = useAppSelector((state) => state.auth);

    const onFinish = async (values: RegisterFormData) => {
        try {
            const { confirmPassword, ...userData } = values;
            const result = await dispatch(registerUser(userData));
            
            if (registerUser.fulfilled.match(result)) {
                message.success('Registration successful!');
                router.push('/books');
            }
        } catch (err) {
            message.error('Registration failed');
        }
    };

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    return (
         <div className="min-h-screen flex items-center justify-center py-12 px-4">
            <Card 
                title="สมัครใช้งาน" 
                className="w-full max-w-md shadow-lg"
                styles={{
                    header: {
                        textAlign: 'center', 
                        fontSize: '24px', 
                        fontWeight: 'bold'
                    }
                }}
            >
                <Form
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        name="name"
                        rules={[
                            { required: true, message: 'กรุณากรอกชื่อหรือนามแฝง' },
                            { min: 2, message: 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร!' },
                            { max: 50, message: 'ชื่อต้องห้ามเกิน 50 ตัวอักษร!' }
                        ]}
                    >
                        <Input 
                            prefix={<ContactsOutlined />} 
                            placeholder="ชื่อหรือนามแฝง"
                            className="rounded-lg"
                        />
                    </Form.Item>

                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: 'กรุณากรอกชื่อผู้ใช้!' },
                            { min: 3, message: 'ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร!' },
                            { max: 20, message: 'ชื่อผู้ใช้ต้องไม่เกิน 20 ตัวอักษร!' },
                            { 
                                pattern: /^[a-zA-Z0-9]+$/, 
                                message: 'ชื่อผู้ใช้สามารถใช้ได้เฉพาะตัวอักษรภาษาอังกฤษ และ ตัวเลขเท่านั้น!' 
                            }
                        ]}
                    >
                        <Input 
                            prefix={<UserOutlined />} 
                            placeholder="ชื่อผู้ใช้"
                            className="rounded-lg"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'กรุณากรอกรหัสผ่าน!' },
                            { min: 6, message: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร!' },
                            { max: 50, message: 'รหัสผ่านต้องไม่เกิน 50 ตัวอักษร!' }
                        ]}
                    >
                        <Input.Password 
                            prefix={<LockOutlined />} 
                            placeholder="รหัสผ่าน"
                            className="rounded-lg"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'โปรดยืนยันรหัสผ่าน!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('รหัสผ่านไม่ตรงกัน!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password 
                            prefix={<LockOutlined />} 
                            placeholder="ยืนยันรหัสผ่าน"
                            className="rounded-lg"
                        />
                    </Form.Item>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}

                    <Form.Item>
                        <Space direction="vertical" className="w-full">
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                loading={isLoading}
                                className="w-full h-12 rounded-lg bg-blue-600 hover:bg-blue-700"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating Account...' : 'Register'}
                            </Button>
                            
                            <div className="text-center">
                                <span className="text-gray-600">Already have an account? </span>
                                <Button 
                                    type="link" 
                                    onClick={() => router.push('/login')}
                                    className="p-0 h-auto text-blue-600 hover:text-blue-700"
                                    disabled={isLoading}
                                >
                                    Sign in
                                </Button>
                            </div>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

