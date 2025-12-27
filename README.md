# 🫁 StarGPT AI: Lung Cancer Classification System

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Python](https://img.shields.io/badge/Python-3.9%2B-blue)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB)
![TensorFlow](https://img.shields.io/badge/Model-VGG16-orange)

## Project Overview
**OncoVision AI** is a web-based diagnostic tool designed to assist medical professionals in the early detection of lung cancer. It utilizes a **Deep Learning model (VGG16)** trained on histopathological images to classify lung tissue samples into three categories:

1.  **Benign** (Non-cancerous - safe)
2.  **Adenocarcinoma** (Malignant)
3.  **Squamous Cell Carcinoma** (Malignant)

The system features a decoupled architecture with a **Flask REST API** backend and a modern **React (Vite)** frontend, ensuring fast inference and a user-friendly experience.

---

## Key Features
* **Deep Learning Engine:** Utilizes Transfer Learning with the VGG16 architecture for high-accuracy image classification.
* **Real-Time Analysis:** Instant inference using a CPU-optimized backend pipeline.
* **Interactive UI:** Drag-and-drop interface built with React and Tailwind CSS.
* **Confidence Breakdown:** Visualizes the model's probability distribution across all classes (Benign vs. Malignant types).

---

## Tech Stack

### Backend (API & Model)
* **Framework:** Flask (Python)
* **ML Library:** TensorFlow / Keras
* **Model:** VGG16 (Pre-trained on ImageNet, Fine-tuned on Lung Histopathology)
* **Utilities:** NumPy, Pillow (Image Processing)

### Frontend (User Interface)
* **Framework:** React.js (via Vite)
* **Styling:** Tailwind CSS (Dark Mode UI)
* **HTTP Client:** Axios
* **Icons:** React Icons

---

## Must have:

### Node.js & npm

### python 3.10+

## 📂 Project Structure

---

```text
webapp/
├── backend/               # Flask API
│   ├── app/               # Application Factory
│   ├── api/               # Route Controllers
│   ├── services/          # Inference Logic
│   ├── CONFIG.py          # Central Configuration
│   ├── run.py             # Entry Point
│   └── lung_cancer_vgg16_model.h5  # Trained Model
│
└── frontend/              # React App
    ├── src/
    │   ├── api/           # API Integration
    │   ├── components/    # Reusable UI (DropZone, Results)
    │   └── assets/        # Static Assets
    └── public/            # Favicon & Manifest
