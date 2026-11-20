# ⚡ K.G. Electronics

**K.G Electronics** is a modern, fast, and secure e-commerce platform for electronics, based in Serampore, Hooghly, West Bengal, India. Built to deliver a seamless online shopping experience, the platform allows customers to explore products, discover deals, and place orders conveniently.

🌐 **Live Website:** [kg-electronics.vercel.app](https://kg-electronics.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## ✨ Features

- 🛍️ **Modern Product Catalog** — Browse mobiles, appliances, accessories, and more.
- 🔍 **Smart Search & Filters** — Find products quickly and easily.
- 🛒 **Shopping Cart & Checkout** — Enjoy a seamless shopping and ordering experience.
- 💬 **WhatsApp Ordering** — Place orders and connect directly through WhatsApp.
- 🔐 **Admin Dashboard** — Manage products, orders, and users through a dedicated admin panel.
- 📱 **Fully Responsive Design** — Optimized for mobile, tablet, and desktop devices.
- ⚡ **High Performance** — Powered by Next.js for a fast and efficient experience.
- ☁️ **Cloud Deployment** — Hosted on Vercel with streamlined deployment.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js** | Full-stack React framework |
| **React** | Component-based UI development |
| **Tailwind CSS** | Utility-first styling |
| **Node.js** | Server-side runtime |
| **MongoDB Atlas** | Cloud database |
| **Mongoose** | MongoDB object modeling |
| **JWT** | Authentication |
| **Bcrypt** | Password hashing |
| **Vercel** | Deployment and hosting |
| **Cloudinary / Vercel Blob** | Image hosting and storage |

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/dasavrajit7/kg-electronics.git
cd kg-electronics
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and configure the following variables:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/kg-electronics
JWT_SECRET=your_jwt_secret_key
NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX
```

> Replace the placeholder values with your actual MongoDB credentials, JWT secret, and WhatsApp business number. Never commit your `.env.local` file.

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to access the website.

---

## 📁 Project Structure

```text
kg-electronics/
├── app/                # Application routes and pages (Next.js App Router)
├── pages/               # Pages Router (if applicable)
├── components/           # Reusable UI components
├── api/                 # API endpoints (if applicable)
├── models/               # MongoDB/Mongoose models
├── lib/                  # Database connections and utilities
├── public/                # Static assets
├── .env.local             # Environment variables (not committed)
└── package.json            # Project dependencies and scripts
```

---

## 🔐 Admin Dashboard

K.G Electronics includes a dedicated admin dashboard for managing the store.

**Admin Login:** `/admin/login`

Administrators can manage:

- Products and product listings
- Orders and order status
- User management

> Admin credentials are not publicly available. Contact the owner for authorized access.

---

## 📦 Deployment

The project is deployed on **[Vercel](https://vercel.com/)**.

Deployment workflow:

- Push changes to the `main` branch.
- Vercel automatically builds and deploys the latest version.
- The live website updates after a successful deployment.

---

## 📞 Contact & Support

**K.G Electronics**

- 📍 **Location:** Serampore, Hooghly, West Bengal, India
- 📱 **WhatsApp:** Available through the website
- 🌐 **Website:** [kg-electronics.vercel.app](https://kg-electronics.vercel.app)

---

## 📄 License

© 2026 K.G. Electronics. All Rights Reserved.

---

<p align="center">
  <b>K.G Electronics — Bringing technology closer to you. ⚡</b>
</p>
