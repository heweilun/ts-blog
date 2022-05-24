import React, { useState } from 'react'
import { NextPage } from 'next'
import { Modal, Button, Form, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import CountDown from '@/components/CountDown'
import request from '@/server/axios'

interface Iprops {
    isShow: boolean;
    onClose: Function
}

const Login: React.FC = (props: Iprops) => {
    const [form] = Form.useForm()
    const [ isShowVerifyCode, setIsShowVerifyCode ] = useState(false)//倒计时显示
    const { isShow = false, onClose } = props
    const [formValue, setFormValue] = useState({
        username: null,
        verify: null
    })
    const onCancel = () => {
        onClose && onClose()
    }
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values)
    }
    const onFinishFailed = () => {

    }
    const clearForm = () => {
        form.resetFields()
    }
    const handleCountDown = () => {
        setIsShowVerifyCode(false)
    }
    const getVerify = () => {
        //校验手机号填写状态
        request.post('/api/user/sendVerifyCode')
    }
    return (
        <Modal 
            title="用户登录"
            footer={null}
            visible={isShow}
            onCancel={onCancel}
            >
            <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                initialValues={
                    formValue
                }
                >
                <Form.Item
                    name="username"
                    rules={[{ required: true,pattern:/^1[3456789]\d{9}$/, message: '手机号码格式有误' }]}
                >
                    <Input placeholder="请输入手机号" prefix={<UserOutlined className="site-form-item-icon" />}/>
                </Form.Item>
                <Form.Item
                    name="verify"
                    rules={[{ required: true, message: '请输入验证码' }]}
                >
                    <Input placeholder="验证码" suffix={isShowVerifyCode?<CountDown time={5} onEnd={handleCountDown}/>:<a onClick={getVerify}>获取验证码</a>}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{width: '100%'}}>登录</Button>
                </Form.Item>
                {/* <Form.Item>
                    <Button style={{width: '100%'}} onClick={clearForm}>重置</Button>
                </Form.Item> */}
            </Form>
        </Modal>
    )
}

export default Login