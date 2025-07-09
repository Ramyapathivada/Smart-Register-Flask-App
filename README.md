Smart Register Flask App 
This is a simple inventory management and financial tracking applica on built with Flask, 
HTML, Tailwind CSS, and JavaScript. It allows users to add new items to inventory, view 
exis ng inventory, and modify stock quan es due to sales or damage, while also tracking 
profit and loss. 
Features 
 Add New Items: Easily add items with unique IDs, names, quan es, and cost prices. 
 Inventory & Valua on View: See a comprehensive list of all inventory items, 
including total unique items, total quan ty, and total inventory value. 
 Search Func onality: Quickly find items in the inventory using a search bar. 
 Stock Modifica on: Adjust item quan es for sales or damage, with automa c 
calcula on of profit or loss. 
 Financial Summary: View a real-me summary of total profit and total loss. 
 Local Storage Persistence: All inventory and financial data are saved locally in the 
browser, persis ng across sessions. 
 Responsive Design: The applica on is designed to be usable on various screen sizes 
(mobile, tablet, desktop). 
Project Structure 
The project follows a standard Flask applica on structure: 
. 
├── app.py 
├── requirements.txt 
├── Procfile 
├── templates/ 
│   └── index.html 
└── sta c/ 
├── styles.css 
└── script.js 
 app.py: The main Flask applica on file, handling routes and rendering templates. 
 requirements.txt: Lists Python dependencies for the project. 
 Procfile: Specifies the command to run the applica on on pla orms like Render. 
 templates/: Contains HTML template files (e.g., index.html). 
 sta c/: Contains sta c assets like CSS (styles.css) and JavaScript (script.js). 
Technologies Used 
 Flask: Python web framework. 
 HTML5: Structure of the web pages. 
 Tailwind CSS: U lity-first CSS framework for styling. 
 JavaScript: Client-side logic for interac ve features and data persistence (using Local 
Storage). 
 Gunicorn: WSGI HTTP Server for produc on deployment. 
Setup and Installa on 
Follow these steps to get the Smart Register app up and running on your local machine. 
Prerequisites 
 Python 3.x installed on your system. 
Steps 
1. Clone the repository: 
2. git clone h ps://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git 
3. cd YOUR_REPOSITORY_NAME 
4. Create a virtual environment (recommended): 
5. python -m venv venv 
6. Ac vate the virtual environment: 
o On macOS/Linux: 
o source venv/bin/ac vate 
o On Windows: 
o venv\Scripts\ac vate 
7. Install the dependencies: 
8. pip install -r requirements.txt 
9. Run the Flask applica on: 
10. python app.py 
The applica on will typically run on h p://127.0.0.1:5000/. Open this URL in your web 
browser. 
Deployment on Render 
This applica on is configured for easy deployment on Render.com. 
1. Push your code to a GitHub repository. 
2. Create a new Web Service on Render. 
3. Connect your GitHub repository. 
4. Configure the build and start commands: 
o Build Command: pip install -r requirements.txt 
o Start Command: gunicorn app:app 
5. Deploy! Render will automa cally detect your Procfile and requirements.txt to build 
and run your applica on. 
Usage 
 Navigate between "Add Item", "Inventory & Valua on", and "Stock Modifica on" 
screens using the naviga on bu ons. 
 On the "Add Item" screen, fill in the details and click "Add Item" to add new 
inventory. 
 On the "Inventory & Valua on" screen, you can view your current stock and search 
for items. 
 On the "Stock Modifica on" screen, select an item, enter the quan ty to change, 
choose the reason (Sale or Damage), and apply the change. If it's a sale, specify the 
sale price. 
10. Conclusion 
The Smart Register Flask App provides a func onal and intui ve solu on for basic inventory 
and financial tracking. By leveraging modern web technologies and simple data persistence, 
it offers a quick and easy way for users to manage their stock. Its modular design and clear 
separa on of concerns (Flask for backend, dedicated files for HTML, CSS, and JS) make it 
maintainable and extensible. While currently relying on client-side storage, the architecture 
allows for straigh orward future enhancements to integrate a database and expand its 
capabili es for more advanced business needs. This project serves as a solid founda on for a 
comprehensive inventory management system.
