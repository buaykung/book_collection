'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Form, Input, Button, Card, Typography, message, Spin } from 'antd';
import { ArrowLeftOutlined, SaveOutlined, BookOutlined } from '@ant-design/icons';
import { Book } from '@/app/types/book';

const { Title } = Typography;

export default function EditBookPage() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [book, setBook] = useState<Book | null>(null);
    const router = useRouter();
    const params = useParams();
    const bookId = parseInt(params.id as string);

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            router.push('/login');
            return;
        }

        const savedBooks = JSON.parse(localStorage.getItem('books') || '[]');
        const foundBook = savedBooks.find((b: Book) => b.id === bookId);

        if (foundBook) {
            setBook(foundBook);
            form.setFieldsValue({
                title: foundBook.title,
                author: foundBook.author,
            });
        } else {
            message.error('ไม่พบหนังสือที่ต้องการแก้ไข');
            router.push('/books');
        }

        setPageLoading(false);
    }, [router, bookId, form]);

    const onFinish = async (values: { title: string; author: string }) => {
        setLoading(true);

        const savedBooks = JSON.parse(localStorage.getItem('books') || '[]');
        const updatedBooks = savedBooks.map((b: Book) =>
            b.id === bookId
                ? { ...b, title: values.title, author: values.author }
                : b
        );

        localStorage.setItem('books', JSON.stringify(updatedBooks));
        message.success('แก้ไขหนังสือสำเร็จ!');
        router.push('/books');
        setLoading(false);
    };

    if (pageLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
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
                            ✏️ แก้ไขหนังสือ
                        </Title>
                    </div>
                </Card>

                {/* Form */}
                <Card className="shadow-sm">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        size="large"
                        className="space-y-4"
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
                                className="rounded-lg"
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
                                placeholder="กรอกชื่อผู้แต่ง"
                                className="rounded-lg"
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
                                    loading={loading}
                                    icon={<SaveOutlined />}
                                    size="large"
                                    className="flex-1 bg-blue-500 hover:bg-blue-600 border-blue-500"
                                >
                                    บันทึกการแก้ไข
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
}