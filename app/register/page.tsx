'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Card, message, Alert, Select } from 'antd';
import { UserOutlined, LockOutlined, CrownOutlined, EditOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { RegisterRequest, UserRole } from '../types/auth';

const { Option } = Select;

export default function RegisterPage() {
  const { register, isLoading, isAuthenticated, error, clearError } = useAuth();
  const router = useRouter();
  const [showRoleWarning, setShowRoleWarning] = useState(false);

  // ✅ Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/books');
    }
  }, [isAuthenticated, router]);

  // 🧹 Clear error on unmount
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  // 📝 Handle Register Submit
  const handleRegister = async (values: RegisterRequest & { name: string }) => {
    // ✅ Check password confirmation
    if (values.password !== values.confirmPassword) {
      message.error('รหัสผ่านไม่ตรงกัน!');
      return;
    }

    try {
      await register({
        username: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
        name: values.name || values.username,
      });
      message.success('สมัครสมาชิกสำเร็จ!');
    } catch (error) {
      // Error handled by Redux
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
      <Card 
        className="w-full max-w-md shadow-2xl"
        title={
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              📝 สมัครสมาชิก
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

        {/* Register Form */}
        <Form
          onFinish={handleRegister}
          layout="vertical"
          size="large"
          initialValues={{ role: UserRole.AUTHOR }}
        >
          <Form.Item
            name="username"
            label="ชื่อผู้ใช้"
            rules={[
              { required: true, message: 'กรุณากรอกชื่อผู้ใช้!' },
              { min: 3, message: 'ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="กรอกชื่อผู้ใช้"
            />
          </Form.Item>

          <Form.Item
            name="name"
            label="ชื่อ"
            rules={[
              { required: true, message: 'กรุณากรอกชื่อที่แสดง!' },
              { min: 2, message: 'ชื่อที่แสดงต้องมีอย่างน้อย 2 ตัวอักษร!' }
            ]}
          >
            <Input 
              prefix={<EditOutlined />} 
              placeholder="กรอกชื่อที่แสดง"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="รหัสผ่าน"
            rules={[
              { required: true, message: 'กรุณากรอกรหัสผ่าน!' },
              { min: 6, message: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="กรอกรหัสผ่าน"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="ยืนยันรหัสผ่าน"
            rules={[
              { required: true, message: 'กรุณายืนยันรหัสผ่าน!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="ยืนยันรหัสผ่าน"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="w-full h-12 text-lg font-medium"
              style={{ backgroundColor: '#10b981', borderColor: '#10b981' }}
            >
              สมัครสมาชิก
            </Button>
          </Form.Item>

          <div className="text-center">
            <Button 
              type="link" 
              onClick={() => router.push('/login')}
            >
              มีบัญชีแล้ว? เข้าสู่ระบบ
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}