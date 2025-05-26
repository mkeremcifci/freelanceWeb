import React, { Children } from "react";
import { Layout, Menu } from "antd";
import { HomeOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";

const { Header, Content, Footer } = Layout;

function Navbar({ children }){
    const navigate = useNavigate();
    const location = useLocation();

    return(
        <Layout style={{ minHeight:'100vh' }}>
            <Header style={{ display:'flex', alignItems:'center' }}>
                <div
                    style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20,
                        marginRight: 50,
                    }}
                >
                    MyApp
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[location.pathname]}
                    style={{flex:1}}
                    onClick={({key})=>{
                            navigate(key);
                        }    
                    }
                    items={[
                        {
                            key: '/',
                            icon: <HomeOutlined />,
                            label: 'Anasayfa',
                        },
                        {
                            key:"/profile",
                            icon:<UserOutlined />,
                            label: "Profile",
                        },
                        {
                            key: '/login',
                            icon: <LoginOutlined />,
                            label: 'Giriş yap',
                        },
                        {
                            key: '/register',
                            icon: <LoginOutlined />,
                            label: 'Kayıt ol',
                        }
                    ]}
                />
            </Header>
            <Content style={{padding:'50px', backgroundColor: '#f0f2f5', flex: 1}}>
                    {children}
            </Content>
        </Layout>
    )
}
export default Navbar;