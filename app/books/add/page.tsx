'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { ArrowLeftOutlined, SaveOutlined, BookOutlined, UserOutlined } from '@ant-design/icons';
import { Book } from '@/app/types/book';

const { Title } = Typography;

export default function AddBookPage() {
    const [form] = Form.useForm();
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [router]);

    const onFinish = async (values: { title: string; author: string }) => {

        setTimeout(() => {
            const existingBooks = JSON.parse(localStorage.getItem('books') || '[]');
            const newBook: Book = {
                id: Date.now(),
                title: values.title,
                author: values.author,
                createdAt: new Date().toLocaleDateString('th-TH'),
            };

            const updatedBooks = [...existingBooks, newBook];
            localStorage.setItem('books', JSON.stringify(updatedBooks));

            message.success('เพิ่มหนังสือสำเร็จ!');
            router.push('/books');
        }, 300);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto">
                <Card className="mb-6 shadow-sm">
                    <div className="flex items-center space-x-4">
                        <Button
                            icon={<ArrowLeftOutlined />}
                            onClick={() => router.push('/books')}
                            className="flex items-center"
                        >
                            กลับ
                        </Button>
                        <Title level={3} className="mb-0">
                            📖 เพิ่มหนังสือใหม่
                        </Title>
                    </div>
                </Card>

                <Card className="shadow-sm">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        size="large"
                    >
                        <Form.Item
                            name="title"
                            label="ชื่อหนังสือ"
                            rules={[
                                { required: true, message: 'กรุณากรอกชื่อหนังสือ!' },
                                { min: 2, message: 'ชื่อหนังสือต้องมีอย่างน้อย 2 ตัวอักษร!' },
                            ]}
                        >
                            <Input
                                prefix={<BookOutlined />}
                                placeholder="กรอกชื่อหนังสือ"
                            />
                        </Form.Item>

                        <Form.Item
                            name="author"
                            label="ผู้แต่ง"
                            rules={[
                                { required: true, message: 'กรุณากรอกชื่อผู้แต่ง!' },
                                { min: 2, message: 'ชื่อผู้แต่งต้องมีอย่างน้อย 2 ตัวอักษร!' },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="กรอกชื่อผู้แต่ง"
                            />
                        </Form.Item>

                        <Form.Item className="mb-0 pt-4">
                            <div className="flex space-x-4">
                                <Button
                                    type="default"
                                    size="large"
                                    onClick={() => router.push('/books')}
                                    className="flex-1"
                                >
                                    ยกเลิก
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<SaveOutlined />}
                                    size="large"
                                >
                                    บันทึกหนังสือ
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
}