import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Seasonal from "./pages/Seasonal";
import Gifts from "./pages/Gifts";
import PrivateLabel from "./pages/PrivateLabel";
import Courses from "./pages/Courses";
import Tastings from "./pages/Tastings";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
	return (
		<BrowserRouter>

			<div id="wrapper">
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/shop" element={<Shop />} />
						<Route path="/shop/product/:id" element={<Product />} />
						<Route path="/seasonal" element={<Seasonal />} />
						<Route path="/gifts" element={<Gifts />} />
						<Route path="/private-label" element={<PrivateLabel />} />
						<Route path="/courses" element={<Courses />} />
						<Route path="/tastings" element={<Tastings />} />
						<Route path="/about" element={<About />} />
						<Route path="/contact" element={<Contact />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</BrowserRouter>
	);
}
