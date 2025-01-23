## App Router Project Structure

---

Here's a quick walkthrough of the folder structure and what it means, along with next steps for building out the site skeleton using the App Router.

```
├── README.md
├── app
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── tailwind.config.ts
└── tsconfig.json
```

---

### **Understanding the Key Files and Folders**

#### **1. `app/`**
This is the heart of the new App Router structure:
- **`app/page.tsx`**:
  - This is your root route (`/`). The content in this file will render at `http://localhost:3000`.
  - This file acts as the homepage of your application.

- **`app/layout.tsx`**:
  - This file defines a shared layout for all pages.
  - It's used to wrap components (e.g., navigation, footers, global styles) and persists across page navigations.

- **`app/globals.css`**:
  - This is where your global CSS styles live. By default, Next.js includes this file.

- **`app/favicon.ico`**:
  - Your default site favicon.

---

#### **2. `public/`**
This folder contains static assets, such as images, icons, and other files directly accessible at their path:
- Example: `public/globe.svg` can be accessed via `http://localhost:3000/globe.svg`.

---

#### **3. Configuration Files**
- **`next.config.ts`**:
  - Configuration for Next.js (e.g., setting up custom headers, redirects, etc.).
- **`eslint.config.mjs`**:
  - ESLint configuration for code linting.
- **`postcss.config.mjs`**:
  - PostCSS configuration, used with Tailwind CSS.
- **`tailwind.config.ts`**:
  - Tailwind CSS configuration file.

---

#### **4. TypeScript Files**
- **`next-env.d.ts`**:
  - Automatically generated TypeScript definitions for Next.js.
- **`tsconfig.json`**:
  - TypeScript configuration file for the project.

---

### **Next Steps**

#### **1. Develop a Dynamic Page**
Let's implement a dynamic route to get a better understanding of how App Router handles this:
1. Create a new folder inside `app/` for your dynamic route:
   ```
   app/product/[id]/page.tsx
   ```
2. Add the following code to handle the dynamic route:
   ```tsx
   import { Metadata } from 'next';

   interface ProductPageProps {
     params: { id: string };
   }

   export function generateMetadata({ params }: ProductPageProps): Metadata {
     return {
       title: `Product ${params.id}`,
       description: `Details for product ${params.id}.`,
     };
   }

   export default function ProductPage({ params }: ProductPageProps) {
     const { id } = params;

     return (
       <div>
         <h1>Product ID: {id}</h1>
         <p>This is a dynamic product page for product {id}.</p>
       </div>
     );
   }
   ```

3. **Access the Page**:
   - Navigate to `http://localhost:3000/product/123` to see the dynamic page for `id=123`.

---

#### **2. Define Your Site Pages**
Once you confirm the skeleton is working (with the homepage and dynamic pages rendering), identify the pages your site needs. For example:
- **Static Pages**:
  - About Us
  - Contact Us
- **Dynamic Pages**:
  - Product Details (`/product/[id]`)
  - Blog Posts (`/blog/[slug]`)

Let me know the list of pages, and I can help you set them up efficiently.

---

#### **3. Consider a Shared Layout**
Since your site is likely to share common elements (e.g., navigation, footer), you can leverage the App Router's layout system:
1. Update `app/layout.tsx`:
   ```tsx
   export const metadata = {
     title: 'Adaprise Portal',
     description: 'Welcome to the Adaprise Portal',
   };

   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode;
   }) {
     return (
       <html lang="en">
         <body>
           <header>
             <nav>
               {/* Add your navigation here */}
             </nav>
           </header>
           <main>{children}</main>
           <footer>
             {/* Add your footer here */}
           </footer>
         </body>
       </html>
     );
   }
   ```

2. This layout will wrap all pages under `app/` by default.

---

### **4. Tailwind CSS for Styling**
Your project includes Tailwind CSS by default. To test and integrate it:
1. Add a Tailwind class to your `app/page.tsx`:
   ```tsx
   export default function Home() {
     return (
       <div className="text-center text-3xl font-bold">
         Welcome to Adaprise Portal
       </div>
     );
   }
   ```

2. Start the server and ensure styles are applied:
   ```bash
   npm run dev
   ```

---

### **What’s Next?**
1. Confirm the dynamic route (`/product/[id]`) is working.
2. Share your list of planned pages, and I can help set them up efficiently.
3. Do you want to add layouts (e.g., for navigation and shared styling) or move forward with database integration (if needed)?