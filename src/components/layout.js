import * as React from "react"
import Navbar from "./ui/Navbar"
import Footer from "./sections/Footer"
import "../styles/global.css"

const Layout = ({ children, className = "" }) => {
  return (
    <div className={cn(`min-h-screen bg-(--color-bg-primary)`, className)}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default Layout
