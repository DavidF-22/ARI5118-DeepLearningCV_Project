# 👁️ ARI5118 - Deep Learning for Computer Vision Project

This repository contains my individual learning pack for the **ARI5118 - Deep Learning for Computer Vision** study unit at the University of Malta.

## 📄 Project Topic

`>>` **CNN Feature Visualisation and DeepDream**

The project focuses on explaining and demonstrating how convolutional neural networks can be inspected visually. The main techniques covered are:

- Activation maximisation
- Gradient ascent on input
- CNN feature hierarchy
- DeepDream amplification

The aim of this repository is to provide a complete learning pack that can be used by peers to understand the topic through written notes, slides, an annotated notebook, a quiz, further reading, and an interactive simulator.

## 🗃️ Repository Contents

```bash
/
├── README.md
├── requirements.txt
├── study_notes.pdf
├── quiz_with_rationale.pdf
├── slides.pdf
├── walkthrough.ipynb
├── ai_journal.pdf
│
├── simulator/
│   ├── app.py
│   ├── requirements.txt
│   └── README.md
│
└── further_reading/
    └── *.pdf
```

# 📂 Main Files

| File / Folder             | Description                                                                                                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `study_notes.pdf`         | Full study notes explaining CNN feature visualisation and DeepDream, including the theory, intuition, algorithms, worked examples, quick reference material and key papers. |
| `quiz_with_rationale.pdf` | Adversarial quiz document containing the quiz rationale and explanations for the correct and incorrect answers.                                                             |
| `slides.pdf`              | Slide deck used for the project presentation.                                                                                                                               |
| `walkthrough.ipynb`       | Annotated code walkthrough showing how the visualisation outputs were generated and how the techniques work in practice.                                                    |
| `ai_journal.pdf`          | AI usage journal explaining how AI tools were used during the project.                                                                                                      |
| `requirements.txt`        | Python dependencies used for the notebook and visualisation generation.                                                                                                     |
| `simulator/`              | Interactive web-based simulator for exploring precomputed CNN visualisation outputs.                                                                                        |
| `further_reading/`        | Academic papers used as supporting references for the study notes and project.                                                                                              |

## 🌐 Interactive Simulator

The interactive simulator is located in the `simulator/` folder. It demonstrates CNN feature visualisation and DeepDream using precomputed outputs, allowing users to explore different layers, filters, methods, and parameter settings without running a deep learning model live in the browser.

### Accessing the Simulator

- **Online version:** [Open the Interactive Simulator](https://davidf-22.github.io/ARI5118-DeepLearningCV_Project/)
- **Local instructions:** [View the simulator README](./simulator/README.md)

### Notes

The simulator uses precomputed visualisation outputs, so it does not require a GPU or a Python backend to run. The dedicated simulator README contains the full local setup and usage instructions.

## ⚙️ Setup Instructions

These instructions are mainly required for running the annotated notebook and regenerating the visualisation outputs.

The interactive simulator itself is static and does not require a GPU or Python backend to use.

### 1. Clone the Repository

```bash
git clone https://github.com/DavidF-22 ARI5118-DeepLearningCV_Project.git
cd ARI5118-DeepLearningCV_Project
```

### 2. Create a Virtual Environment

#### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

#### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

> [!NOTE]
> The `requirements.txt` file includes PyTorch with CUDA support, which was used during development to generate the visualisation outputs more efficiently.

If you do not have a CUDA-compatible GPU, you can install the CPU-only version of PyTorch instead by following the official PyTorch installation instructions.

```bash
pip install torch torchvision
```

> **GPU support is only relevant if you want to run or modify the notebook and regenerate the visualisation outputs.**

## 🧑‍💻 Technologies Used

- Python
- Jupyter Notebook
- PyTorch
- Torchvision
- NumPy
- Matplotlib
- HTML
- CSS
- JavaScript
- GitHub Pages


## 📝 Notes for Reviewers

The repository is organised so that each deliverable can be accessed directly from the root directory.

The simulator is designed to be lightweight and CPU-friendly by using precomputed visualisation outputs rather than running a CNN live in the browser. This allows the simulator to remain responsive and accessible without requiring specialist hardware.

For simulator-specific usage instructions, please refer to the dedicated README inside the [simulator directory](./simulator/README.md)

## 👍 Acknowledgments

This individual project was carried out as part of the partial fulfilment of the requirements for the **ARI5118 Deep Learning for Computer Vision** course @ **[The University of Malta](https://www.um.edu.mt/)**.

## 📧 Contact

For any inquiries or feedback, please contact [David Farrugia](mailto:david.farrugia.22@um.edu.mt)