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
        <div className="h-screen flex font-['Athiti']">
            {/* Fixed Left Panel - Pink Background */}
            <div className="w-1/2 bg-pink-400 p-8 text-white overflow-y-auto">
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
            <div className="flex-1 bg-gray-50 overflow-y-auto">
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

                            <Form.Item label="รายงานผลการดำเนินงาน">
                                <div className="flex items-center gap-4 mb-2">
                                    <Radio.Group onChange={handleTypeChange} defaultValue="file" size="small">
                                        <Radio value="file">แนบไฟล์</Radio>
                                        <Radio value="text">แนบลิ้งค์</Radio>
                                    </Radio.Group>
                                </div>
                                <div className='w-full border-2 border rounded-lg flex items-center bg-white'>
                                    {inputType === 'file' ? (
                                        <Upload {...uploadProps}>
                                            <div className="justify-between cursor-pointer transition-colors">
                                                <span className="w-full rounded-l-lg bg-teal-100 p-3 flex items-center font-medium">เลือกไฟล์</span>
                                                {selectedFile ? (
                                                    <span className="text-gray-700">{selectedFile.name}</span>
                                                ) : (
                                                    <span className="text-gray-400">ไม่มีไฟล์ที่เลือก</span>
                                                )}
                                            </div>
                                        </Upload>
                                        
                                    ) : (
                                        <Input
                                            type={inputType === 'file' ? 'file' : 'text'}
                                            placeholder={inputType === 'file' ? 'ไฟล์ pdf ขนากไม่เกิน 10 mb' : 'วางลิ้งค์ที่นี่'}
                                            size="large"
                                            className="rounded-none border-2 border-gray-300"
                                        />
                                    )}
                                </div>

                                
                            </Form.Item>

                            <Form.Item label="หนังสือนำส่ง">
                                <div className="flex items-center gap-4 mb-2">
                                    <Radio.Group defaultValue="file" size="small">
                                        <Radio value="file">แนบไฟล์</Radio>
                                        <Radio value="text">แนบลิ้งค์</Radio>
                                    </Radio.Group>
                                </div>
                                <Input
                                    placeholder="ชื่อ-นามสกุล ระดับชั้น โรงเรียน"
                                    size="large"
                                    className="rounded-none border-2 border-gray-300"
                                />
                            </Form.Item>

                            {/* ผู้ประสานงาน */}
                            <Form.Item label="ผู้ประสานงาน">
                                <div className="border-2 border-dashed border-gray-400 p-4 space-y-3">
                                    <div>
                                        <label className="block text-sm mb-1">ชื่อ - นามสกุล</label>
                                        <Input
                                            placeholder="ชื่อ-นามสกุล"
                                            className="rounded-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-1">ตำแหน่ง</label>
                                        <Input
                                            placeholder="ตำแหน่ง"
                                            className="rounded-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-1">เบอร์โทร</label>
                                        <Input
                                            placeholder="เบอร์โทร"
                                            className="rounded-none"
                                        />
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