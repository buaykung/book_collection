'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { 
  Table, 
  Button, 
  Space, 
  Card, 
  Popconfirm,
  Typography, 
  message,
  Avatar
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Book } from "../types/book";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

const { Title } = Typography;

export default function Books(){
    const [books, setBooks] = useState<Book[]>([]);
    const [username, setUsername] = useState('');
    const router = useRouter();
    const auth = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        
        const isLoggedIn = auth?.isAuthenticated;
        const storedUsername = sessionStorage.getItem('username');
        
        if (!isLoggedIn) {
            router.push('/login');
            return;
        }
        
        setUsername(storedUsername || '');
        
        // โหลดข้อมูลหนังสือ
        const savedBooks = localStorage.getItem('books');
        if (savedBooks) {
            setBooks(JSON.parse(savedBooks));
        }
        
    }, [router]);

    const handleDelete = (id: number) => {
        const updatedBooks = books.filter(book => book.id !== id);
        setBooks(updatedBooks);
        localStorage.setItem('books', JSON.stringify(updatedBooks));
        message.success('ลบหนังสือสำเร็จ!');
    };

    const handleLogout = () => {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('username');
        message.success('ออกจากระบบสำเร็จ!');
        router.push('/login');
    };

    const columns = [
        {
            title: 'ชื่อหนังสือ',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'ผู้แต่ง',
            dataIndex: 'author',
            key: 'author'
        },
        {
            title: 'จัดการ',
            key: 'action',
            render:(_: any, record: Book) => (
                <Space size='small'>
                    <Button
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => router.push(`/books/edit/${record.id}`)}
                        className="!bg-white hover:!bg-yellow-500 !border-yellow-500 !text-yellow-500 hover:!text-white"
                    >
                        แก้ไข
                    </Button>
                    <Popconfirm
                        title="ยืนยันการลบ"
                        description="คุณแน่ใจหรือไม่ที่จะลบหนังสือนี้?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="ใช่"
                        cancelText="ไม่"
                        okButtonProps={{ className: 'bg-red-500 hover:bg-red-600' }}
                    >
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            size="small"
                        >
                        ลบ
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
        
    ];

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <Card className="mb-6 shadow-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <Avatar 
                            className="!bg-blue-500 !mr-2"
                            size="large" 
                            icon={<UserOutlined />} 
                        />
                        <div>
                            <Title level={3} className="!mb-0">
                            คลังหนังสือ 📖
                            </Title>
                            <p className="!text-gray-600 !mb-0">
                            สวัสดี, {username}
                            </p>
                        </div>
                    </div>
                    <Button
                        danger
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                    >
                    ออกจากระบบ
                    </Button>
                </div>
                </Card>

                {/* Main Content */}
                <Card className="shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <Title level={4} className="!mb-0">
                    รายการหนังสือทั้งหมด ({books.length} เล่ม)
                    </Title>
                    <Button
                        color="green"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => router.push('/books/add')}
                        className="bg-green-500 hover:bg-green-600 border-green-500 text-white"
                    >
                    เพิ่มหนังสือใหม่
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={books}
                    rowKey="id"
                    pagination={{
                    showSizeChanger: true,
                    showQuickJumper: false,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} จาก ${total} รายการ`,
                    }}
                    locale={{
                    emptyText: (
                        <div className="py-8">
                        <div className="text-gray-400 text-lg mb-2">📚</div>
                        <div className="text-gray-500">ยังไม่มีหนังสือในระบบ</div>
                        <Button
                            type="link"
                            onClick={() => router.push('/books/add')}
                        >
                            เพิ่มหนังสือเล่มแรก
                        </Button>
                        </div>
                    ),
                    }}
                    className="bg-white rounded-lg"
                />
                </Card>
            </div>
        </div>
    )
    
}