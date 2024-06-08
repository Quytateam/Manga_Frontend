import React, { createContext, useState } from "react";

const ThemeContext = createContext({
  theme: "light", // Trạng thái mặc định là chế độ sáng
  toggleTheme: () => {}, // Hàm để chuyển đổi giữa chế độ sáng và tối (chưa có định nghĩa)
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Khởi tạo trạng thái mặc định

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light")); // Hàm để chuyển đổi giữa chế độ sáng và tối
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
