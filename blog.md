# Python using Jupyter Notebooks 

Jupyter Notebooks is a powerful tool especially for data analysts and data analysis related teams like ours. Jupyter providing a fast incremental user-friendly experience. 
Jupyter's ability to execute code in sections promotes an iterative and interactive coding experience, allowing us to develop and visualize results step by step, enhancing problem-solving processes.
Let’s see what Jupyter has to offer

## **An Iterative and Interactive Coding Experience**

One of the standout features of Jupyter is its ability to execute code in sections. This promotes an iterative and interactive coding experience, allowing us to develop and visualize results step by step. For instance, we experimented with changing the value of a variable `a` in different sections, running just one section at a time, and printing the updated value. This simple demonstration showcased Jupyter's capability to streamline the coding process. We also saw how we execute sections of code like fetching github repo data only once and use its output multiple times without making API calls again and again.

## **Persistence Across Restarts**

A notable feature is the persistence of values even after restarting notebooks. While this saves us from rerunning sections, it's crucial to ensure that we are using the correct output from previous sections, especially after a restart.

## **Optimizing Code Execution**

We also explored how Jupyter enables us to run heavy sections of code, such as data transformation and cleaning, only once. The outputs can then be reused iteratively, optimizing further sections of code. This not only saves time but also enhances the efficiency of our problem-solving processes.

## **Exporting Results in Various Formats**

Jupyter allows us to export the results of our code in various formats, including PDF and HTML. This feature facilitates seamless communication of findings and insights with stakeholders who may not be familiar with the intricacies of code.

## **Multi-Language Support**

Jupyter's versatility extends beyond Python. It supports multiple languages, including R and Scala, providing flexibility for teams with diverse skill sets and preferences.


On a side note, we explored running a notebook in VSCode, offering an alternative for those who have already installed and embraced the features of VSCode.

### **Getting Started with Jupyter**

Given that python is installed (Snow request: )

Install Jupyter using pip:
pip install jupyter

After installation, launch Jupyter with:
jupyter notebook

This opens a web-based interface where you can create, edit, and run Jupyter notebooks interactively.

### **Setting Up Jupyter on a Server**

For collaborative work, setting up Jupyter on a server is beneficial. The same has been configured on our UAT server but the service may be stopped in the near future. Here's a brief guide to set up on a server:

1. **Install Jupyter on the Server:**
   - Use `pip install jupyter` on your server.

2. **Generate a Jupyter Configuration File:**
   - Run `jupyter notebook --generate-config` to create a configuration file.

3. **Configure Jupyter for Remote Access:**
   - Edit the configuration file to allow connections from external IPs.

4. **Run Jupyter on the Server:**
   - Start Jupyter on the server using `jupyter notebook --ip 0.0.0.0 --no-browser`.

Now, our team members can access the Jupyter environment from anywhere by entering the server's URL in their web browser.

### **Collaborative Benefits for Teams**

Setting up Jupyter on a server fosters collaboration. Multiple team members can work on the same notebook simultaneously, promoting knowledge sharing.

### **Git for Jupyter Notebook Version Control**

Effective version control is crucial. Integrating Git with Jupyter allows us to manage our notebooks seamlessly:

1. **Initialize a Git Repository:**
   - Create a Git repo (e.g., on alm-github) and clone it to your local machine.

2. **Create a .gitignore File:**
   - Exclude unnecessary files by adding them to a `.gitignore` file. (e.g., `.ipynb_checkpoints/` and `__pycache__/`)

3. **Commit and Push Changes:**
   - Use Git commands (`add`, `commit`, `push`) or drag files to the repo in your browser to push changes to a remote repo.
For a deeper dive into Git basics, check out [this guide](https://daily-dev-tips.com/posts/git-basics-your-first-commit-to-github/).

[Jupyter's official website](https://jupyter.org/) is the go-to resource for staying updated on the latest features and documentation.

In conclusion, Jupyter Notebooks empowers teams with a collaborative, iterative, and multi-language coding environment. Install it, explore its features, and reach out to me if you have any questions
