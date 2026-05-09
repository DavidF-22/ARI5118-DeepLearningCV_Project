# CNN Feature Visualization & DeepDream Simulator

This branch is used to host the **CNN Feature Visualization & DeepDream Simulator** as a static website through **GitHub Pages**.

The simulator was developed as part of the **ARI5118 - Deep Learning for Computer Vision** study unit at the **University of Malta**. It is designed to help students explore how convolutional neural networks respond to different layers, filters, inputs, and visualisation methods.

## Branch Purpose

The `simulator_github_pages` branch contains only the files needed to deploy and serve the simulator website.

The main project files, including the notebook used to generate the precomputed outputs, are kept in the main branch.

## Project Overview

The simulator focuses on two main CNN visualisation techniques:

- **Activation Maximisation**
- **DeepDream**

The website does not run deep learning models live in the browser. Instead, it loads **precomputed CNN visualisation outputs**, making it lightweight and suitable for GitHub Pages.

## Website Structure

```text
ARI5118-DeepLearningCV_Project/
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

## Live Site
>**[https://DavidF-22.github.io/ARI5118-DeepLearningCV_Project/](https://DavidF-22.github.io/ARI5118-DeepLearningCV_Project/)**

## Features

- Single mode and compare mode
- Activation Maximisation and DeepDream visualisations
- Layer and filter/channel selection
- Adjustable parameters such as step size, L2 regularisation, octaves, and octave scale
- Feature map display
- CNN architecture overview
- Multiple input images
- Light, dark, and custom Dylan themes
- Responsive static website

## Technologies Used

- HTML
- CSS
- JavaScript
- Precomputed CNN visualisation outputs
- GitHub Pages

> The visualisation outputs were generated using the notebook in the main branch: `walkthrough.ipynb`.