import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const AdminMiddleware = ({ fallbackPath }) => {
    let roleArray = [];
    let Role = JSON.parse(localStorage.getItem('user'))
    roleArray.push(Role?.user)
    console.log(fallbackPath)
    const isRouter = roleArray.includes('SuperAdmin') || roleArray.includes('Admin');
    return isRouter ? <Outlet /> : <Navigate to={fallbackPath} />;
};

export default AdminMiddleware;