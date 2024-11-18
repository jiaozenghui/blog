"use client";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import styles from "./loginPage.module.css";
import { useRouter } from "next/navigation";
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeOutlined, LoadingOutlined } from '@ant-design/icons';

const LoginPage = () => {
  const { status } = useSession();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "authenticated") {
    router.push("/")
  }
  
  const onFinish = async (values) => {
    setLoading(true)
    const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
    })
    debugger
    if (result?.error) {
        console.log('result', result);
        if (result.error === 'CredentialsSignin') {
            message.error('邮箱或密码不正确')
        } else {
            message.error(result.error || '登录失败')
        }
    } else {
        Notification({
            type: 'success',
            message: '登录成功!',
            placement: 'top'
        })
        router.push('/')
    }
    setLoading(false)
}
const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
};

  return (
    <div className={styles.container}>

      <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          className="mt-8"
      >
          <Form.Item
              name="email"
              rules={[{ required: true, message: '请输入邮箱!' }]}
          >
              <Input
                  type="email"
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="请输入邮箱..."
                  className="w-full rounded-lg border border-gray-300 bg-transparent py-3 pl-4 pr-10 text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              />
          </Form.Item>

          <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码!' }, { min: 6, message: '密码长度不能少于6个字符' }]}
          >
              <Input
                  prefix={<LockOutlined className="text-gray-400" />}
                  type={showPassword ? "text" : "password"}
                  placeholder="请输入密码..."
                  className="w-full rounded-lg border border-gray-300 bg-transparent py-3 pl-4 pr-10 text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  suffix={
                      <span className="cursor-pointer" onClick={togglePasswordVisibility}>
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </span>
                  }
              />
          </Form.Item>

          <Form.Item>
              <Button
                  type="primary"
                  htmlType="submit"
                  className={`w-full cursor-pointer rounded-lg border border-blue-500 bg-blue-500 py-3 text-white transition hover:bg-blue-600 flex justify-center items-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
              >
                  {loading ? (
                      <LoadingOutlined className="animate-spin h-5 w-5 mr-3" />
                  ) : (
                      '登录'
                  )}
              </Button>
          </Form.Item>
      </Form>
      <div className={styles.wrapper}>
        <div className={styles.socialButton} onClick={() => signIn("google")}>
          Sign in with Google
        </div>
        <div className={styles.socialButton}>Sign in with Github</div>
        <div className={styles.socialButton}>Sign in with Facebook</div>
      </div>
    </div>
  );
};

export default LoginPage;
