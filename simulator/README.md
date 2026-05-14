# CNN Feature Visualization & DeepDream Simulator

This project directory contains the interactive simulator for the **CNN Feature Visualization and DeepDream** project, developed for the **ARI5118 - Deep Learning for Computer Vision** study unit at the **[University of Malta](https://um.edu.mt)**.

The simulator is designed to help students explore how convolutional neural networks respond to different layers, filters, input images, and visualisation methods.

## 🗒️Simulator Overview

The simulator demonstrates two main CNN visualisation techniques:

- **Activation Maximisation**
- **DeepDream**

Instead of running a deep learning model live in the browser, the simulator uses **precomputed visualisation outputs** generated beforehand utilising the **[`walkthrough.ipynb`](../walkthrough.ipynb)** notebook in this repository. This keeps the simulator lightweight, responsive, and fully CPU-friendly.

The interface allows users to change visualisation settings and immediately observe how the displayed outputs change.

## 🌐 Live Version

The simulator is also available online through GitHub Pages:

`>>` **https://davidf-22.github.io/ARI5118-DeepLearningCV_Project/**

## 📋 Features

- Single visualisation mode
- Side-by-side comparison mode
- Activation Maximisation visualisations
- DeepDream visualisations
- Layer selection across CNN convolutional blocks
- Filter/channel selection
- Adjustable parameters, including:
  - Activation Maximisation step size
  - L2 regularisation
  - DeepDream octaves
  - DeepDream octave scale
- Multiple input images
- CNN architecture overview
- Feature map preview for Activation Maximisation
- Light, dark, and custom Dylan themes
- Help modal explaining how to use the interface
- Responsive static web interface

## 🗃️ Folder Structure

```text
simulator/
│
├── index.html
├── README.md
│
└── assets/
    ├── css/
    │   └── styles.css
    │
    ├── js/
    │   ├── architecture.js
    │   ├── compare.js
    │   ├── controls.js
    │   ├── images.js
    │   ├── modal.js
    │   ├── preloader.js
    │   ├── simulator.js
    │   └── theme.js
    │
    └── imgs/
        ├── icons/
        ├── input_imgs/
        ├── logo/
        └── output_imgs/
```

## 🧑‍💻 How to Run Locally

Since this simulator is a static website, no GPU or backend server is required.

After cloning the repository, follow the steps in the main **[`README.md`](../README.md)** file, under the `Setup Instructions` section for the full setup guide.

1. Open the cloned repository in **Visual Studio Code**.

2. From the repository root, open the `simulator` folder.

3. Open the following file:

   ```text
   simulator/index.html
   ```

4. Right-click inside the `index.html` file and select:

   ```text
   Open with Live Server
   ```

5. The simulator should open automatically in your browser.

> [!NOTE]
> The simulator is intended to be run using the **Live Server** extension in Visual Studio Code. Opening `index.html` directly in the browser may not load all assets correctly.

## 🤔 How to Use the Simulator
1. Select either **Single Mode** or **Compare Mode**.
2. Choose a visualisation method:
    - Activation Maximisation
    - DeepDream
3. Select a convolutional layer.
4. Select a filter/channel where applicable.
5. Adjust the available parameters.
6. Observe how the output image changes.
7. In compare mode, view two visualisation outputs side by side.

## ⚙️ Technologies Used
- HTML
- CSS
- JavaScript
- Precomputed CNN visualisation outputs
- GitHub Pages for deployment

## 👍 Acknowledgments

This individual project was carried out as part of the partial fulfilment of the requirements for the **ARI5118 Deep Learning for Computer Vision** course @ **[The University of Malta](https://www.um.edu.mt/)**.

## 📧 Contact

For any inquiries or feedback, please contact [David Farrugia](mailto:david.farrugia.22@um.edu.mt)
