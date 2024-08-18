import React from "react";

interface LayoutProps {
  children?: React.ReactNode; 
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container">
      <p>Burası Layout</p>
      {children}
    </div>
  );
};

export default Layout;
