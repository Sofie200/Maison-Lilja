import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";

import CookieConsent from "./components/CookieConsent";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Gifts from "./pages/Gifts";
import PrivateLabel from "./pages/PrivateLabel";
import Courses from "./pages/Courses";
import Tastings from "./pages/Tastings";
/*
import About from "./pages/About";
import Faq from "./pages/Faq";*/

export default function App() {
	return (
		<BrowserRouter>
			<CartProvider>

				<CookieConsent />

				<div id="wrapper">
					<Header />
					<main>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/shop" element={<Shop />} />
							<Route path="/shop/product/:id" element={<Product />} />
							<Route path="/shop/cart" element={<Cart />} />
							<Route path="/gifts" element={<Gifts />} />
							<Route path="/private-label" element={<PrivateLabel />} />
							<Route path="/courses" element={<Courses />} />
							<Route path="/tastings" element={<Tastings />} />
							<Route path="/contact" element={<Contact />} />
							<Route path="/integritetspolicy" element={<Policy policyType="privacyPolicy" />} />
							<Route path="/kopvillkor" element={<Policy policyType="termsOfService" />} />
							<Route path="/returer" element={<Policy policyType="refundPolicy" />} />

							{/*
							<Route path="/about" element={<About />} />
							<Route path="/faq" element={<Faq />} />*/}
						</Routes>
					</main>
					<Footer />
				</div>
			</CartProvider>
		</BrowserRouter>
	);
}
