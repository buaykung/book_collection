'use client'
import { Form, Input, Radio, Button, Upload, message } from 'antd'
import { useState } from 'react';

const { TextArea } = Input

export default function AwardRegisterPage() {
    const [form] = Form.useForm();
    const [inputType, setInputType] = useState('file');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const onFinish = (values: any) => {
        console.log('Form values:', values);
        // Handle form submission logic here
    };

    const handleTypeChange = (e: any) => {
        setInputType(e.target.value);
    };

    const handleFileSelect = (file: File) => {
        if (file.size > 10 * 1024 * 1024) {
        message.error('ไฟล์ต้องมีขนาดไม่เกิน 10MB!')
        return false
        }
        
        if (file.type !== 'application/pdf') {
        message.error('กรุณาเลือกไฟล์ PDF เท่านั้น!')
        return false
        }

        setSelectedFile(file)
        return false // ป้องกันการ upload อัตโนมัติ
    }

    const uploadProps = {
        accept: '.pdf',
        maxCount: 1,
        beforeUpload: handleFileSelect,
        showUploadList: false, 
    }

    return(
        <div className="h-screen flex">
            {/* Fixed Left Panel - Pink Background */}
            <div className="w-70 flex-auto bg-pink-400 p-8 text-white overflow-y-auto">
                <div className="max-w-md">
                    <h1 className="text-2xl font-bold mb-6">
                        คุณสมบัติและเงื่อนไขการสมัครรับรางวัล
                    </h1>

                    <div className="space-y-4 text-sm leading-relaxed">
                        <div>
                            <p className="mb-2">
                                1. สำหรับนักเรียนโรงเรียนรัฐและเอกชนในเขตกรุงเทพมหานครและปริมณฑล
                                ที่กำลังศึกษาอยู่ในระดับชั้น ป.1 - ป.6 หรือ ม.1 - ม.6 เท่านั้น
                            </p>
                        </div>

                        <div>
                            <p className="mb-2">
                                2. ผลงานที่ส่งเข้าประกวดจะต้องเป็นผลงานที่สร้างสรรค์ขึ้นมาใหม่
                                และไม่เคยได้รับรางวัลจากการประกวดอื่นมาก่อน
                            </p>
                            <ul className="ml-4 space-y-1">
                                <li>• โรคหัวใจ</li>
                                <li>• โรคไต/ปัญหาเกี่ยวกับไต</li>
                                <li>• โรคทางระบบทางเดินหายใจ/ปอด</li>
                                <li>• การป้องกันการเกิดอุบัติเหตุ/ความปลอดภัย</li>
                                <li>• โรคและภัยสุขภาพอื่นๆ ที่เกิดขึ้นจากการใช้ชีวิตประจำวัน</li>
                            </ul>
                        </div>

                        <div>
                            <p className="mb-2">
                                3. ผลงานที่ส่งเข้าประกวดจะต้องเป็นผลงานที่สร้างสรรค์ขึ้นมาใหม่
                                และไม่เคยได้รับรางวัลจากการประกวดอื่นมาก่อน (ทั้งในประเทศและต่างประเทศ)
                            </p>
                        </div>

                        <div>
                            <p className="mb-2">
                                4. ผลงานที่ส่งเข้าประกวดจะต้องเป็นภาษาไทยเท่านั้น และจะต้องไม่มีเนื้อหา
                                ที่ขัดต่อศีลธรรม อันดีงาม กฎหมาย หรือความสงบเรียบร้อยของสังคม
                            </p>
                        </div>

                        <div>
                            <p className="mb-2">
                                5. ผลงานที่ส่งเข้าประกวดจะกลายเป็นกรรมสิทธิ์ของบริษัท
                                และบริษัทสามารถนำไปใช้ประโยชน์ได้
                            </p>
                        </div>

                        <div>
                            <p>
                                6. ผลงาน/โครงการที่ส่งเข้าประกวดจะไม่สามารถขอคืนได้
                                และจะถือเป็นสิทธิ์ของบริษัท
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrollable Right Panel - Form */}
            <div className="w-30 flex-auto bg-gray-50 overflow-y-auto">
                <div className="p-8">
                    <div className="max-w-lg mx-auto">
                        <h2 className="text-[30px] font-bold mb-2 text-right">
                            สมัครเข้าประกวดรางวัล
                        </h2>
                        <p className="text-base text-gray-600 text-right">
                            อำเภออุทุมพรพิสัย จังหวัดศรีสะเกษ
                        </p>
                        <p className="text-sm text-gray-600 text-right">
                            เขตสุขภาพที่ 10
                        </p>

                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            className="space-y-6"
                            requiredMark={false}
                        >
                            {/* ชื่อโครงการ */}
                            <Form.Item
                                label={
                                    <span className="text-sm font-semibold">
                                        ชื่อโครงการ <span className="text-red-500">*</span>
                                    </span>
                                }
                                name="projectName"
                                rules={[{ required: true, message: 'กรุณากรอกชื่อโครงการ' }]}

                            >
                                <Input
                                    placeholder="ชื่อโครงการ"
                                    size="large"
                                    className="rounded-none border-2 border-gray-300"
                                />
                            </Form.Item>

                            {/* Radio buttons for categories */}
                            <Form.Item
                                className='flex justify-center'
                                name="category"
                                rules={[{ required: true, message: 'กรุณาเลือกหมวดหมู่' }]}
                            >
                                <Radio.Group className="space-y-2">
                                    <div><Radio value="heart">โรคติดต่อ</Radio></div>
                                    <div><Radio value="kidney">โรคไม่ติดต่อ</Radio></div>
                                    <div><Radio value="respiratory">การป้องกันการบาดเจ็บและอุบัติเหตุถนน</Radio></div>
                                    <div><Radio value="accident">โรคจากการประกอบอาชีพและสิ่งแวดล้อม</Radio></div>
                                    <div><Radio value="other">อื่นๆ (ที่สอดคล้องกับภาระกิจกรมควบคุมโรค)</Radio></div>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item>
                                <div className="flex gap-4 mb-2">
                                    <span className='flex-1'>รายงานผลการดำเนินงาน</span>
                                    <Radio.Group className='flex-1 text-end' onChange={handleTypeChange} defaultValue="file" size="small">
                                        <Radio value="file">แนบไฟล์</Radio>
                                        <Radio value="text">แนบลิ้งค์</Radio>
                                    </Radio.Group>
                                </div>
                                <div className='w-full border-2 rounded-lg items-center bg-white'>
                                    {inputType === 'file' ? (
                                        <div className='grid grid-cols-7'>
                                            <Upload {...uploadProps} className='col-span-1'>
                                                <div className="cursor-pointer transition-colors">
                                                    <span className="w-full rounded-l-lg bg-teal-100 p-2 flex items-center font-medium">เลือกไฟล์</span>
                                                </div>
                                            </Upload>

                                            <div className="col-span-6 ml-1 flex items-center">
                                                <span className={selectedFile ? 'text-gray-800' : 'text-gray-400'}>
                                                {selectedFile ? selectedFile.name : 'ไฟล์ pdf ขนาดไม่เกิน 10mb'}
                                                </span>
                                            </div>
                                        </div>
                                        
                                    ) : (
                                        <Input
                                            type={inputType}
                                            placeholder='วางลิ้งค์ที่นี่'
                                            size="large"
                                            className="rounded-none border-2 border-gray-300"
                                        />
                                    )}
                                </div>
                            </Form.Item>

                            <Form.Item>
                                <div className="flex gap-4 mb-2">
                                    <span className='flex-1'>หนังสือนำส่ง</span>
                                    <Radio.Group className='flex-1 text-end' onChange={handleTypeChange} defaultValue="file" size="small">
                                        <Radio value="file">แนบไฟล์</Radio>
                                        <Radio value="text">แนบลิ้งค์</Radio>
                                    </Radio.Group>
                                </div>
                                <div className='w-full border-2 rounded-lg items-center bg-white'>
                                    {inputType === 'file' ? (
                                        <div className='grid grid-cols-7'>
                                            <Upload {...uploadProps} className='col-span-1'>
                                                <div className="cursor-pointer transition-colors">
                                                    <span className="w-full rounded-l-lg bg-teal-100 p-2 flex items-center font-medium">เลือกไฟล์</span>
                                                </div>
                                            </Upload>

                                            <div className="col-span-6 ml-1 flex items-center">
                                                <span className={selectedFile ? 'text-gray-800' : 'text-gray-400'}>
                                                {selectedFile ? selectedFile.name : 'ไฟล์ pdf ขนาดไม่เกิน 10mb'}
                                                </span>
                                            </div>
                                        </div>
                                        
                                    ) : (
                                        <Input
                                            type={inputType}
                                            placeholder='วางลิ้งค์ที่นี่'
                                            size="large"
                                            className="rounded-none border-2 border-gray-300"
                                        />
                                    )}
                                </div>
                            </Form.Item>

                            {/* ผู้ประสานงาน */}
                            <Form.Item label="ผู้ประสานงาน">
                                <div className='border-2 rounded-lg p-2 space-y-3'>
                                    <div className="border-2 border-dashed rounded-md p-2 space-y-3">
                                        <div>
                                            <label className="block text-sm mb-1">ชื่อ - นามสกุล</label>
                                            <Input
                                                placeholder="ชื่อ-นามสกุล"
                                                className="rounded-none border-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm mb-1">ตำแหน่ง</label>
                                            <Input
                                                placeholder="ตำแหน่ง"
                                                className="rounded-none border-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm mb-1">โทรศัพท์</label>
                                            <Input
                                                placeholder="โทรศัพท์"
                                                className="rounded-none border-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm mb-1">มือถือ</label>
                                            <Input
                                                placeholder="มือถือ"
                                                className="rounded-none border-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm mb-1">อีเมล</label>
                                            <Input
                                                placeholder="อีเมล"
                                                className="rounded-none border-2"
                                            />
                                        </div>
                                    </div>
                                    <div className='flex justify-center'>
                                        <Button
                                            className='border-2 border-black'
                                            shape="round"
                                        >
                                            <span className="text-sm mr-32 ml-32">เพิ่มผู้ประสานงาน</span>
                                        </Button>
                                    </div>
                                </div>
                            </Form.Item>

                            {/* Submit Button */}
                            <Form.Item className="pt-4">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="w-full bg-blue-500 hover:bg-blue-600 rounded-none"
                                >
                                    ส่งใบสมัคร
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}