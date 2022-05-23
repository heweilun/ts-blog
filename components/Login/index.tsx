import React from 'react'
import { NextPage } from 'next'
import { Modal, Button, Form, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styles from './index.module.scss'

interface Iprops {
    isShow: boolean;
    onClose: Function
}

const Login: React.FC = (props: Iprops) => {
    const [form] = Form.useForm()
    const { isShow = false } = props
    const onCancel = () => {
        props.onClose()
    }
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values)
    }
    const onFinishFailed = () => {

    }
    const clearForm = () => {
        form.resetFields()
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
                >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />}/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} suffix={<a>获取验证码</a>}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{width: '100%'}}>登录</Button>
                </Form.Item>
                <Form.Item>
                    <Button style={{width: '100%'}} onClick={clearForm}>重置</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Login