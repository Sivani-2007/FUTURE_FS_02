📄 README.md - Complete Mini CRM
markdown

Copy code
# 🚀 Mini CRM - Full-Stack Customer Relationship Manager

A complete CRM built with **React + Node.js + MongoDB**. Add leads, update status, add notes, delete records. Production-ready!

## ✨ **Features**
✅ Add/Edit leads (name, email, source) ✅ Status tracking: NEW → CONTACTED → CONVERTED
✅ Notes per lead (unlimited) ✅ Delete leads ✅ Responsive Material-UI design ✅ Persistent MongoDB storage ✅ Full CRUD API ✅ Professional dashboard


Copy code

## 🛠️ **Tech Stack**
Frontend: React 18 + Material-UI + Axios Backend: Node.js + Express.js Database: MongoDB


Copy code

## 🚀 **Quick Start (5 minutes)**

### **Prerequisites**
- [ ] Node.js 18+ (`node --version`)
- [ ] MongoDB (Local or [Atlas Free](https://mongodb.com/atlas))

### **1. Clone & Install**
```bash
git clone <your-repo>
cd mini-crm

# Backend
cd backend
npm install

# Frontend  
cd ../frontend
npm install
2. Start Backend
bash

Copy code
cd backend
npm run dev
✅ See: ✅ MongoDB Connected! + 🚀 http://localhost:5000

Test: http://localhost:5000/api/leads → []

3. Start Frontend
bash

Copy code
cd frontend
npm start
✅ Opens: http://localhost:3000

4. Use CRM

Copy code
1. Add lead: "John Doe" / john@test.com
2. 📞 Contacted → ✅ Converted
3. 📝 Add note: "Follow up tomorrow"
4. 🗑️ Delete unwanted leads
5. Refresh → All saved!
📁 Folder Structure

Copy code
mini-crm/
├── backend/
│   ├── models/Lead.js
│   ├── routes/leads.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/App.js
    └── package.json
🔧 Backend API

Copy code
GET    /api/leads           → All leads
POST   /api/leads           → Create lead
PUT    /api/leads/:id       → Update status/notes
DELETE /api/leads/:id       → Delete lead
⚙️ Environment (.env)
env

Copy code
PORT=5000
MONGODB_URI=mongodb://localhost:27017/minicrm
# Or MongoDB Atlas: mongodb+srv://user:pass@cluster...
📱 Network Access

Copy code
Local: http://localhost:3000
Network: http://YOUR-IP:3000
🚀 Production Deploy

Copy code
Frontend: npm run build → Netlify/Vercel
Backend: Render/Heroku + MongoDB Atlas
🐛 Troubleshooting

Copy code
❌ npm not found → Install Node.js: nodejs.org
❌ MongoDB error → Use Atlas: mongodb.com/atlas  
❌ CORS error → Backend has cors()
❌ Port 5000 busy → Kill: netstat -ano | findstr :5000
📈 Screenshots

### Dashboard
![Dashboard](frontend/assets/dashboard.png)

🎯 Roadmap

Copy code
[✅] CRUD operations
[✅] Status workflow
[✅] Notes system
[ ] Search/Filter
[ ] Analytics dashboard
[ ] User authentication
[ ] Email integration
🤝 Contributing

Copy code
1. Fork repo
2. Create feature branch
3. npm install && npm test
4. Submit PR
📄 License
MIT License - Free to use/modify/deploy!

🙌 Thanks
Built with ❤️ using React, Node.js, MongoDB, Material-UI

Deploy yours → Share link! 🚀


Copy code

## 📸 **Add Screenshots (Optional):**
screenshots/ ├── dashboard.png ├── lead-table.png ├── notes-dialog.png └── status-update.png


Copy code

## 🚀 **Usage:**
Copy above to README.md
Take 3 screenshots (Dashboard, Table, Notes)
git add . && git commit -m "Add README"
Push to GitHub → Perfect repo!

Copy code

**Your CRM + README = Portfolio Ready!** 🎉

**Deploy to Netlify + Screenshot → Job ready!** 🚀


