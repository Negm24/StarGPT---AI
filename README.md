# Welcome To StarLung Predictions!

## This project is about creating an AI model to detect a Lung Cancer and learns from its dataset in ./data/raw/ folder.

### If this project is sent to you, just do these steps:
    
### **Setup**:

    1. Open Terminal
    2. Write "pip install -r libraries.txt"
    3. DO NOT CLOSE THE TEXT EDITOR UNTIL IT FINISHES!

### **Activation**:
    
    1. Write "jupyter notebook" in the terminal to open jupyter lab
    2. It will open jupyter lab home directory (Project root directory)
    3. Make sure data/raw has 3 folders (3 Classes of the dataset, each has 5000 images)

### **LastStep**:

    1. Open notebooks folder
    2. You'll see 2 notebooks files:
        - phase1_draft.ipynb is the model implementation version without using DATA AUGMENTATION.
        - phase1_draft_2.ipynb is the model implementation with the DATA AUGMENTATION.
    3. Open phase1_darft_2.ipynb
    4. Run each cell (SEQUENTIATLLY)
    5. Done!

# **===========================**

## **Overview:** This project utilizes a dataset of lung CT scans to classify chest cancer types. The data is organized into three specific classes:
### 1.  **Adenocarcinoma:** A common form of lung cancer occurring in the mucus-secreting glands of the lung.
### 2.  **Squamous Cell Carcinoma:** A type of cancer forming in the squamous cells lining the airways.
### 3.  **Benign:** Non-cancerous lung tissue/nodules.

**Data Source & Purpose:** The dataset consists of .jpg images located in the `../data/raw/` directory. The purpose is to develop a Convolutional Neural Network (CNN) capable of automating the classification process to assist medical diagnostics.

# **Applications:**
### **Real-world Use Cases:**
#### 1. **Early Screening:** Automating the initial analysis of CT scans to flag high-risk patients for radiologists.
#### 2. **Second Opinion Systems:** Providing a probabilistic verification for doctors to reduce human error/fatigue.
#### 3. **Remote Diagnostics:** Enabling clinics in remote areas with limited access to specialists to perform initial triage.