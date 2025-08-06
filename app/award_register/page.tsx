'use client'
import { Form, Input, Radio, Button, Card } from 'antd'

const { TextArea } = Input

export default function AwardRegisterPage() {
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        console.log('Form values:', values);
        // Handle form submission logic here
    };

    return(
        <div className="h-screen flex">
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
                        <h2 className="text-xl font-bold mb-2 text-right">
                            สมัครเข้าประกวดรางวัล
                        </h2>
                        <p className="text-sm text-gray-600 mb-6 text-right">
                            สำหรับผู้ที่มีอายุ 6-18 ปี จังหวัดกรุงเทพมหานคร
                            และปริมณฑล 10 จังหวัด
                        </p>

                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            className="space-y-6"
                        >
                            {/* ชื่อโครงการ */}
                            <Form.Item
                                label="ชื่อโครงการ"
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
                                    <div><Radio value="heart">โรคหัวใจ</Radio></div>
                                    <div><Radio value="kidney">โรคไต/ปัญหา</Radio></div>
                                    <div><Radio value="respiratory">การป้องกันการเกิดอุบัติเหตุ/ความปลอดภัย</Radio></div>
                                    <div><Radio value="accident">โรคทางระบบทางเดินหายใจ/ปอด</Radio></div>
                                    <div><Radio value="other">อื่นๆ (โรคและภัยสุขภาพอื่นๆ ที่เกิดขึ้นจากการใช้ชีวิตประจำวัน)</Radio></div>
                                </Radio.Group>
                            </Form.Item>

                            {/* รายชื่อสมาชิกทีม */}
                            <Form.Item label="รายชื่อสมาชิกทีม">
                                <div className="flex items-center gap-4 mb-2">
                                    <Radio.Group defaultValue="individual" size="small">
                                        <Radio value="individual">แบบเดี่ยว</Radio>
                                        <Radio value="team">แบบทีม</Radio>
                                    </Radio.Group>
                                </div>
                                <Input
                                    placeholder="ชื่อ-นามสกุล ระดับชั้น โรงเรียน"
                                    size="large"
                                    className="rounded-none border-2 border-gray-300"
                                />
                            </Form.Item>

                            {/* หมู่เลือกโรงเรียน */}
                            <Form.Item label="หมู่เลือกโรงเรียน">
                                <div className="flex items-center gap-4 mb-2">
                                    <Radio.Group defaultValue="individual" size="small">
                                        <Radio value="individual">แบบเดี่ยว</Radio>
                                        <Radio value="team">แบบทีม</Radio>
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